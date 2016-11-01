package com.gnet.app.orderDeliverGoods;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gnet.app.orderGood.OrderGood;
import com.gnet.app.orderGood.OrderGoodCondition;
import com.gnet.app.orderGood.OrderGoodMapper;
import com.gnet.utils.page.PageUtil;

@Service
@Transactional(readOnly = true)
public class OrderDeliverGoodsService {

	@Autowired
	private OrderGoodMapper orderGoodMapper;
	@Autowired
	private OrderDeliverGoodsMapper orderDeliverGoodsMapper;

	public OrderDeliverGoods findById(String id) {
		return orderDeliverGoodsMapper.selectByPrimaryKey(id);
	}

	public OrderDeliverGoods find(OrderDeliverGoods orderDeliverGoods) {
		return orderDeliverGoodsMapper.selectOne(orderDeliverGoods);
	}

	public List<OrderDeliverGoods> findAll(List<String> orderList, String serviceId) {
		return orderDeliverGoodsMapper.findAllList(orderList, serviceId);
	}

	public Page<OrderDeliverGoods> pagination(Pageable pageable, List<String> orderList, String serviceId) {
		return PageUtil.pagination(pageable, orderList, new PageUtil.Callback<OrderDeliverGoods>() {

			@Override
			public List<OrderDeliverGoods> getPageContent() {
				return orderDeliverGoodsMapper.selectAllList(serviceId);
			}

		});
	}

	@Transactional(readOnly = false)
	public Boolean create(OrderDeliverGoods orderDeliverGoods) {
		return orderDeliverGoodsMapper.insertSelective(orderDeliverGoods) == 1;
	}

	@Transactional(readOnly = false)
	public Boolean update(OrderDeliverGoods orderDeliverGoods) {
		return orderDeliverGoodsMapper.updateByPrimaryKeySelective(orderDeliverGoods) == 1;
	}

	/**
	 * 根据服务单号获取送货明细列表
	 * 
	 * @param orderServiceId
	 * @return
	 */
	public List<OrderDeliverGoods> selectDeliverDetailListByOrderServiceId(String orderServiceId) {
		return this.orderDeliverGoodsMapper.selectAllList(orderServiceId);
	}

	/**
	 * 根据订单ID号获取订单商品信息
	 * 
	 * @param orderId
	 * @param isNeedCalc
	 * @return
	 */
	public List<OrderGood> selectOrderGoodsListWithDetailByOrderId(String orderId, boolean isNeedCalc) {

		OrderGoodCondition condition = new OrderGoodCondition();
		condition.setOrderId(orderId);
		List<OrderGood> list = this.orderGoodMapper.selectOrderGoodsAllWithDetailByCondition(condition);

		for (OrderGood orderGood : list) {
			if (isNeedCalc) {
				orderGood.setNeedDeliverNum(orderGood.getOrderGoodsNum() - this.orderDeliverGoodsMapper
						.getAlreadyDeliberGoodNumCount(orderId, orderGood.getStorageGoodsId()));
			}
		}
		return list;
	}

}
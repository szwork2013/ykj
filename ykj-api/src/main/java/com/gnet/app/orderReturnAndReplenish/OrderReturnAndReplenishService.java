package com.gnet.app.orderReturnAndReplenish;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gnet.app.clerk.Clerk;
import com.gnet.app.orderGood.OrderGoodMapper;

/**
 * 退补活业务操作类
 *
 */
@Service
@Transactional(readOnly = true)
public class OrderReturnAndReplenishService {
	
	@Autowired
	private OrderReturnAndReplenishMapper orderReturnAndReplenishMapper;
	
	@Autowired
	private OrderGoodMapper orderGoodMapper;
	
	/**
	 * 根据订单号获取退补活数据信息
	 * @param businessId
	 * @param orderId
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<OrderReturnAndReplenish> selectOrderReturnAndReplenishDetailsByOrderId(String businessId,String orderId){
		OrderReturnAndReplenishCondition condition = new OrderReturnAndReplenishCondition();
		condition.setOrderId(orderId);
		List<OrderReturnAndReplenish> orderReturnAndReplenishList = this.orderReturnAndReplenishMapper.selectOrderReturnAndReplenishDetailsByCondition(condition);
		OrderReturnAndReplenishExtDataHandler.resultExtDataHandle(businessId, orderReturnAndReplenishList);
		return orderReturnAndReplenishList;
	}
	
	@Transactional(readOnly = true)
	public OrderReturnAndReplenish getOrderReturnAndReplenish(String id){
		return this.orderReturnAndReplenishMapper.selectByPrimaryKey(id);
	}
	
	@Transactional(readOnly = false)
	public boolean deleteOrderReturnAndReplenish(String id){
		return this.orderReturnAndReplenishMapper.deleteByPrimaryKey(id) == 1;
	}
	
	/**
	 * 创建退补活信息
	 * @param orderReturnAndReplenish
	 * @return
	 */
	public boolean create(Clerk clerk,OrderReturnAndReplenish orderReturnAndReplenish){
		boolean result = false;
		Date date = new Date();
		orderReturnAndReplenish.setCreateDate(date);
		orderReturnAndReplenish.setModifyDate(date);
		result = this.orderReturnAndReplenishMapper.insertSelective(orderReturnAndReplenish) == 1;
		if(result){
			//如果退补活操作成功，则根据操作类型对对应订单商品数量进行调整
			
		}
		return result;
	}
	
}

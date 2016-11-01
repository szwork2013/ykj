package com.gnet.app.orderDeliverGoods;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import tk.mybatis.mapper.common.Mapper;

public interface OrderDeliverGoodsMapper extends Mapper<OrderDeliverGoods> {

	public int deleteById(@Param("id") String id, @Param("date") Date date);

	public Integer batchSave(@Param("serviceGoods") List<OrderDeliverGoods> serviceGoods, @Param("date") Date date,
			@Param("serviceId") String serviceId);

	public List<OrderDeliverGoods> findAllList(@Param("orderList") List<String> orderList,
			@Param("serviceId") String serviceId);

	public List<OrderDeliverGoods> selectAllList(@Param("serviceId") String serviceId);

	public Integer deleteAll(@Param("orderDeliverGoods") List<OrderDeliverGoods> orderDeliverGoods);

	/**
	 * 根据订单号及商品编号获取已经送货的数量信息
	 * 
	 * @param orderId
	 * @param goodId
	 * @return
	 */
	public Integer getAlreadyDeliberGoodNumCount(@Param("orderId") String orderId, @Param("goodId") String goodId);
}

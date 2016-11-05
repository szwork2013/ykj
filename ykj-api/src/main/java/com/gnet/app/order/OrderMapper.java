package com.gnet.app.order;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import tk.mybatis.mapper.common.Mapper;

public interface OrderMapper extends Mapper<Order> {
	
	public int deleteById(@Param("id") String id, @Param("date") Date date);
	
	public int deleteByIds(@Param("ids") String ids[], @Param("date") Date date);
	
	public List<Order> selectOrdersPersonal(@Param("orderList") List<String> orderList, @Param("type") Integer type, @Param("orderSource") Integer orderSource, @Param("orderResponsibleName") String orderResponsibleName,
			@Param("customerName") String customerName, @Param("startOrderDate") String startOrderDate, @Param("endOrderDate") String endOrderDate, 
			@Param("mutiSearchColumn") String mutiSearchColumn, @Param("clerkId") String clerkId);
	
	public List<Order> selectOrdersUnderStore(@Param("orderList") List<String> orderList, @Param("type") Integer type, @Param("orderSource") Integer orderSource, @Param("orderResponsibleName") String orderResponsibleName,
			@Param("customerName") String customerName, @Param("startOrderDate") String startOrderDate, @Param("endOrderDate") String endOrderDate, 
			@Param("mutiSearchColumn") String mutiSearchColumn, @Param("storeId") String storeId);
	
	public List<Order> selectOrdersUnderBusiness(@Param("orderList") List<String> orderList, @Param("type") Integer type, @Param("orderSource") Integer orderSource, @Param("orderResponsibleName") String orderResponsibleName,
			@Param("customerName") String customerName, @Param("startOrderDate") String startOrderDate, @Param("endOrderDate") String endOrderDate, 
			@Param("mutiSearchColumn") String mutiSearchColumn, @Param("businessId") String businessId);
	
	public Order selectTodayLastCreateOrder(@Param("today") String date);
	
	/**
	 * 根据查询条件查询订单极其关联明细信息
	 * @param condition
	 * @return
	 */
	public List<Order> selectOrdersAllWithDetailByCondition(OrderCondition condition);
	
	/**
	 * 获取用于打印的订单信息
	 * @param businessId
	 * @param orderId
	 * @return
	 */
	public Order getOrdersForPrintByCondition(@Param("businessId")String businessId,@Param("orderId")String orderId);
	
	
	/**
	 * 根据订单查询条件查询相关统计结果
	 * @param condition
	 * @return
	 */
	public List<OrderTypeStatisticalResult> selectOrderTypeStatisticalResultByCondition(OrderCondition condition);
	
	
	/**
	 * 根据查询条件查询订单明细
	 * @param condition
	 * @return
	 * List<Order>
	 */
	public List<Order> selectOrderDetailsByCondition(OrderCondition condition);
	
	/**
   * 根据ID条件查询订单明细
   * @param id
   * @return
   * Order
   */
	public Order getOrderDetailByIdAndBusinessId(@Param("businessId")String businessId,@Param("id")String id);
}

package com.gnet.app.orderProcess;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import tk.mybatis.mapper.common.Mapper;

public interface OrderProcessMapper extends Mapper<OrderProcess> {
	
	public int insertAllOrderProcess(@Param("processes") List<OrderProcess> processes);

	public OrderProcess findByOrderId(@Param("orderId") String orderId, @Param("type") Integer type);
	
	public List<OrderProcess> selectAllWithOrdeInfo(@Param("orderId") String orderId);
	
	/**
	 * 完成流程状态
	 * @param orderId
	 * @param type
	 * @return
	 */
	public int updateProcessFinishStatus(@Param("orderId") String orderId, @Param("type") Integer type,@Param("isFinish") Integer isFinish);
	
}

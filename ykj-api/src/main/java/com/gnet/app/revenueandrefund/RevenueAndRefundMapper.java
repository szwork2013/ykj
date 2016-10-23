package com.gnet.app.revenueandrefund;

import java.math.BigDecimal;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import tk.mybatis.mapper.common.Mapper;

public interface RevenueAndRefundMapper extends Mapper<RevenueAndRefund> {

	/**
	 * 根据查询条件查询订单首付款明细信息
	 * 
	 * @param condition
	 * @return
	 */
	public List<RevenueAndRefund> selectRevenueAndRefundsAllWithDetailByCondition(RevenueAndRefundCondition condition);

	public RevenueAndRefund findById(@Param("id") String id);

	public BigDecimal selectAmountStatistics(@Param("orderId") String orderId);

	public AmountStatistics selectAmountStatisticsByCategory(@Param("orderId") String orderId);

	public AmountStatistics selectAmountStatisticsByPayWay(@Param("orderId") String orderId);

	public AmountStatistics selectAmountStatisticsByCategoryAndPayWay(@Param("orderId") String orderId);
}

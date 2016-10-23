package com.gnet.app.revenueandrefund;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AmountStatistics {

	private String orderId;
	/**
	 * 类目
	 */
	private Integer category;
	
	/**
	 * 类目名称
	 */
	private String categoryName;
	
	/**
	 * 支付方式
	 */
	private Integer payWay;
	
	/**
	 * 支付方式名称
	 */
	private String payWayName;
	
	/**
	 * 总额
	 */
	private BigDecimal amount;
	
}

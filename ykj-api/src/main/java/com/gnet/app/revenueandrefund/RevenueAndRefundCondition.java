package com.gnet.app.revenueandrefund;

import com.gnet.app.CommonCondition;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RevenueAndRefundCondition extends CommonCondition {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1663781815142159743L;

	private String orderId;
	
	private Integer category;
	
	private Integer payWay;
	
	
	

}

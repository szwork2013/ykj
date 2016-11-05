package com.gnet.app.financeExpense;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 财务支出信息查询条件
 *
 */
@Setter
@Getter
@ToString
public class FinanceExpenseCondition {

	/** 记录人编号**/
	private String recordPersonId;
	
	/** 模糊订单编号**/
	private String fuzzyOrderId;
	
	/** 付款类目**/
	private Integer type;
	
	/** 付款方式**/
	private Integer way;
	
	/** 订单编号**/
	private String orderId;
	
	/** 模糊文本**/
	private String fuzzyText;
	
	/** 商家编码 **/
	private String businessId;
	
}

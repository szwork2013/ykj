package com.gnet.app.financeExpense;

import com.gnet.resource.errorBuilder.BaseErrorBuilder;

/**
 * 财务支出信息操作错误创建器
 *
 */
public class FinanceExpenseErrorBuilder extends BaseErrorBuilder {
	
	/**
	 * 支出记录ID为空
	 */
	public static final Integer ERROR_ID_NULL = 13000;
	
	/**
	 * 类目为空
	 */
	public static final Integer ERROR_TYPE_NULL = 13001;
	
	/**
	 * 付款方式为空
	 */
	public static final Integer ERROR_WAY_NULL = 130002;
	
	
	/**
	 * 金额为空
	 */
	static final Integer ERROR_MONEY_NULL = 13004;
	
	/**
	 * 财务支出记录为空
	 */
	public static final Integer ERROR_FINANCEEXPENSE_NULL = 13999;
	
	public FinanceExpenseErrorBuilder(Integer code, String msg) {
		super(code, msg);
	}

}

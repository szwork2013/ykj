package com.gnet.app.revenueandrefund;

import com.gnet.resource.errorBuilder.BaseErrorBuilder;

public class RevenueAndRefundErrorBuilder extends BaseErrorBuilder {

	/**
	 * 类目为空
	 */
	public static final Integer ERROR_CATEGORY_NULL = 13000;

	/**
	 * 订单ID为空
	 */
	public static final Integer ERROR_ORDER_ID_NULL = 13001;

	/**
	 * 付款方式为空
	 */
	public static final Integer ERROR_PAYWAY_NULL = 13033;

	/**
	 * 金额为空
	 */
	static final Integer ERROR_PAYMENT_NULL = 13034;
	
	/**
	 * 收付款记录为空
	 */
	static final Integer ERROR_REVENUEANDREFUND_NULL = 13034;

	public RevenueAndRefundErrorBuilder(Integer code, String msg) {
		super(code, msg);
	}

}

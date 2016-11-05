package com.gnet.app.orderReturnAndReplenish;

import com.gnet.resource.errorBuilder.BaseErrorBuilder;

/**
 * 退补活错误创建器
 *
 */
public class OrderReturnAndReplenishErrorBuilder extends BaseErrorBuilder {
	
	/**
	 * 退补活编号为空
	 */
	public static final Integer ERROR_ID_NULL = 13000;
	
	/**
	 * 退补活类型为空
	 */
	public static final Integer ERROR_TYPE_NULL = 13001;
	
	/**
	 * 订单编号为空
	 */
	public static final Integer ERROR_ORDER_ID_NULL = 130002;
	
	/**
	 * 订单商品编号为空
	 */
	static final Integer ERROR_ORDER_GOODS_ID_NULL = 13003;
	
	/**
	 * 商品数量
	 */
	static final Integer ERROR_RAR_NUMS_NULL = 13004;
	
	/**
	 * 成交单价为空错误
	 */
	static final Integer ERROR_STRIKE_UNIT_PRICE_NULL = 13005;
	
	/**
	 * 退补货记录为空
	 */
	public static final Integer ERROR_ORDERRETURNANDREPLENISH_NULL = 13999;
	
	public OrderReturnAndReplenishErrorBuilder(Integer code, String msg) {
		super(code, msg);
	}

}

package com.gnet.app.orderReturnAndReplenish;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 退补活查询条件
 *
 */
@Setter
@Getter
@ToString
public class OrderReturnAndReplenishCondition {

	/** 主键**/
	private String id;
	
	/** 退补活类型**/
	private Integer type;
	
	/** 订单编号**/
	private String orderId;
	
	/** 订单商品编号**/
	private String orderGoodsId;
	
}

package com.gnet.app.orderService;

import com.gnet.app.CommonCondition;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderServiceCondition extends CommonCondition{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8528244915326070864L;

	/**
	 * 类型
	 */
	private Integer type;
	
	/**
	 * 类型组
	 */
	private Integer[] types;
	
	/**
	 * 订单编号
	 */
	private String orderId;
	
	/**
	 * 服务单号
	 */
	private String serviceCode;
	
	/**
	 * 服务人员编号
	 */
	private String clerkId;
	
	/**
	 * 是否删除
	 */
	private Integer isDel;
	
	/**
	 * 是否已经结算
	 */
	private Integer isClear;
	
	/**
	 * 是否已完成
	 */
	private Integer isFinish;
	
	/**
	 * 模糊文本搜索
	 */
	private String fuzzyText;
	
}

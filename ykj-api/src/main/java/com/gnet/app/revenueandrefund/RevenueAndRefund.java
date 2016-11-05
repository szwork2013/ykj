package com.gnet.app.revenueandrefund;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gnet.app.clerk.Clerk;
import com.gnet.app.order.Order;
import com.gnet.mybatis.BaseEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "ykj_revenue_and_refund")
public class RevenueAndRefund extends BaseEntity {
	
	/**
	 * 订金
	 */
	public static Integer TYPE_CATEGORY_DOWNPAYMENT = 0;
	
	/**
	 * 收款
	 */
	public static Integer TYPE_CATEGORY_REVENUE = 1;
	
	/**
	 * 退款
	 */
	public static Integer TYPE_CATEGORY_REFUND = 2;
	
	/**
	 * 其他
	 */
	public static Integer TYPE_CATEGORY_OTHER = 9;
	
	/**
	 * 现金
	 */
	public static Integer TYPE_PAYWAY_CASH = 0;
	
	/**
	 * 刷卡
	 */
	public static Integer TYPE_PAYWAY_CARD = 1;
	
	/**
	 * 支付宝
	 */
	public static Integer TYPE_PAYWAY_ALIPAY = 2;
	
	/**
	 * 微信
	 */
	public static Integer TYPE_PAYWAY_WECHAT = 3;
	
	/**
	 * 其他
	 */
	public static Integer TYPE_PAYWAY_OTHER = 9;

	private static final long serialVersionUID = 840857321507175260L;

	/** 创建日期 **/
	private @JsonFormat(pattern = "yyyy-MM-dd") Date createDate;

	/** 修改日期 **/
	private @JsonFormat(pattern = "yyyy-MM-dd") Date modifyDate;

	/** 订单编号 **/
	private String orderId;

	/** 类目 **/
	private Integer category;

	/** 类目名称 **/
	private String categoryName;

	/** 金额 **/
	private BigDecimal payment;

	/** 付款方式 **/
	private Integer payWay;

	/** 付款方式名称 **/
	private String payWayName;

	/** 记录人 **/
	private String recorder;

	/** 记录时间 **/
	private @JsonFormat(pattern = "yyyy-MM-dd") Date recorderDate;

	/** 记录人 **/
	private String remark;
	
	/** 关联订单信息 **/
	private @Transient Order order;
	
	/** 记录人信息**/
	private @Transient Clerk recorderClerk;

}

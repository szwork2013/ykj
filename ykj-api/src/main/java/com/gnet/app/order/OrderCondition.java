package com.gnet.app.order;

import java.util.Date;

import com.gnet.app.CommonCondition;

public class OrderCondition extends CommonCondition {

	/**
	 * 订单负责人（跟单人）
	 */
	private String orderResponsibleId;
	/**
	 * 下单人
	 */
	private String orderCreatorId;
	/**
	 * 客户编码
	 */
	private String customerId;
	/**
	 * 门店编码
	 */
	private String sotreId;
	/**
	 * 类型
	 */
	private Integer type;
	/**
	 * 订单号
	 */
	private String orderNo;
	/**
	 * 订单日期
	 */
	private String orderDate;
	/**
	 * 订单来源
	 */
	private Integer orderSource;
	/**
	 * 是否删除
	 */
	private Integer isDel;

	/**
	 * 模糊文本
	 */
	private String fuzzyText;
	
	/**
	 * 定制的日期字段
	 */
	private String customDateFiled;
	
	/**
	 * 定制的开始时间
	 */
	private String customDateStart;
	
	/**
	 * 定时的结束时间
	 */
	private String customDateEnd;
	
	/**
	 * 定制的用户字段
	 */
	private String customUserField;
	

	public String getOrderResponsibleId() {
		return orderResponsibleId;
	}

	public void setOrderResponsibleId(String orderResponsibleId) {
		this.orderResponsibleId = orderResponsibleId;
	}

	public String getOrderCreatorId() {
		return orderCreatorId;
	}

	public void setOrderCreatorId(String orderCreatorId) {
		this.orderCreatorId = orderCreatorId;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public Integer getOrderSource() {
		return orderSource;
	}

	public void setOrderSource(Integer orderSource) {
		this.orderSource = orderSource;
	}

	public Integer getIsDel() {
		return isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}

	public String getFuzzyText() {
		return fuzzyText;
	}

	public void setFuzzyText(String fuzzyText) {
		this.fuzzyText = fuzzyText;
	}

	public String getCustomDateFiled() {
		return customDateFiled;
	}

	public void setCustomDateFiled(String customDateFiled) {
		this.customDateFiled = customDateFiled;
	}

	public String getCustomUserField() {
		return customUserField;
	}

	public void setCustomUserField(String customUserField) {
		this.customUserField = customUserField;
	}

	public String getSotreId() {
		return sotreId;
	}

	public void setSotreId(String sotreId) {
		this.sotreId = sotreId;
	}

	public String getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}

	public String getCustomDateStart() {
		return customDateStart;
	}

	public void setCustomDateStart(String customDateStart) {
		this.customDateStart = customDateStart;
	}

	public String getCustomDateEnd() {
		return customDateEnd;
	}

	public void setCustomDateEnd(String customDateEnd) {
		this.customDateEnd = customDateEnd;
	}
	
	

}

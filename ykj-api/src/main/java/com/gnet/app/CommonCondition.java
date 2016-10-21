package com.gnet.app;

/**
 * 通用查询条件基类
 * @author JunLin.Yang
 *
 */
public class CommonCondition  implements java.io.Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 商家编码
	 */
	private String businessId;
	
	/**
	 * 排序字段
	 */
	private String orderField;
	
	/**
	 * 排序方向
	 */
	private String orderDirection;
	
	/**
	 * 排序字符串
	 */
	private String orderString;
	
	

	public String getBusinessId() {
		return businessId;
	}

	public void setBusinessId(String businessId) {
		this.businessId = businessId;
	}

	public String getOrderField() {
		return orderField;
	}

	public void setOrderField(String orderField) {
		this.orderField = orderField;
	}

	public String getOrderDirection() {
		return orderDirection;
	}

	public void setOrderDirection(String orderDirection) {
		this.orderDirection = orderDirection;
	}

	public String getOrderString() {
		return orderString;
	}

	public void setOrderString(String orderString) {
		this.orderString = orderString;
	}
	
	
	
}

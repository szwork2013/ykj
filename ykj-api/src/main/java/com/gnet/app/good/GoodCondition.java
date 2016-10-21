package com.gnet.app.good;

public class GoodCondition implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 商品名称模糊值
	 */
	private String fuzzyName;

	/**
	 * 商品类型模糊值
	 */
	private String fuzzyModel;

	/**
	 * 在售状态
	 */
	private Integer onsaleStatus;

	/**
	 * 商家编号
	 */
	private String businessId;

	public String getFuzzyName() {
		return fuzzyName;
	}

	public void setFuzzyName(String fuzzyName) {
		this.fuzzyName = fuzzyName;
	}

	public String getFuzzyModel() {
		return fuzzyModel;
	}

	public void setFuzzyModel(String fuzzyModel) {
		this.fuzzyModel = fuzzyModel;
	}

	public Integer getOnsaleStatus() {
		return onsaleStatus;
	}

	public void setOnsaleStatus(Integer onsaleStatus) {
		this.onsaleStatus = onsaleStatus;
	}

	public String getBusinessId() {
		return businessId;
	}

	public void setBusinessId(String businessId) {
		this.businessId = businessId;
	}

}

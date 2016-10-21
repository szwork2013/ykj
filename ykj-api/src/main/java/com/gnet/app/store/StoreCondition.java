package com.gnet.app.store;

import com.gnet.app.CommonCondition;

public class StoreCondition extends CommonCondition {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8482073302207237049L;

	/**
	 * 门店名称模糊
	 */
	private String fuzzyName;
	
	/**
	 * 是否删除
	 */
	private Integer isDel;

	public String getFuzzyName() {
		return fuzzyName;
	}

	public void setFuzzyName(String fuzzyName) {
		this.fuzzyName = fuzzyName;
	}

	public Integer getIsDel() {
		return isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}
	
	
}

package com.gnet.app.customer;

import com.gnet.app.CommonCondition;

public class CustomerCondition extends CommonCondition{

	/**
	 * 是否删除
	 */
	private Integer isDel ;
	
	/**
	 * 是否有效
	 */
	private Integer isEffectivity;
	
	/**
	 * 客户姓名模糊
	 */
	private String fuzzyName;
	
	/**
	 * 来源类型
	 */
	private Integer orginType;

	public Integer getIsDel() {
		return isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}

	public Integer getIsEffectivity() {
		return isEffectivity;
	}

	public void setIsEffectivity(Integer isEffectivity) {
		this.isEffectivity = isEffectivity;
	}

	public String getFuzzyName() {
		return fuzzyName;
	}

	public void setFuzzyName(String fuzzyName) {
		this.fuzzyName = fuzzyName;
	}

	public Integer getOrginType() {
		return orginType;
	}

	public void setOrginType(Integer orginType) {
		this.orginType = orginType;
	}
	
	
}

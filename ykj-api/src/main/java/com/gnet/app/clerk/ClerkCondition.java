package com.gnet.app.clerk;

import com.gnet.app.CommonCondition;

public class ClerkCondition extends CommonCondition {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 *  直属部门编号
	 */
	private String officeId;
	
	/**
	 * 门店编号
	 */
	private String storeId;
	
	/**
	 * 角色类型
	 */
	private Integer roleType;
	
	/**
	 * 姓名模糊
	 */
	private String fuzzyName;
	
	/**
	 * 是否删除
	 */
	private String isDel;

	public String getOfficeId() {
		return officeId;
	}

	public void setOfficeId(String officeId) {
		this.officeId = officeId;
	}

	public String getStoreId() {
		return storeId;
	}

	public void setStoreId(String storeId) {
		this.storeId = storeId;
	}

	public Integer getRoleType() {
		return roleType;
	}

	public void setRoleType(Integer roleType) {
		this.roleType = roleType;
	}

	public String getFuzzyName() {
		return fuzzyName;
	}

	public void setFuzzyName(String fuzzyName) {
		this.fuzzyName = fuzzyName;
	}

	public String getIsDel() {
		return isDel;
	}

	public void setIsDel(String isDel) {
		this.isDel = isDel;
	}
	
	
	
}

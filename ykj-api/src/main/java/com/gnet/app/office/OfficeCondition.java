package com.gnet.app.office;

import com.gnet.app.CommonCondition;

public class OfficeCondition extends CommonCondition {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5554075063579441863L;

	/**
	 * 上级部门编码
	 */
	private String parentId;
	
	/**
	 * 部门名称模糊
	 */
	private String fuzzyName;
	
	/**
	 * 部门编码
	 */
	private String code;
	
	/**
	 * 部门层级
	 */
	private Integer level;
	
	/**
	 * 部门类型
	 */
	private Integer type;
	
	/**
	 * 是否删除
	 */
	private Integer isDel;

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getFuzzyName() {
		return fuzzyName;
	}

	public void setFuzzyName(String fuzzyName) {
		this.fuzzyName = fuzzyName;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getIsDel() {
		return isDel;
	}

	public void setIsDel(Integer isDel) {
		this.isDel = isDel;
	}
	
	
	
}

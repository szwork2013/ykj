package com.gnet.app.office;

import com.gnet.app.CommonCondition;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Setter
@Getter
@ToString
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
	private Boolean isDel;
	
}

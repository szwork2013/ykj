package com.gnet.app.clerk;

import com.gnet.app.CommonCondition;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
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
	private Boolean isDel;

}

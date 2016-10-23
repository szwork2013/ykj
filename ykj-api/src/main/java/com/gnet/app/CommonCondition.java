package com.gnet.app;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 通用查询条件基类
 * @author JunLin.Yang
 *
 */
@Getter
@Setter
@ToString
public class CommonCondition  implements java.io.Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	
	/**
	 * 商家编码
	 */
	private String businessId;
	
	/**
	 * 门店编码
	 */
	private String sotreId;

	/**
	 * 跟单人编码
	 */
	private String orderResponsibleId;
	
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
	
	
	
}

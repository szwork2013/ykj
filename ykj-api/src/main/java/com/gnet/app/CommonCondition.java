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

	public String getBusinessId() {
		return businessId;
	}

	public void setBusinessId(String businessId) {
		this.businessId = businessId;
	}
	
	
	
}

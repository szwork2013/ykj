package com.gnet.app.storageIn;

import com.gnet.resource.errorBuilder.BaseErrorBuilder;

public class StorageInErrorBuilder extends BaseErrorBuilder {
	
	/**
	 * 出入单编号为空
	 */
	public static final Integer ERROR_ID_NULL = 13000;
	
	/**
	 * 编号无法找到对应的出入单信息
	 */
	public static final Integer ERROR_STORAGEIN_NULL = 13001;
	
	/**
	 * 批次号不能为空
	 */
	public static final Integer ERROR_BATCHNUMBER_NULL = 13002;
	
	 /**
   * 入库类型不能为空
   */
  public static final Integer ERROR_TYPE_NULL = 13003;
  
  /**
  * 入库明细不能为空
  */
 public static final Integer ERROR_STORAGEINDETAIL_NULL = 13004;
 
 /**
  * 数据长度过长
  */
 public static final Integer ERROR_DATALENGTH_OVER = 13999;
	
	
	public StorageInErrorBuilder(Integer code, String msg) {
		super(code, msg);
	}

}

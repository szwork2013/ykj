package com.gnet.app.storageOutDetail;

import com.gnet.resource.errorBuilder.BaseErrorBuilder;

public class StorageOutDetailErrorBuilder extends BaseErrorBuilder {
	
	/**
	 * 出库单编号为空
	 */
	public static final Integer ERROR_STORAGEOUTID_NULL = 13000;

  /**
   * 出库明细为空
   */
  public static final Integer ERROR_STORAGEOUTDETAIL_NULL = 13000;
	
	public StorageOutDetailErrorBuilder(Integer code, String msg) {
		super(code, msg);
	}

}

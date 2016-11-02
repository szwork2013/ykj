package com.gnet.app.storageInDetail;

import com.gnet.resource.errorBuilder.BaseErrorBuilder;

public class StorageInDetailErrorBuilder extends BaseErrorBuilder {
	
	/**
	 * 入库单编号为空
	 */
	public static final Integer ERROR_STORAGEINID_NULL = 13000;

  /**
   * 入库明细为空
   */
  public static final Integer ERROR_STORAGEINDETAIL_NULL = 13000;
	
	public StorageInDetailErrorBuilder(Integer code, String msg) {
		super(code, msg);
	}

}

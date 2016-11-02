package com.gnet.app.storageOutDetail;

import java.util.List;

import tk.mybatis.mapper.common.Mapper;

/**
 * 出库详情Mapper
 */
public interface StorageOutDetailMapper extends Mapper<StorageOutDetail> {

  /**
   * 根据出库单ID获取出库详情信息集合
   * @param storageOutId
   * @return
   * List<StorageInDetail>
   */
  public List<StorageOutDetail> selectStorageOutDetailListByCondition(StorageOutDetailCondition condition);
  
}

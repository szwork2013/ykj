package com.gnet.app.storageInDetail;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import tk.mybatis.mapper.common.Mapper;

/**
 * 入库详情Mapper
 */
public interface StorageInDetailMapper extends Mapper<StorageInDetail> {
  
  /**
   * 根据入库单ID获取入库详情信息集合
   * @param storageInId
   * @return
   * List<StorageInDetail>
   */
  public List<StorageInDetail> selectStorageInDetailListByCondition(StorageInDetailCondition condition);
  
}

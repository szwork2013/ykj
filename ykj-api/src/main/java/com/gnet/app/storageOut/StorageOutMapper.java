package com.gnet.app.storageOut;

import java.util.List;

import tk.mybatis.mapper.common.Mapper;

/**
 * 出库Mapper
 */
public interface StorageOutMapper extends Mapper<StorageOut> {
  
  /**
   * 根据查询条件查询出库历史明细数据集合
   * @param condition
   * @return
   * List<StorageOut>
   */
  public List<StorageOut> selectStorageOutHistoryDataListByCondition(StorageOutCondition condition);
  
}

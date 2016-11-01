package com.gnet.app.storageIn;

import java.util.List;

import tk.mybatis.mapper.common.Mapper;

public interface StorageInMapper extends Mapper<StorageIn> {
  
  public List<StorageIn> selectStorageInHistoryDataListByCondition(StorageInCondition condition);
  
}

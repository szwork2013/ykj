package com.gnet.app.storageOut;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;

public class StorageOutValidator {

  private StorageOutValidator() {
  }

  static Map<String, Object> validateBeforeCreateStorageOut(StorageOut storageOut) {
    Map<String, Object> map = new HashMap<>();

    if (StringUtils.isBlank(storageOut.getBatchNumber())) {
      map.put("code", StorageOutErrorBuilder.ERROR_BATCHNUMBER_NULL);
      map.put("msg", "批次号不能为空");
      return map;
    }

    if (null == storageOut.getType()) {
      map.put("code", StorageOutErrorBuilder.ERROR_TYPE_NULL);
      map.put("msg", "出库类型不能为空");
      return map;
    }

    if (CollectionUtils.isEmpty(storageOut.getStorageOutDetailList())) {
      map.put("code", StorageOutErrorBuilder.ERROR_STORAGEINDETAIL_NULL);
      map.put("msg", "出库明细不能为空");
      return map;
    }

    if (StringUtils.isBlank(storageOut.getBatchNumber()) && 50 < storageOut.getBatchNumber().length()) {
      map.put("code", StorageOutErrorBuilder.ERROR_DATALENGTH_OVER);
      map.put("msg", "批次号长度不能超过50");
      return map;
    }

    return null;
  }

}
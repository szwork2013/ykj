package com.gnet.app.storageIn;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;

public class StorageInValidator {

  private StorageInValidator() {
  }

  static Map<String, Object> validateBeforeCreateStorageIn(StorageIn storageIn) {
    Map<String, Object> map = new HashMap<>();

    if (StringUtils.isBlank(storageIn.getBatchNumber())) {
      map.put("code", StorageInErrorBuilder.ERROR_BATCHNUMBER_NULL);
      map.put("msg", "批次号不能为空");
      return map;
    }

    if (null == storageIn.getType()) {
      map.put("code", StorageInErrorBuilder.ERROR_TYPE_NULL);
      map.put("msg", "入库类型不能为空");
      return map;
    }

    if (CollectionUtils.isEmpty(storageIn.getStorageInDetailList())) {
      map.put("code", StorageInErrorBuilder.ERROR_STORAGEINDETAIL_NULL);
      map.put("msg", "入库明细不能为空");
      return map;
    }

    if (StringUtils.isBlank(storageIn.getBatchNumber()) && 50 < storageIn.getBatchNumber().length()) {
      map.put("code", StorageInErrorBuilder.ERROR_DATALENGTH_OVER);
      map.put("msg", "批次号长度不能超过50");
      return map;
    }

    return null;
  }

}
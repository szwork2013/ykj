package com.gnet.app.storageOut;

import com.gnet.utils.sort.OrderType;

public enum StorageOutOrderType implements OrderType{

  TYPE("type", "type");
  
  private String key;
  private String value;

  private StorageOutOrderType(String key, String value) {
    this.key = key;
    this.value = value;
  }
  
  public String getKey() {
    return key;
  }
  
  public String getValue() {
    return value;
  }
  
}

package com.gnet.app.storageIn;

import com.gnet.utils.sort.OrderType;

public enum StorageInOrderType implements OrderType{

  TYPE("type", "type");
  
  private String key;
  private String value;

  private StorageInOrderType(String key, String value) {
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

package com.gnet.app.storageOut;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StorageOutCondition{
  /** 
  * @Fields serialVersionUID 
  * @creator     :JunLin.Yang
  */ 
  private static final long serialVersionUID = 5915801595398966199L;
  
  /**
   * 商家编码
   */
  private String businessId;
  
  /**
   * 仓储管理员编码
   */
  private String clerkId;
  
  /**
   * 商品编码
   */
  private String goodId;
  
  /**
   * 批次号模糊值
   */
  private String fuzzyBatchNumber;
  
  /**
   * 出库类型
   */
  private Integer type;
  
  /**
   * 出库开始时间
   */
  private String storageOutStartDate ;
  
  /**
   * 出库结束时间
   */
  private String storageOutEndDate;
  
  private String orderId;
  
}

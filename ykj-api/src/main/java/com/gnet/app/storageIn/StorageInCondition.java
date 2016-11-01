package com.gnet.app.storageIn;

import com.gnet.app.CommonCondition;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StorageInCondition{
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
   * 入库类型
   */
  private Integer type;
  
  /**
   * 入库开始时间
   */
  private String storageInStartDate ;
  
  /**
   * 入库结束时间
   */
  private String storageInEndDate;
  
}

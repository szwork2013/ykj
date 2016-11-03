package com.gnet.app.good;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 商品库存出入库信息对象
 */
@Setter
@Getter
@ToString
public class GoodStorageInAndOutRecord implements Serializable{

  /** 
  * @Fields serialVersionUID :
  * @creator     :JunLin.Yang
  */ 
  private static final long serialVersionUID = -8147347384662631570L;

  private String id;
  
  /**
   * 出入库类型 ， 0 ： 入库 ， 1 ：出库
   */
  private Integer type ;
  
  /**
   * 批次号
   */
  private String batchNumber ;
  
  /**
   * 时间
   */
  private Date changeDate;
  
  /**
   * 数量
   */
  private Integer num;

  /**
   * 成本
   */
  private BigDecimal cost;
  
}

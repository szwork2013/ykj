package com.gnet.app.good;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class StorageGoodStatusDetail implements Serializable{

  /** 
   * @Fields serialVersionUID : 
   * @creator     :JunLin.Yang
   */
  private static final long serialVersionUID = -6596400766741272369L;

  /**
   * 商品信息
   */
  private Good good;

  /**
   * 预留库存数
   */
  private BigDecimal reservedTotalNum;

  /**
   * 未发货商品数
   */
  private BigDecimal needDeliverTotalNum;

  /**
   * 已出库商品数
   */
  private BigDecimal storageOutTotalNum;

}

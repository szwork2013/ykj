package com.gnet.app.good;

import java.math.BigDecimal;

public class StorageGoodStatusDetail {

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
  private BigDecimal reservedGoods;

  /**
   * 未发货商品数
   */
  private BigDecimal needDeliverNum;

  /**
   * 已出库商品数
   */
  private BigDecimal storageOutNum;

}

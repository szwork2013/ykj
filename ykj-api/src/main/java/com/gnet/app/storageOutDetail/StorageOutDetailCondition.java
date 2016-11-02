package com.gnet.app.storageOutDetail;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StorageOutDetailCondition {

  /** 
  * @Fields serialVersionUID :
  * @creator     :JunLin.Yang
  */
  private static final long serialVersionUID = -4793625098406919639L;

  /**
   * 出库编号
   */
  private String storageOutId;
  
  /**
   * 入库商品编号
   */
  private String storageGoodsId;
}

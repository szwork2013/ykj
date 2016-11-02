package com.gnet.app.storageOutDetail;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.gnet.app.good.Good;
import com.gnet.app.storageOut.StorageOut;
import com.gnet.mybatis.BaseEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "ykj_storage_out_detail")
public class StorageOutDetail extends BaseEntity {

  /** 
  * @Fields serialVersionUID :
  * @creator     :JunLin.Yang
  */
  private static final long serialVersionUID = -4793625098406919639L;

  /**
   * 创建时间
   */
  private Date createDate;

  /**
   * 修改时间
   */
  private Date modifyDate;

  /**
   * 商品编号
   */
  private String storageGoodsId;

  /**
   * 出库编号
   */
  private String storageOutId;

  /**
   * 数量
   */
  private Integer num;
  
  //-----------------------额外信息---------------------------------
  
  /**
   * 商品信息
   */
  private @Transient Good good;
  
  /**
   * 出库信息
   */
  private @Transient StorageOut storageOut;
  
}

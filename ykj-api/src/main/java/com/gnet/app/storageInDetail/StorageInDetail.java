package com.gnet.app.storageInDetail;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.gnet.mybatis.BaseEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "ykj_storage_in_detail")
public class StorageInDetail extends BaseEntity {

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
   * 入库编号
   */
  private String storageInId;

  /**
   * 数量
   */
  private Integer num;

  /**
   * 入库数量
   */
  private BigDecimal cost;
  
  //-----------------------额外信息---------------------------------
  /**
   * 商品名称
   */
  private @Transient String goodName;
  
  /**
   * 商品型号
   */
  private @Transient String goodModel;
  
  /**
   * 商品类别
   */
  private @Transient String goodType;
  
  /**
   * 商品在售状态
   */
  private @Transient String goodOnsaleStatusName;
  
}

package com.gnet.app.storageOut;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.gnet.app.business.Business;
import com.gnet.app.clerk.Clerk;
import com.gnet.app.storageOutDetail.StorageOutDetail;
import com.gnet.mybatis.BaseEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "ykj_storage_out")
public class StorageOut extends BaseEntity {

  /** 
  * @Fields serialVersionUID :
  * @creator     :JunLin.Yang
  */
  private static final long serialVersionUID = -4793625098406919639L;

  /**
   * 类型：其他
   */
  public final static Integer TYPE_OTHER = 0;

  /**
   * 类型：订单出库
   */
  public final static Integer TYPE_ORDER = 1;

  /**
   * 类型：补货出库
   */
  public final static Integer TYPE_REPLENISHMENT = 2;

  /**
   * 类型：退回工厂
   */
  public final static Integer TYPE_RETURN = 3;

  /**
   * 创建时间
   */
  private Date createDate;

  /**
   * 修改时间
   */
  private Date modifyDate;

  /**
   * 出库类型
   */
  private Integer type;

  /**
   * 商家编号
   */
  private String businessId;

  /**
   * 仓库管理员编号
   */
  private String clerkId;
  
  /**
   * 订单编号
   */
  private String orderId;

  /**
   * 出库批次号
   */
  private String batchNumber;

  /**
   * 出库日期
   */
  private Date changeDate;

  /**
   * 备注
   */
  private String remark;

  //-----------------------额外信息---------------------------------
  /**
   * 商家信息
   */
  private @Transient Business business;

  /**
   * 顾客信息
   */
  private @Transient Clerk clerk;

  /**
   * 出库方式名称
   */
  private @Transient String typeName;

  /**
   * 出库数量
   */
  private @Transient BigDecimal outTotalNum;

  /**
   * 出库明细信息
   */
  private @Transient List<StorageOutDetail> storageOutDetailList;
}

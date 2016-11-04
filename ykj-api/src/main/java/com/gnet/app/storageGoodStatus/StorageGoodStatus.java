package com.gnet.app.storageGoodStatus;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gnet.mybatis.BaseEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "ykj_storage_goods_status")
public class StorageGoodStatus implements Serializable {

  private static final long serialVersionUID = 5110909209855011463L;

  @Id
  private String id;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  /** 创建日期 **/
  private Date createDate;

  /** 修改日期 **/
  private Date modifyDate;

  /** 当前库存量 **/
  private Long storeNow;

}

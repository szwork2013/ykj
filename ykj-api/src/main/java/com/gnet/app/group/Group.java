package com.gnet.app.group;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gnet.mybatis.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by yaoping on 16/10/23.
 */
@Setter
@Getter
@Entity
@Table(name = "ykj_groupbuy")
public class Group extends BaseEntity {

    /** 录入时间  **/
    private @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date createDate;

    /** 更新时间 **/
    private @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date modifyDate;

    private String name;

    private String content;

    private String photo;

    private String goodId;

    private BigDecimal groupPrice;

    private Integer groupLimit;

    private Integer groupLimitSurplus;
}

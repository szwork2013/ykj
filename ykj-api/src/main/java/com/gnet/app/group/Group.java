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

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getGoodId() {
        return goodId;
    }

    public void setGoodId(String goodId) {
        this.goodId = goodId;
    }

    public BigDecimal getGroupPrice() {
        return groupPrice;
    }

    public void setGroupPrice(BigDecimal groupPrice) {
        this.groupPrice = groupPrice;
    }

    public Integer getGroupLimit() {
        return groupLimit;
    }

    public void setGroupLimit(Integer groupLimit) {
        this.groupLimit = groupLimit;
    }

    public Integer getGroupLimitSurplus() {
        return groupLimitSurplus;
    }

    public void setGroupLimitSurplus(Integer groupLimitSurplus) {
        this.groupLimitSurplus = groupLimitSurplus;
    }

    private Integer groupLimit;

    private Integer groupLimitSurplus;



}

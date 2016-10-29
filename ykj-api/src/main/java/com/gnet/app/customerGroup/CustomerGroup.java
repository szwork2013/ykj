package com.gnet.app.customerGroup;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gnet.mybatis.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by yaoping on 16/10/27.
 */
@Entity
@Getter
@Setter
@Table(name = "ykj_customer_groupbuy")
public class CustomerGroup extends BaseEntity {

    /** 录入时间  **/
    private @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date createDate;

    /** 更新时间 **/
    private @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date modifyDate;

    private BigDecimal payment;

    private String groupbuyId;

    private String customerId;

    private String remark;

    /** ====================表外置参数========================== **/

    private @Transient String username;
    private @Transient String mobile;
    private @Transient String groupname;
    private @Transient String groupprice;
    private @Transient String address;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

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

    public BigDecimal getPayment() {
        return payment;
    }

    public void setPayment(BigDecimal payment) {
        this.payment = payment;
    }

    public String getGroupbuyId() {
        return groupbuyId;
    }

    public void setGroupbuyId(String groupbuyId) {
        this.groupbuyId = groupbuyId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getGroupname() {
        return groupname;
    }

    public void setGroupname(String groupname) {
        this.groupname = groupname;
    }

    public String getGroupprice() {
        return groupprice;
    }

    public void setGroupprice(String groupprice) {
        this.groupprice = groupprice;
    }
}

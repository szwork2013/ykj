package com.gnet.app.indents;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gnet.mybatis.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by yaoping on 16/11/3.
 */
@Getter
@Setter
@ToString
@Entity
@Table(name = "ykj_storage_indent")
public class Indents extends BaseEntity {

    /** 录入时间  **/
    private @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    Date createDate;

    /** 更新时间 **/
    private @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date modifyDate;

    private String supplierId;

    private int status;

    private @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date aduitDate;

    private String aduitId;

    private String clerkId;

    private String indentNo;

    private @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date indentDate;

    private BigDecimal totalPrice;

    private BigDecimal paid;

    private BigDecimal residualPayment;

    private String businessId;

    private BigDecimal payable;

    private String remark;

    private String isDel;

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

    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Date getAduitDate() {
        return aduitDate;
    }

    public void setAduitDate(Date aduitDate) {
        this.aduitDate = aduitDate;
    }

    public String getAduitId() {
        return aduitId;
    }

    public void setAduitId(String aduitId) {
        this.aduitId = aduitId;
    }

    public String getClerkId() {
        return clerkId;
    }

    public void setClerkId(String clerkId) {
        this.clerkId = clerkId;
    }

    public String getIndentNo() {
        return indentNo;
    }

    public void setIndentNo(String indentNo) {
        this.indentNo = indentNo;
    }

    public Date getIndentDate() {
        return indentDate;
    }

    public void setIndentDate(Date indentDate) {
        this.indentDate = indentDate;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public BigDecimal getPaid() {
        return paid;
    }

    public void setPaid(BigDecimal paid) {
        this.paid = paid;
    }

    public BigDecimal getResidualPayment() {
        return residualPayment;
    }

    public void setResidualPayment(BigDecimal residualPayment) {
        this.residualPayment = residualPayment;
    }

    public String getBusinessId() {
        return businessId;
    }

    public void setBusinessId(String businessId) {
        this.businessId = businessId;
    }

    public BigDecimal getPayable() {
        return payable;
    }

    public void setPayable(BigDecimal payable) {
        this.payable = payable;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getIsDel() {
        return isDel;
    }

    public void setIsDel(String isDel) {
        this.isDel = isDel;
    }
}

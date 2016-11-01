package com.gnet.app.clerk;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gnet.mybatis.BaseEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "ykj_clerk")
public class Clerk extends BaseEntity {

	private static final long serialVersionUID = -7571775426468402034L;
	
	/** 管理员 **/
	public static final Integer ROLE_TYPE_ADMIN = 0;
	
	/** 总经理 **/
	public static final Integer ROLE_TYPE_MANAGER = 1;
	
	/** 店长 **/
	public static final Integer ROLE_TYPE_STORE_MANAGER = 2;
	
	/** 店员 **/
	public static final Integer ROLE_TYPE_CLERK = 3;
	
	/** 后勤 **/
    public static final Integer ROLE_TYPE_LOGISTIC = 4;
    
    /** 仓库管理员 **/
    public static final Integer ROLE_TYPE_WAREHOUSE = 5;
    
    /** 售后  **/
    public static final Integer ROLE_TYPE_AFTER_SALES = 6;
	

	/** 创建日期 **/
	private @JsonFormat(pattern="yyyy-MM-dd hh:mm:ss") Date createDate;
	
	/** 修改日期 **/
	private @JsonFormat(pattern="yyyy-MM-dd hh:mm:ss") Date modifyDate;
	
	/** 直属部门编号 **/
	private String officeId;
	
	/** 角色身份,0:管理员,1:总经理,2:店长,3:店员,4:售后,5:仓库管理人,6:采购员 **/
	private Integer roleType;
	
	/** 姓名 **/
	private String name;
	
	/** 性别 **/
	private Integer sex;
	
	/** 出生日期 **/
	private @JsonFormat(pattern = "yyyy-MM-dd") Date birthday;
	
	/** 手机号码 **/
	private String phone;
	
	/** 备用手机号码 **/
	private String phoneSec;
	
	/** QQ **/
	private @Column(name = "QQ") String QQ;
	
	/** 微信号 **/
	private String wechat;
	
	/** 邮箱 **/
	private String email;
	
	/** 头像路径 **/
	private String photo;
	
	/** 是否已经删除 **/
	private @JsonIgnore Boolean isDel;
	
	/** 商家编号 **/
	private String businessId;
	
	/** 门店编号 **/
	private String storeId;

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

	public String getOfficeId() {
		return officeId;
	}

	public void setOfficeId(String officeId) {
		this.officeId = officeId;
	}

	public Integer getRoleType() {
		return roleType;
	}

	public void setRoleType(Integer roleType) {
		this.roleType = roleType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSex() {
		return sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPhoneSec() {
		return phoneSec;
	}

	public void setPhoneSec(String phoneSec) {
		this.phoneSec = phoneSec;
	}

	public String getQQ() {
		return QQ;
	}

	public void setQQ(String QQ) {
		this.QQ = QQ;
	}

	public String getWechat() {
		return wechat;
	}

	public void setWechat(String wechat) {
		this.wechat = wechat;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public Boolean getDel() {
		return isDel;
	}

	public void setDel(Boolean del) {
		isDel = del;
	}

	public String getBusinessId() {
		return businessId;
	}

	public void setBusinessId(String businessId) {
		this.businessId = businessId;
	}

	public String getStoreId() {
		return storeId;
	}

	public void setStoreId(String storeId) {
		this.storeId = storeId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	/** SysUser表外置参数 用户名 **/
	private @Transient String username;


	
}
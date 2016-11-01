package com.gnet.app.good;

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
@Table(name = "ykj_storage_goods")
public class Good extends BaseEntity {
	
	/**
	 * 0: 在售
	 */
	public static final Integer ONSALE_STATUS = 0;
	
	/**
	 * 1: 下架
	 */
	public static final Integer SOLD_OUT = 1;
	
	/**
	 * 2: 停产
	 */
	public static final Integer STOP_PRODUCT = 2;

	private static final long serialVersionUID = 562481088438233614L;

	/** 创建日期 **/
	private Date createDate;
	
	/** 修改日期 **/
	private Date modifyDate;
	
	/** 商品供货商编号 **/
	private String supplierId;
	
	/** 商品名称 **/
	private String name;
	
	/** 商品型号 **/
	private String model;
	
	/** 商品类别（行业） **/
	private String type;
	
	/** 商品颜色 **/
	private String color;
	
	/** 商品规格 **/
	private String specification;
	
	/** 状态类型 **/
	private Integer statusType;
	
	/** 单位 **/
	private Integer unit;
	
	/** 最小单位 **/
	private Integer atomUnit;
	
	/** 售价 **/
	private BigDecimal price;
	
	/** 长 **/
	private BigDecimal length;
	
	/** 宽 **/
	private BigDecimal width;
	
	/** 高/厚 **/
	private BigDecimal height;
	
	/** 重 **/
	private BigDecimal weight;
	
	/** 当前库存 */
	private BigDecimal storeNow;
	
	/** 在售状态,0:在售,1:下架,2:停产 **/
	private Integer onsaleStatus;
	
	/** 商家编号 **/
	private String businessId;
	
	/** 外置参数：原值 **/
	private @Transient String originValue;
	
	/** 销售状态文本*/
	private @Transient String onsaleStatusText;

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getSpecification() {
		return specification;
	}

	public void setSpecification(String specification) {
		this.specification = specification;
	}

	public Integer getStatusType() {
		return statusType;
	}

	public void setStatusType(Integer statusType) {
		this.statusType = statusType;
	}

	public Integer getUnit() {
		return unit;
	}

	public void setUnit(Integer unit) {
		this.unit = unit;
	}

	public Integer getAtomUnit() {
		return atomUnit;
	}

	public void setAtomUnit(Integer atomUnit) {
		this.atomUnit = atomUnit;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public BigDecimal getLength() {
		return length;
	}

	public void setLength(BigDecimal length) {
		this.length = length;
	}

	public BigDecimal getWidth() {
		return width;
	}

	public void setWidth(BigDecimal width) {
		this.width = width;
	}

	public BigDecimal getHeight() {
		return height;
	}

	public void setHeight(BigDecimal height) {
		this.height = height;
	}

	public BigDecimal getWeight() {
		return weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}

	public BigDecimal getStoreNow() {
		return storeNow;
	}

	public void setStoreNow(BigDecimal storeNow) {
		this.storeNow = storeNow;
	}

	public Integer getOnsaleStatus() {
		return onsaleStatus;
	}

	public void setOnsaleStatus(Integer onsaleStatus) {
		this.onsaleStatus = onsaleStatus;
	}

	public String getBusinessId() {
		return businessId;
	}

	public void setBusinessId(String businessId) {
		this.businessId = businessId;
	}

	public String getOriginValue() {
		return originValue;
	}

	public void setOriginValue(String originValue) {
		this.originValue = originValue;
	}

	public String getOnsaleStatusText() {
		return onsaleStatusText;
	}

	public void setOnsaleStatusText(String onsaleStatusText) {
		this.onsaleStatusText = onsaleStatusText;
	}
}

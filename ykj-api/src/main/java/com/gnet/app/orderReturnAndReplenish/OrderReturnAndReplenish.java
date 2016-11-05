package com.gnet.app.orderReturnAndReplenish;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gnet.app.good.Good;
import com.gnet.mybatis.BaseEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 退补货信息
 *
 */
@Setter
@Getter
@ToString
public class OrderReturnAndReplenish extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8791849849147737826L;
	
	/** 退货**/
	public final static Integer TYPE_RETURN = 0;
	
	/** 补货**/
	public final static Integer TYPE_REPLENISH = 1;

	/** 创建日期 **/
	private @JsonFormat(pattern = "yyyy-MM-dd") Date createDate;

	/** 修改日期 **/
	private @JsonFormat(pattern = "yyyy-MM-dd") Date modifyDate;
	
	/** 退补活类型 **/
	private Integer type;
	
	/** 退补活类型文本**/
	private String typeText;
	
	/** 订单编号**/
	private String orderId;
	
	/** 订单商品编号**/
	private String orderGoodsId;
	
	/** 数量**/
	private Integer rarNums;
	
	/** 成交单价**/
	private BigDecimal strikeUnitPrice;
	
	/** 位置**/
	private String initPosition;
	
	/** 备注**/
	private String remark;
	
	/** 商品信息**/
	private @Transient Good good;

}

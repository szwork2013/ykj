package com.gnet.app.financeExpense;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gnet.app.clerk.Clerk;
import com.gnet.mybatis.BaseEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 财务支出记录信息
 *
 */
@Setter
@Getter
@ToString
@Entity
@Table(name = "ykj_finance_expense")
public class FinanceExpense extends BaseEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1024002516186816209L;
	
	/** 创建日期 **/
	private @JsonFormat(pattern = "yyyy-MM-dd") Date createDate;

	/** 修改日期 **/
	private @JsonFormat(pattern = "yyyy-MM-dd") Date modifyDate;
	
	/** 订单编号**/
	private String orderId;
	
	/** 类目**/
	private Integer type;
	
	/** 类目文本**/
	private @Transient String typeText;
	
	/** 付款方式**/
	private Integer way;
	
	/** 付款方式文本**/
	private @Transient String wayText;
	
	/** 金额**/
	private BigDecimal money;
	
	/** 记录日期**/
	private @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date recordDate;
	
	/** 记录人编号**/
	private String recordPersonId;
	
	/**  商家编码 **/
	private String businessId;
	
	/** 备注**/
	private String remark;
	
	/** 记录人信息 **/
	private @Transient Clerk recordPerson;
	
}

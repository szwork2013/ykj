package com.gnet.app.order;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gnet.app.business.Business;
import com.gnet.app.clerk.Clerk;
import com.gnet.app.customer.Customer;
import com.gnet.app.orderGood.OrderGood;
import com.gnet.app.orderProcess.OrderProcess;
import com.gnet.app.revenueandrefund.AmountStatistics;
import com.gnet.app.revenueandrefund.RevenueAndRefund;
import com.gnet.mybatis.BaseEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "ykj_order")
public class Order extends BaseEntity {

  public static final Integer TYPE_PRE_ORDER = 0;

  public static final Integer TYPE_UNDERWAY_ORDER = 1;

  public static final Integer TYPE_FINISH_ORDER = 2;

  public static final Integer TYPE_BACK_ORDER = 3;

  private static final long serialVersionUID = 840857321507175260L;

  /** 创建日期 **/
  private @JsonFormat(pattern = "yyyy-MM-dd") Date createDate;

  /** 修改日期 **/
  private @JsonFormat(pattern = "yyyy-MM-dd") Date modifyDate;

  /** 订单负责人(跟单人) **/
  private String orderResponsibleId;

  /** 下单人编号 **/
  private String orderCreatorId;

  /** 客户编号 **/
  private String customerId;

  /** 商家编号 **/
  private String businessId;

  /** 类型,0:预订单,1:进行中,2:已完成,3:退单 **/
  private Integer type;
  
  /** 外置参数 : 状态名称  **/
  private @Transient String typeText;

  /** 订单号 **/
  private String orderNo;

  /** 订单日期 **/
  private @JsonFormat(pattern = "yyyy-MM-dd") Date orderDate;

  /** 备用联系电话 **/
  private String phoneSec;

  /** 订单来源 **/
  private Integer orderSource;
  
  /** 外置参数 : 订单来源名称  **/
  private @Transient String orderSourceText;

  /** 送货地址 **/
  private String address;

  /** 客户备注 **/
  private String customerRemark;

  /** 内部备注 **/
  private String privateRemark;

  /** 折前总价 **/
  private BigDecimal priceBeforeDiscount;

  /** 折后总价 **/
  private BigDecimal priceAfterDiscount;

  /** 成交价 **/
  private BigDecimal strikePrice;

  /** 已收款 **/
  private BigDecimal receiptPrice;

  /** 是否需要报价审核 **/
  private Boolean isNeedCostAduit;

  /** 是否需要送货 **/
  private Boolean isNeedDelivery;

  /** 是否需要安装 **/
  private Boolean isNeedInstall;

  /** 是否需要测量 **/
  private Boolean isNeedMeasure;

  /** 是否需要设计 **/
  private Boolean isNeedDesign;

  /** 是否已经删除 **/
  private @JsonIgnore Boolean isDel;
  
  /** 完成时间 **/
  private @JsonFormat(pattern = "yyyy-MM-dd") Date finishDate ;
  
  /** 备注 **/
  private String remark;

  /** 附件 **/
  private String attachment;

  /** 附件名称 **/
  private String attachmentName;

  
  //----------关联信息部分------------------------------------
  /** 外置参数 : 订单负责人信息 **/
  private @Transient Clerk orderResponsibleClerk;

  /** 外置参数 : 订单创建人信息 **/
  private @Transient Clerk orderCreateClerk;

  /** 外置参数 : 客户信息 **/
  private @Transient Customer customer;

  /** 外置参数 : 商家信息 **/
  private @Transient Business business;

  /** 外置参数：订单流程信息 **/
  private @Transient List<OrderProcess> orderProcessList;

  /**
   * 外置参数 : 订单服务记录
   */
  private @Transient List<OrderService> orderServices;

  /** 外置参数: 订单商品 **/
  private @Transient List<OrderGood> orderGoods;

  /**
   * 外置参数 : 订单收付款记录
   */
  private @Transient List<RevenueAndRefund> orderRevenueAndRefunds;
  
  //-----------非关联信息部分------------------------
  /** 外置参数: 付款状态  **/
  private @Transient String payStatus;

  /** 外置参数: 订单是否支付 **/
  private @Transient Boolean subscriptionIsFinish;

  /**
   * 外置参数 已付总额
   */
  private @Transient BigDecimal payedAmount;

  /**
   * 外置参数 金额统计
   */
  private @Transient AmountStatistics amountStatistics;

}

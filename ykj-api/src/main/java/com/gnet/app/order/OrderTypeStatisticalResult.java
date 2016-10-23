package com.gnet.app.order;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.gnet.app.orderGood.OrderGood;
import com.gnet.app.revenueandrefund.AmountStatistics;
import com.gnet.app.revenueandrefund.RevenueAndRefund;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderTypeStatisticalResult implements Serializable {

	private Integer type;
	
	private String typeName;
	
	private Integer result;
	
	
	
}

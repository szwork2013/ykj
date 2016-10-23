package com.gnet.app.orderGood;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Transient;

import com.gnet.app.CommonCondition;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderGoodCondition extends CommonCondition {

	private static final long serialVersionUID = 3336388410512652207L;
	
	private String orderId;
	
	private String businessId;
	
	private String storageGoodsId;
	
	
}

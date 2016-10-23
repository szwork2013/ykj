package com.gnet.app.orderProcess;

import com.gnet.app.CommonCondition;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderProcessCondition extends CommonCondition {
	
	private Integer type;
	
	private String orderId;
	
	private Integer isFinish;
	
	
	
}
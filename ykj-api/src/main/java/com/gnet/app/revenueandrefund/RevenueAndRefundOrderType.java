package com.gnet.app.revenueandrefund;

import com.gnet.utils.sort.OrderType;

public enum RevenueAndRefundOrderType implements OrderType{

	NAME("name", "name");
	
	private String key;
	private String value;

	private RevenueAndRefundOrderType(String key, String value) {
		this.key = key;
		this.value = value;
	}
	
	public String getKey() {
		return key;
	}
	
	public String getValue() {
		return value;
	}
}
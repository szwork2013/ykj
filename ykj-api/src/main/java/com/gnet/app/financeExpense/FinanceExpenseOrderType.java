package com.gnet.app.financeExpense;

import com.gnet.utils.sort.OrderType;

public enum FinanceExpenseOrderType implements OrderType{

	CREATEDATE("createDate", "create_date"),
	TYPE("type", "type"),
	MONEY("money", "money"),
	RECORDDATE("recordDate", "record_date");
	
	private String key;
	private String value;

	private FinanceExpenseOrderType(String key, String value) {
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
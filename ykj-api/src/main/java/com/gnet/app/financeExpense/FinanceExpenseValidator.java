package com.gnet.app.financeExpense;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;

import com.gnet.app.orderGood.OrderGood;
import com.gnet.app.orderGood.OrderGoodErrorBuilder;
import com.google.common.collect.Sets;

public class FinanceExpenseValidator {

	private FinanceExpenseValidator() {
	}

	static Map<String, Object> validateBeforeCreateFinanceExpense(FinanceExpense financeExpense) {
		Map<String, Object> map = new HashMap<>();

		if (null == financeExpense.getType()) {
			map.put("code", FinanceExpenseErrorBuilder.ERROR_TYPE_NULL);
			map.put("msg", "支出类目不能为空");
			return map;
		}

		if (null == financeExpense.getWay()) {
			map.put("code", FinanceExpenseErrorBuilder.ERROR_WAY_NULL);
			map.put("msg", "付款方式不能为空");
			return map;
		}

		if (null == financeExpense.getMoney()) {
			map.put("code", FinanceExpenseErrorBuilder.ERROR_MONEY_NULL);
			map.put("msg", "金额不能为空");
			return map;
		}

		return null;
	}

	static Map<String, Object> validateBeforeUpdateFinanceExpense(FinanceExpense financeExpense) {
		Map<String, Object> map = new HashMap<>();

		if (null == financeExpense.getType()) {
			map.put("code", FinanceExpenseErrorBuilder.ERROR_TYPE_NULL);
			map.put("msg", "支出类目不能为空");
			return map;
		}

		if (null == financeExpense.getWay()) {
			map.put("code", FinanceExpenseErrorBuilder.ERROR_WAY_NULL);
			map.put("msg", "付款方式不能为空");
			return map;
		}

		if (null == financeExpense.getMoney()) {
			map.put("code", FinanceExpenseErrorBuilder.ERROR_MONEY_NULL);
			map.put("msg", "金额不能为空");
			return map;
		}

		return null;
	}

}
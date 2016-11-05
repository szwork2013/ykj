package com.gnet.app.financeExpense;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.util.CollectionUtils;

import com.gnet.app.Constant;
import com.gnet.app.codeword.Codeword;
import com.gnet.app.codeword.CodewordService;
import com.gnet.utils.spring.SpringContextHolder;

public class FinanceExpenseExtDataHandler {

	public static void resultExtDataHandle(String businessId, FinanceExpense financeExpense) {
		if (null != financeExpense) {
			List<FinanceExpense> list = new ArrayList<FinanceExpense>(1);
			list.add(financeExpense);
			resultExtDataHandle(businessId, list);
		}
	}

	public static void resultExtDataHandle(String businessId, List<FinanceExpense> financeExpenseList) {
		CodewordService codewordService = SpringContextHolder.getBean(CodewordService.class);

		if (!CollectionUtils.isEmpty(financeExpenseList)) {
			Map<String, Codeword> payCategoryMap = codewordService.selectCodeword(businessId, Constant.PAY_CATEGORY);
			Map<String, Codeword> payWayMap = codewordService.selectCodeword(businessId, Constant.PAY_WAY);
			Codeword payCategory = null, payWay = null;
			for (FinanceExpense financeExpense : financeExpenseList) {
				payCategory = payCategoryMap.get(String.valueOf(financeExpense.getType()));
				if (null != payCategory) {
					financeExpense.setTypeText(payCategory.getValue());
				}

				payWay = payWayMap.get(String.valueOf(financeExpense.getWay()));
				if (null != payWay) {
					financeExpense.setWayText(payWay.getValue());
				}
			}
		}
	}

}

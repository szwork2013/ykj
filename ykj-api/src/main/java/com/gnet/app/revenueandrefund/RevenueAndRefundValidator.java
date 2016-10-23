package com.gnet.app.revenueandrefund;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;

import com.gnet.app.orderGood.OrderGood;
import com.gnet.app.orderGood.OrderGoodErrorBuilder;
import com.gnet.app.orderService.OrderServiceErrorBuilder;
import com.gnet.utils.math.PriceUtils;
import com.gnet.utils.spring.SpringContextHolder;
import com.google.common.collect.Sets;
import com.google.common.collect.Maps;

public class RevenueAndRefundValidator {
	
	private RevenueAndRefundValidator(){}
	
	static Map<String, Object> validateBeforeRevenue(RevenueAndRefund revenueAndRefund) {
		Map<String, Object> map = new HashMap<>();
		
		if (revenueAndRefund.getCategory() == null) {
			map.put("code", RevenueAndRefundErrorBuilder.ERROR_CATEGORY_NULL);
			map.put("msg", "付款类目不能为空");
			return map;
		}

		if (revenueAndRefund.getPayWay() == null) {
			map.put("code", RevenueAndRefundErrorBuilder.ERROR_PAYWAY_NULL);
			map.put("msg", "付款方式不能为空");
			return map;
		}

		if (revenueAndRefund.getPayment() == null) {
			map.put("code", RevenueAndRefundErrorBuilder.ERROR_PAYMENT_NULL);
			map.put("msg", "付款金额不能为空");
			return map;
		}

		if (StringUtils.isBlank(revenueAndRefund.getOrderId())) {
			map.put("code", RevenueAndRefundErrorBuilder.ERROR_ORDER_ID_NULL);
			map.put("msg", "订单编号不能为空");
			return map;
		}

		return null;
	}
	
	static Map<String, Object> validateBeforeRefund(RevenueAndRefund revenueAndRefund) {
		Map<String, Object> map = new HashMap<>();
		
		if (revenueAndRefund.getCategory() == null) {
			map.put("code", RevenueAndRefundErrorBuilder.ERROR_CATEGORY_NULL);
			map.put("msg", "付款类目不能为空");
			return map;
		}

		if (revenueAndRefund.getPayWay() == null) {
			map.put("code", RevenueAndRefundErrorBuilder.ERROR_PAYWAY_NULL);
			map.put("msg", "付款方式不能为空");
			return map;
		}

		if (revenueAndRefund.getPayment() == null) {
			map.put("code", RevenueAndRefundErrorBuilder.ERROR_PAYMENT_NULL);
			map.put("msg", "付款金额不能为空");
			return map;
		}

		if (StringUtils.isBlank(revenueAndRefund.getOrderId())) {
			map.put("code", RevenueAndRefundErrorBuilder.ERROR_ORDER_ID_NULL);
			map.put("msg", "订单编号不能为空");
			return map;
		}

		return null;
	}
	
	
}
package com.gnet.app.orderReturnAndReplenish;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;

import com.gnet.app.orderGood.OrderGood;
import com.gnet.app.orderGood.OrderGoodErrorBuilder;
import com.google.common.collect.Sets;

public class OrderReturnAndReplenishValidator {

	private OrderReturnAndReplenishValidator() {
	}

	static Map<String, Object> validateBeforeCreateOrderReturnAndReplenish(
			OrderReturnAndReplenish orderReturnAndReplenish) {
		Map<String, Object> map = new HashMap<>();

		if (StringUtils.isBlank(orderReturnAndReplenish.getOrderId())) {
			map.put("code", OrderReturnAndReplenishErrorBuilder.ERROR_ORDER_ID_NULL);
			map.put("msg", "订单编码不能为空");
			return map;
		}

		if (StringUtils.isBlank(orderReturnAndReplenish.getOrderGoodsId())) {
			map.put("code", OrderReturnAndReplenishErrorBuilder.ERROR_ORDER_GOODS_ID_NULL);
			map.put("msg", "订单商品编码不能为空");
			return map;
		}

		if (orderReturnAndReplenish.getType() == null) {
			map.put("code", OrderReturnAndReplenishErrorBuilder.ERROR_TYPE_NULL);
			map.put("msg", "退补货类型不能为空");
			return map;
		}

		if (orderReturnAndReplenish.getRarNums() == null) {
			map.put("code", OrderReturnAndReplenishErrorBuilder.ERROR_RAR_NUMS_NULL);
			map.put("msg", "数量不能为空");
			return map;
		}
		
		if (orderReturnAndReplenish.getStrikeUnitPrice() == null) {
			map.put("code", OrderReturnAndReplenishErrorBuilder.ERROR_STRIKE_UNIT_PRICE_NULL);
			map.put("msg", "金额不能为空");
			return map;
		}

		return null;
	}

}
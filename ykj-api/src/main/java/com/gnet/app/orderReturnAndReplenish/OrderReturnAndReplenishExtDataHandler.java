package com.gnet.app.orderReturnAndReplenish;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.util.CollectionUtils;

import com.gnet.app.good.Good;
import com.gnet.app.good.GoodExtDataHandler;

public class OrderReturnAndReplenishExtDataHandler {

	private static Map<Integer, String> typeMap = new HashMap<Integer, String>();

	static {
		typeMap.put(OrderReturnAndReplenish.TYPE_RETURN, "退货");
		typeMap.put(OrderReturnAndReplenish.TYPE_REPLENISH, "补货");
	}

	public static void resultExtDataHandle(String businessId, OrderReturnAndReplenish orderReturnAndReplenish) {
		if (null != orderReturnAndReplenish) {
			List<OrderReturnAndReplenish> list = new ArrayList<OrderReturnAndReplenish>(1);
			list.add(orderReturnAndReplenish);
			resultExtDataHandle(businessId, list);
		}
	}

	public static void resultExtDataHandle(String businessId,
			List<OrderReturnAndReplenish> orderReturnAndReplenishList) {
		if (!CollectionUtils.isEmpty(orderReturnAndReplenishList)) {
			List<Good> goodList = new ArrayList<Good>(orderReturnAndReplenishList.size());
			for (OrderReturnAndReplenish orderReturnAndReplenish : orderReturnAndReplenishList) {
				orderReturnAndReplenish.setTypeText(typeMap.get(orderReturnAndReplenish.getType()));
				if (null != orderReturnAndReplenish.getGood()) {
					goodList.add(orderReturnAndReplenish.getGood());
				}
			}

			GoodExtDataHandler.resultExtDataHandle(businessId, goodList);
		}
	}

}

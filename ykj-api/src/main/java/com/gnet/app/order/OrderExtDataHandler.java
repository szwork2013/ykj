package com.gnet.app.order;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.util.CollectionUtils;

import com.gnet.app.Constant;
import com.gnet.app.codeword.Codeword;
import com.gnet.app.codeword.CodewordService;
import com.gnet.utils.spring.SpringContextHolder;

public class OrderExtDataHandler {

	/**
	 * 查询结果处理
	 * @param businessId
	 * @param order
	 */
	public static  void resultExtDataHandle(String businessId, Order order) {
		if (null != order) {
			List<Order> list = new ArrayList<Order>(1);
			list.add(order);
			resultExtDataHandle(businessId, list);
		}
	}

	/**
	 * 查询结果处理
	 * @param businessId
	 * @param orderList
	 */
	public static void resultExtDataHandle(String businessId, List<Order> orderList) {
		CodewordService codewordService = SpringContextHolder.getBean(CodewordService.class);

		if (!CollectionUtils.isEmpty(orderList)) {
			Map<String, Codeword> orderTypeMap = codewordService.selectCodeword(businessId, Constant.ORDER_TYPE);
			Map<String, Codeword> orderSourceMap = codewordService.selectCodeword(businessId, Constant.ORDER_SOURCE);
			Codeword orderType = null, orderSource = null;
			for (Order order : orderList) {
				orderType = orderTypeMap.get(String.valueOf(order.getType()));
				if (null != orderType) {
					order.setTypeText(orderType.getValue());
				}

				orderSource = orderSourceMap.get(String.valueOf(order.getOrderSource()));
				if (null != orderSource) {
					order.setOrderSourceText(orderSource.getValue());
				}
			}
		}
	}

}

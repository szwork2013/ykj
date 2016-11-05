package com.gnet.app.orderGood;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.util.CollectionUtils;

import com.gnet.app.Constant;
import com.gnet.app.codeword.Codeword;
import com.gnet.app.codeword.CodewordService;
import com.gnet.app.good.Good;
import com.gnet.app.good.GoodExtDataHandler;
import com.gnet.app.order.Order;
import com.gnet.app.order.OrderExtDataHandler;
import com.gnet.utils.spring.SpringContextHolder;

public class OrderGoodExtDataHandler {

	/**
	 * 
	 * @param businessId
	 * @param orderGoodList
	 */
	public static void resultExtDataHandle(String businessId, List<OrderGood> orderGoodList) {
		if (!CollectionUtils.isEmpty(orderGoodList)) {
			List<Good> goodList = new ArrayList<Good>(orderGoodList.size());
			List<Order> orderList = new ArrayList<Order>(orderGoodList.size());
			for(OrderGood orderGood : orderGoodList){
				if(null != orderGood.getGood()){
					goodList.add(orderGood.getGood());
				}
				
				if(null != orderGood.getOrder()){
					orderList.add(orderGood.getOrder());
				}
			}
			
			OrderExtDataHandler.resultExtDataHandle(businessId, orderList);
			GoodExtDataHandler.resultExtDataHandle(businessId, goodList);
		}
	}
	
	
	public static void resultExtDataHandle(String businessId, OrderGood orderGood) {
		List<OrderGood> orderGoodList = new ArrayList<OrderGood>(1);
		orderGoodList.add(orderGood);
		resultExtDataHandle(businessId,orderGoodList);
	}

}

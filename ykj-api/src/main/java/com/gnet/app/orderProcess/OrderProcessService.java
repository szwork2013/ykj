package com.gnet.app.orderProcess;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gnet.app.order.Order;
import com.gnet.app.order.OrderMapper;


@Service
@Transactional(readOnly = true)
public class OrderProcessService {
	
	@Autowired
	private OrderProcessMapper orderProcessMapper;
	@Autowired
	private OrderMapper orderMapper;
	
	public OrderProcess findById(String id) {
		return orderProcessMapper.selectByPrimaryKey(id);
	}
	
	@Transactional(readOnly=false)
	public Boolean auditSuccess(String orderId){
		boolean result = this.orderProcessMapper.updateProcessFinishStatus(orderId, OrderProcess.STATUS_ADUIT, 1) == 1;
		if(result){
			Order order = new Order();
			order.setId(orderId);
			order.setType(Order.TYPE_UNDERWAY_ORDER);
			result = result && (this.orderMapper.updateByPrimaryKeySelective(order)==1);
		};
		
		return result;
	}
	
	
}
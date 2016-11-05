package com.gnet.app.orderReturnAndReplenish;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

public class OrderReturnAndReplenishResource extends Resource<OrderReturnAndReplenish> {

	public OrderReturnAndReplenishResource(OrderReturnAndReplenish content, Iterable<Link> links) {
		super(content, links);
	}

	public OrderReturnAndReplenishResource(OrderReturnAndReplenish content, Link... links) {
		super(content, links);
	}
	
}
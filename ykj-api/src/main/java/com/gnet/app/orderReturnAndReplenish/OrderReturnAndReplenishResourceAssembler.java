package com.gnet.app.orderReturnAndReplenish;

import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;

public class OrderReturnAndReplenishResourceAssembler implements ResourceAssembler<OrderReturnAndReplenish, OrderReturnAndReplenishResource> {

	@Override
	public OrderReturnAndReplenishResource toResource(OrderReturnAndReplenish entity) {
		OrderReturnAndReplenishResource resource = new OrderReturnAndReplenishResource(entity);
		resource.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(OrderReturnAndReplenishController.class).getOrderReturnAndReplenish(entity.getId())).withSelfRel());
		return resource;
	}
	
}
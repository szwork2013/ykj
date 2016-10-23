package com.gnet.app.revenueandrefund;

import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;

public class RevenueAndRefundResourceAssembler implements ResourceAssembler<RevenueAndRefund, RevenueAndRefundResource> {

	@Override
	public RevenueAndRefundResource toResource(RevenueAndRefund entity) {
		RevenueAndRefundResource resource = new RevenueAndRefundResource(entity);
		resource.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(RevenueAndRefundController.class).getRevenueAndRefund(entity.getId())).withSelfRel());
		return resource;
	}
	
}
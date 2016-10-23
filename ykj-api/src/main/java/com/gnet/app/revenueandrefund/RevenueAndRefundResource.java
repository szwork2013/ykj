package com.gnet.app.revenueandrefund;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

public class RevenueAndRefundResource extends Resource<RevenueAndRefund> {

	public RevenueAndRefundResource(RevenueAndRefund content, Iterable<Link> links) {
		super(content, links);
	}

	public RevenueAndRefundResource(RevenueAndRefund content, Link... links) {
		super(content, links);
	}
	
}
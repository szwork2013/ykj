package com.gnet.app.orderProcess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryLinksResource;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gnet.app.revenueandrefund.RevenueAndRefundErrorBuilder;
import com.gnet.resource.boolResource.BooleanResourceAssembler;

@RepositoryRestController
@ExposesResourceFor(OrderProcess.class)
@RequestMapping("/api/orderProcesses")
public class OrderProcessController implements ResourceProcessor<RepositoryLinksResource> {

	@Autowired
	private OrderProcessService orderProcessService;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getOrderProcess(@PathVariable("id") String id) {
		OrderProcess orderProcess = orderProcessService.findById(id);
		if (orderProcess == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new OrderProcessErrorBuilder(OrderProcessErrorBuilder.ERROR_ORDERPROCESS_NULL, "找不到该订单进度状态")
							.build());
		}

		OrderProcessResourceAssembler orderProcessResourceAssembler = new OrderProcessResourceAssembler();
		OrderProcessResource orderProcessResource = orderProcessResourceAssembler.toResource(orderProcess);

		return ResponseEntity.ok(orderProcessResource);
	}

	@RequestMapping(value = "/{id}/auditSuccess")
	public ResponseEntity<?> auditSuccess(@PathVariable("id") String id) {
		Boolean result = orderProcessService.auditSuccess(id);

		if (result) {
			BooleanResourceAssembler booleanResourceAssembler = new BooleanResourceAssembler();
			return ResponseEntity.ok(booleanResourceAssembler.toResource(Boolean.TRUE));
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new RevenueAndRefundErrorBuilder(RevenueAndRefundErrorBuilder.ERROR_CREATED, "创建错误").build());
	}

	@Override
	public RepositoryLinksResource process(RepositoryLinksResource resource) {
		resource.add(ControllerLinkBuilder.linkTo(OrderProcessController.class).withRel("orderProcesses"));
		return resource;
	}

}
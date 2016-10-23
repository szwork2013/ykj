package com.gnet.app.revenueandrefund;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryLinksResource;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.hateoas.Resources;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.gnet.app.clerk.Clerk;
import com.gnet.resource.boolResource.BooleanResourceAssembler;
import com.gnet.resource.listResource.ListResourcesAssembler;
import com.gnet.security.user.CustomUser;


@RepositoryRestController
@ExposesResourceFor(RevenueAndRefund.class)
@RequestMapping("/api/revenueAndRefunds")
public class RevenueAndRefundController implements ResourceProcessor<RepositoryLinksResource> {

	@Autowired
	private RevenueAndRefundService revenueAndRefundService;
	@Autowired
	private PagedResourcesAssembler<RevenueAndRefund> pagedResourcesAssembler;
	@Autowired
	private ListResourcesAssembler<RevenueAndRefund> listResourcesAssembler;
	

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> getOrders(
			@PageableDefault Pageable pageable,
			@RequestParam(name = "isall", required = false) Boolean isAll,
			RevenueAndRefundCondition orderCondition,
			Authentication authentication
	) {
		return searchRevenueAndRefunds(pageable,isAll,orderCondition,authentication);
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public ResponseEntity<?> searchRevenueAndRefunds(
		@PageableDefault Pageable pageable,
		@RequestParam(name = "isall", required = false) Boolean isAll,
		RevenueAndRefundCondition revenueAndRefundCondition,
		Authentication authentication
	){
		// 判断是否分页
		Resources<RevenueAndRefundResource> resources = null;
		if (isAll != null && isAll) {
			List<RevenueAndRefund> revenueAndRefundList = revenueAndRefundService.selectRevenueAndRefundsAllWithDetailByCondition(revenueAndRefundCondition);
			resources = listResourcesAssembler.toResource(revenueAndRefundList, new RevenueAndRefundResourceAssembler());
		} else {
			Page<RevenueAndRefund> revenueAndRefunds = revenueAndRefundService.paginationRevenueAndRefundsAllWithDetailByCondition(revenueAndRefundCondition, pageable);
			resources = pagedResourcesAssembler.toResource(revenueAndRefunds, new RevenueAndRefundResourceAssembler());
		}
		
		return ResponseEntity.ok(resources);
	}
	
	@RequestMapping(value = "/{id}/revenue", method = RequestMethod.POST)
	public ResponseEntity<?> revenue(
		@PathVariable("id") String orderId,
		@RequestBody RevenueAndRefund revenueAndRefund,
		Authentication authentication
	) {
		CustomUser customUser = (CustomUser) authentication.getPrincipal();
		Clerk clerk = customUser.getClerk();
		
		revenueAndRefund.setRecorder(clerk.getId());
		revenueAndRefund.setRecorderDate(new Date());
		revenueAndRefund.setOrderId(orderId);
		Map<String, Object> error = RevenueAndRefundValidator.validateBeforeRevenue(revenueAndRefund);
		if (error != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RevenueAndRefundErrorBuilder(Integer.valueOf(error.get("code").toString()), error.get("msg").toString()).build());
		}
		Boolean result = this.revenueAndRefundService.revenue(revenueAndRefund);
		if (result) {
			BooleanResourceAssembler booleanResourceAssembler = new BooleanResourceAssembler();
			return ResponseEntity.ok(booleanResourceAssembler.toResource(Boolean.TRUE));
		}
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RevenueAndRefundErrorBuilder(RevenueAndRefundErrorBuilder.ERROR_CREATED, "付款错误").build());
	}
	
	@RequestMapping(value = "/{id}/refund", method = RequestMethod.POST)
	public ResponseEntity<?> refund(
		@PathVariable("id") String orderId,
		@RequestBody RevenueAndRefund revenueAndRefund,
		Authentication authentication
	) {
		CustomUser customUser = (CustomUser) authentication.getPrincipal();
		Clerk clerk = customUser.getClerk();
		
		revenueAndRefund.setRecorder(clerk.getId());
		revenueAndRefund.setRecorderDate(new Date());
		revenueAndRefund.setOrderId(orderId);
		Map<String, Object> error = RevenueAndRefundValidator.validateBeforeRefund(revenueAndRefund);
		if (error != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RevenueAndRefundErrorBuilder(Integer.valueOf(error.get("code").toString()), error.get("msg").toString()).build());
		}
		Boolean result = this.revenueAndRefundService.revenue(revenueAndRefund);
		if (result) {
			BooleanResourceAssembler booleanResourceAssembler = new BooleanResourceAssembler();
			return ResponseEntity.ok(booleanResourceAssembler.toResource(Boolean.TRUE));
		}
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RevenueAndRefundErrorBuilder(RevenueAndRefundErrorBuilder.ERROR_CREATED, "退款错误").build());
	}
	

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getRevenueAndRefund(
		@PathVariable("id") String id
	){
		RevenueAndRefund revenueAndRefund = this.revenueAndRefundService.findById(id);
		if (revenueAndRefund == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RevenueAndRefundErrorBuilder(RevenueAndRefundErrorBuilder.ERROR_REVENUEANDREFUND_NULL, "找不到该收付款记录").build());
		}
		
		RevenueAndRefundResourceAssembler revenueAndRefundResourceAssembler = new RevenueAndRefundResourceAssembler();
		RevenueAndRefundResource revenueAndRefundResource = revenueAndRefundResourceAssembler.toResource(revenueAndRefund);
		
		return ResponseEntity.ok(revenueAndRefundResource);
	}
	
	@Override
	public RepositoryLinksResource process(RepositoryLinksResource resource) {
		resource.add(ControllerLinkBuilder.linkTo(RevenueAndRefundController.class).withRel("orders"));
		return resource;
	}
}
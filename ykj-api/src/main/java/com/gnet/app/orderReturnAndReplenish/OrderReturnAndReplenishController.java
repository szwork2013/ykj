package com.gnet.app.orderReturnAndReplenish;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gnet.app.order.Order;
import com.gnet.app.order.OrderErrorBuilder;
import com.gnet.security.user.CustomUser;

@RepositoryRestController
@ExposesResourceFor(OrderReturnAndReplenish.class)
@RequestMapping("/api/return_and_replenish")
public class OrderReturnAndReplenishController {

	@Autowired
	private OrderReturnAndReplenishService orderReturnAndReplenishService;

	/**
	 * 获取退补活原始信息
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getOrderReturnAndReplenish(@PathVariable("id") String id) {
		OrderReturnAndReplenish orderReturnAndReplenish = this.orderReturnAndReplenishService
				.getOrderReturnAndReplenish(id);
		if (orderReturnAndReplenish == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new OrderReturnAndReplenishErrorBuilder(
							OrderReturnAndReplenishErrorBuilder.ERROR_ORDERRETURNANDREPLENISH_NULL, "找不到该退补货记录")
									.build());
		}

		OrderReturnAndReplenishResourceAssembler orderReturnAndReplenishResourceAssembler = new OrderReturnAndReplenishResourceAssembler();
		OrderReturnAndReplenishResource orderReturnAndReplenishResource = orderReturnAndReplenishResourceAssembler
				.toResource(orderReturnAndReplenish);

		return ResponseEntity.ok(orderReturnAndReplenishResource);
	}

	/**
	 * 创建退补活信息记录
	 * 
	 * @param orderReturnAndReplenish
	 * @param authentication
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody OrderReturnAndReplenish orderReturnAndReplenish,
			Authentication authentication) {

		CustomUser customUser = (CustomUser) authentication.getPrincipal();

		Map<String, Object> error = OrderReturnAndReplenishValidator
				.validateBeforeCreateOrderReturnAndReplenish(orderReturnAndReplenish);
		if (error != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
					new OrderErrorBuilder(Integer.valueOf(error.get("code").toString()), error.get("msg").toString())
							.build());
		}
		Boolean result = this.orderReturnAndReplenishService.create(customUser.getClerk(), orderReturnAndReplenish);
		if (result) {
			return ResponseEntity.created(
					ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(OrderReturnAndReplenishController.class)
							.getOrderReturnAndReplenish(orderReturnAndReplenish.getId())).toUri())
					.build();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new OrderErrorBuilder(OrderErrorBuilder.ERROR_CREATED, "创建错误").build());
	}

}

package com.gnet.app.orderDeliverGoods;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryLinksResource;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.gnet.app.orderGood.OrderGood;

@RepositoryRestController
@ExposesResourceFor(OrderDeliverGoods.class)
@RequestMapping("/api/orderDeliverGoods")
public class OrderDeliverGoodsController implements ResourceProcessor<RepositoryLinksResource> {

	@Autowired
	private OrderDeliverGoodsService orderDeliverGoodsService;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getOrderDeliverGoods(@PathVariable("id") String id) {
		OrderDeliverGoods orderDeliverGoods = orderDeliverGoodsService.findById(id);
		if (orderDeliverGoods == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new OrderDeliverGoodsErrorBuilder(OrderDeliverGoodsErrorBuilder.ERROR_ORDERDELIVERGOODS_NULL,
							"找不到该订单商品送货").build());
		}

		OrderDeliverGoodsResourceAssembler orderDeliverGoodsResourceAssembler = new OrderDeliverGoodsResourceAssembler();
		OrderDeliverGoodsResource orderDeliverGoodsResource = orderDeliverGoodsResourceAssembler
				.toResource(orderDeliverGoods);

		return ResponseEntity.ok(orderDeliverGoodsResource);
	}

	/**
	 * 根据订单获取其下的订单商品明细数据
	 * 
	 * @param orderId
	 * @param authentication
	 * @return
	 */
	@RequestMapping(value = "/getOrderGoodsListWithDetailByOrderId", method = RequestMethod.GET)
	public ResponseEntity<?> getOrderGoodsListWithDetailByOrderId(@RequestParam("orderId") String orderId,
			@RequestParam("isNeedCalc") Boolean isNeedCalc, Authentication authentication) {
		List<OrderGood> list = this.orderDeliverGoodsService.selectOrderGoodsListWithDetailByOrderId(orderId,
				isNeedCalc);

		return ResponseEntity.status(HttpStatus.OK).body(list);
	}

	@Override
	public RepositoryLinksResource process(RepositoryLinksResource resource) {
		resource.add(ControllerLinkBuilder.linkTo(OrderDeliverGoodsController.class).withRel("orderDeliverGoods"));
		return resource;
	}

}
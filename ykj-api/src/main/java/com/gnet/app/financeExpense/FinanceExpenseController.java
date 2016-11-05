package com.gnet.app.financeExpense;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.ExposesResourceFor;
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

import com.gnet.app.order.Order;
import com.gnet.app.order.OrderErrorBuilder;
import com.gnet.app.order.OrderResource;
import com.gnet.app.order.OrderResourceAssembler;
import com.gnet.resource.boolResource.BooleanResourceAssembler;
import com.gnet.resource.listResource.ListResourcesAssembler;
import com.gnet.security.user.CustomUser;

@RepositoryRestController
@ExposesResourceFor(FinanceExpense.class)
@RequestMapping("/api/finance_expense")
public class FinanceExpenseController {

	@Autowired
	private FinanceExpenseService financeExpenseService;

	@Autowired
	private PagedResourcesAssembler<FinanceExpense> pagedResourcesAssembler;
	@Autowired
	private ListResourcesAssembler<FinanceExpense> listResourcesAssembler;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> getFinanceExpenses(@PageableDefault Pageable pageable,
			@RequestParam(name = "isall", required = false) Boolean isAll,
			FinanceExpenseCondition financeExpensesCondition, Authentication authentication) {
		return searchFinanceExpenses(pageable, isAll, financeExpensesCondition, authentication);
	}

	/**
	 * 财务支出信息查村
	 * 
	 * @param pageable
	 * @param isAll
	 * @param orderCondition
	 * @param authentication
	 * @return ResponseEntity<?>
	 */
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public ResponseEntity<?> searchFinanceExpenses(@PageableDefault Pageable pageable,
			@RequestParam(name = "isall", required = false) Boolean isAll,
			FinanceExpenseCondition financeExpenseCondition, Authentication authentication) {
		CustomUser customUser = (CustomUser) authentication.getPrincipal();

		// 判断是否分页
		Resources<FinanceExpenseResource> resources = null;
		if (isAll != null && isAll) {
			List<FinanceExpense> financeExpenses = financeExpenseService
					.selectFinanceExpenseDetailsByCondition(customUser.getClerk(), financeExpenseCondition);
			resources = listResourcesAssembler.toResource(financeExpenses, new FinanceExpenseResourceAssembler());
		} else {
			Page<FinanceExpense> orders = financeExpenseService.paginationFinanceExpenseDetailsByCondition(
					customUser.getClerk(), pageable, financeExpenseCondition);
			resources = pagedResourcesAssembler.toResource(orders, new FinanceExpenseResourceAssembler());
		}

		return ResponseEntity.ok(resources);
	}

	/**
	 * 获取支出记录原始信息
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getFinanceExpense(@PathVariable("id") String id) {
		FinanceExpense FinanceExpense = this.financeExpenseService.getFinanceExpense(id);
		if (FinanceExpense == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
					new FinanceExpenseErrorBuilder(FinanceExpenseErrorBuilder.ERROR_FINANCEEXPENSE_NULL, "找不到该支出记录")
							.build());
		}

		FinanceExpenseResourceAssembler FinanceExpenseResourceAssembler = new FinanceExpenseResourceAssembler();
		FinanceExpenseResource FinanceExpenseResource = FinanceExpenseResourceAssembler.toResource(FinanceExpense);

		return ResponseEntity.ok(FinanceExpenseResource);
	}

	/**
	 * 创建支出信息记录
	 * 
	 * @param FinanceIncome
	 * @param authentication
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> createOrUpdate(@RequestBody FinanceExpense financeExpense, Authentication authentication) {

		CustomUser customUser = (CustomUser) authentication.getPrincipal();

		Map<String, Object> error = FinanceExpenseValidator.validateBeforeCreateFinanceExpense(financeExpense);
		if (error != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new FinanceExpenseErrorBuilder(Integer.valueOf(error.get("code").toString()),
							error.get("msg").toString()).build());
		}
		Boolean result = false;
		if(StringUtils.isNotBlank(financeExpense.getId())){
			result = this.financeExpenseService.update(customUser.getClerk(), financeExpense);
		}else{
			result = this.financeExpenseService.create(customUser.getClerk(), financeExpense);
		}
		
		if (result) {
			return ResponseEntity.created(ControllerLinkBuilder.linkTo(ControllerLinkBuilder
					.methodOn(FinanceExpenseController.class).getFinanceExpense(financeExpense.getId())).toUri())
					.build();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new OrderErrorBuilder(OrderErrorBuilder.ERROR_CREATED, "创建错误").build());
	}

	/**
	 * 更改支出信息记录
	 * 
	 * @param FinanceIncome
	 * @param authentication
	 * @return
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody FinanceExpense financeExpense,
			Authentication authentication) {

		CustomUser customUser = (CustomUser) authentication.getPrincipal();
		financeExpense.setId(id);

		Map<String, Object> error = FinanceExpenseValidator.validateBeforeUpdateFinanceExpense(financeExpense);
		if (error != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new FinanceExpenseErrorBuilder(Integer.valueOf(error.get("code").toString()),
							error.get("msg").toString()).build());
		}
		Boolean result = this.financeExpenseService.update(customUser.getClerk(), financeExpense);
		if (result) {
			BooleanResourceAssembler booleanResourceAssembler = new BooleanResourceAssembler();
			return ResponseEntity.ok(booleanResourceAssembler.toResource(Boolean.TRUE));
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new OrderErrorBuilder(OrderErrorBuilder.ERROR_EDITED, "修改错误").build());
	}

	/**
	 * 删除支出信息记录
	 * 
	 * @param FinanceIncome
	 * @param authentication
	 * @return
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") String id, Authentication authentication) {

		CustomUser customUser = (CustomUser) authentication.getPrincipal();

		if (StringUtils.isBlank(id)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
					new FinanceExpenseErrorBuilder(FinanceExpenseErrorBuilder.ERROR_ID_NULL, "支出记录编码为空，无法进行删除操作 ！")
							.build());
		}
		Boolean result = this.financeExpenseService.deleteFinanceExpenseById(id);
		if (result) {
			BooleanResourceAssembler booleanResourceAssembler = new BooleanResourceAssembler();
			return ResponseEntity.ok(booleanResourceAssembler.toResource(Boolean.TRUE));
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new FinanceExpenseErrorBuilder(FinanceExpenseErrorBuilder.ERROR_DELETED, "删除错误").build());
	}

}

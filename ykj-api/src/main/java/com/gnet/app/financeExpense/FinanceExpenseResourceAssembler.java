package com.gnet.app.financeExpense;

import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;

public class FinanceExpenseResourceAssembler implements ResourceAssembler<FinanceExpense, FinanceExpenseResource> {

	@Override
	public FinanceExpenseResource toResource(FinanceExpense entity) {
		FinanceExpenseResource resource = new FinanceExpenseResource(entity);
		resource.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(FinanceExpenseController.class).getFinanceExpense(entity.getId())).withSelfRel());
		return resource;
	}
	
}
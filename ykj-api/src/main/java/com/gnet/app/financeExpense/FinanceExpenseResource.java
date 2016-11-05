package com.gnet.app.financeExpense;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

public class FinanceExpenseResource extends Resource<FinanceExpense> {

	public FinanceExpenseResource(FinanceExpense content, Iterable<Link> links) {
		super(content, links);
	}

	public FinanceExpenseResource(FinanceExpense content, Link... links) {
		super(content, links);
	}
	
}
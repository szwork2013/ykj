package com.gnet.app.financeExpense;

import java.util.List;

import tk.mybatis.mapper.common.Mapper;

/**
 * 财务支出信息Mapper
 *
 */
public interface FinanceExpenseMapper extends Mapper<FinanceExpense>{

	/**
	 * 根据查询条件查询相应的财务支出信息
	 * @param condition
	 * @return
	 */
	public List<FinanceExpense> selectFinanceExpenseDetailsByCondition(FinanceExpenseCondition condition);
	
}

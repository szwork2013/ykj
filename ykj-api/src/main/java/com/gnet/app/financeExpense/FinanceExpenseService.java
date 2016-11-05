package com.gnet.app.financeExpense;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.gnet.app.clerk.Clerk;
import com.gnet.app.good.Good;
import com.gnet.app.orderGood.OrderGoodMapper;
import com.gnet.utils.page.PageUtil;
import com.gnet.utils.sort.ParamSceneUtils;
import com.gnet.utils.sort.exception.NotFoundOrderDirectionException;
import com.gnet.utils.sort.exception.NotFoundOrderPropertyException;

/**
 * 财务支出相关操作业务类
 *
 */
@Service
@Transactional(readOnly = true)
public class FinanceExpenseService {

	@Autowired
	private FinanceExpenseMapper financeExpenseMapper;

	@Autowired
	private OrderGoodMapper orderGoodMapper;

	/**
	 * 根据查询条件查询财务支出相关信息集合
	 * 
	 * @param businessId
	 * @param orderId
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<FinanceExpense> selectFinanceExpenseDetailsByCondition(Clerk clerk, FinanceExpenseCondition condition) {
		condition.setBusinessId(clerk.getBusinessId());
		List<FinanceExpense> financeExpenseList = this.financeExpenseMapper
				.selectFinanceExpenseDetailsByCondition(condition);
		FinanceExpenseExtDataHandler.resultExtDataHandle(clerk.getBusinessId(), financeExpenseList);
		return financeExpenseList;
	}

	/**
	 * 根据查询条件查询财务支出相关分页信息集合
	 * @param clerk
	 * @param pageable
	 * @param condition
	 * @return
	 */
	@Transactional(readOnly = true)
	public Page<FinanceExpense> paginationFinanceExpenseDetailsByCondition(Clerk clerk, Pageable pageable,
			FinanceExpenseCondition condition) {
		List<String> orderList = null;

		condition.setBusinessId(clerk.getBusinessId());

		// 排序处理
		try {
			orderList = ParamSceneUtils.toOrder(pageable, FinanceExpenseOrderType.class);
		} catch (NotFoundOrderPropertyException e) {
			throw new RuntimeException("排序字段不符合规则");
		} catch (NotFoundOrderDirectionException e) {
			throw new RuntimeException("排序方向不符合要求");
		}

		Page<FinanceExpense> pageResult = PageUtil.pagination(pageable, orderList,
				new PageUtil.Callback<FinanceExpense>() {

					@Override
					public List<FinanceExpense> getPageContent() {
						return financeExpenseMapper.selectFinanceExpenseDetailsByCondition(condition);
					}

				});
		FinanceExpenseExtDataHandler.resultExtDataHandle(clerk.getBusinessId(), pageResult.getContent());

		return pageResult;
	}

	/**
	 * 根据主键获取财务支出信息
	 * 
	 * @param id
	 * @return
	 */
	@Transactional(readOnly = true)
	public FinanceExpense getFinanceExpense(String id) {
		return this.financeExpenseMapper.selectByPrimaryKey(id);
	}

	/**
	 * 根据主键删除财务支出信息
	 * 
	 * @param id
	 * @return
	 */
	@Transactional(readOnly = false)
	public boolean deleteFinanceExpenseById(String id) {
		return this.financeExpenseMapper.deleteByPrimaryKey(id) == 1;
	}

	/**
	 * 创建财务支出记录信息
	 * 
	 * @param clerk
	 * @param financeExpense
	 * @return
	 */
	@Transactional(readOnly = false)
	public boolean create(Clerk clerk, FinanceExpense financeExpense) {
		boolean result = false;
		Date date = new Date();
		financeExpense.setCreateDate(date);
		financeExpense.setModifyDate(date);
		financeExpense.setRecordDate(date);
		financeExpense.setRecordPersonId(clerk.getId());
		financeExpense.setBusinessId(clerk.getBusinessId());

		result = this.financeExpenseMapper.insertSelective(financeExpense) == 1;

		if (!result) {
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			return false;
		}

		return result;
	}

	/**
	 * 创建财务支出记录信息
	 * 
	 * @param clerk
	 * @param financeExpense
	 * @return
	 */
	@Transactional(readOnly = false)
	public boolean update(Clerk clerk, FinanceExpense financeExpense) {
		boolean result = false;
		Date date = new Date();
		financeExpense.setModifyDate(date);

		result = this.financeExpenseMapper.updateByPrimaryKeySelective(financeExpense) == 1;

		if (!result) {
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			return false;
		}

		return result;
	}

	/**
	 * 创建财务支出记录信息
	 * 
	 * @param clerk
	 * @param financeExpense
	 * @return
	 */
	@Transactional(readOnly = false)
	public boolean delete(Clerk clerk, FinanceExpense financeExpense) {
		boolean result = false;

		result = this.financeExpenseMapper.delete(financeExpense) == 1;

		if (!result) {
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			return false;
		}

		return result;
	}

}

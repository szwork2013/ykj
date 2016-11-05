package com.gnet.app.revenueandrefund;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gnet.utils.page.PageUtil;
import com.gnet.utils.sort.ParamSceneUtils;
import com.gnet.utils.sort.exception.NotFoundOrderDirectionException;
import com.gnet.utils.sort.exception.NotFoundOrderPropertyException;

@Service
@Transactional(readOnly = true)
public class RevenueAndRefundService {

	@Autowired
	private RevenueAndRefundMapper revenueAndRefundMapper;

	/**
	 * 根据查询条件查询订单收付款明细信息
	 * 
	 * @param condition
	 * @return
	 */
	public List<RevenueAndRefund> selectRevenueAndRefundDetailsByCondition(RevenueAndRefundCondition condition) {
		return this.revenueAndRefundMapper.selectRevenueAndRefundDetailsByCondition(condition);
	}

	public Page<RevenueAndRefund> paginationRevenueAndRefundDetailsByCondition(
			RevenueAndRefundCondition condition, Pageable pageable) {

		List<String> revenueAndRefundList = null;

		// 排序处理
		try {
			revenueAndRefundList = ParamSceneUtils.toOrder(pageable, RevenueAndRefundOrderType.class);
		} catch (NotFoundOrderPropertyException e) {
			throw new RuntimeException("排序字段不符合规则");
		} catch (NotFoundOrderDirectionException e) {
			throw new RuntimeException("排序方向不符合要求");
		}

		return PageUtil.pagination(pageable, revenueAndRefundList, new PageUtil.Callback<RevenueAndRefund>() {

			@Override
			public List<RevenueAndRefund> getPageContent() {
				return revenueAndRefundMapper.selectRevenueAndRefundDetailsByCondition(condition);
			}

		});
	}

	public RevenueAndRefund findById(String id) {
		return this.revenueAndRefundMapper.findById(id);
	}

	/**
	 * 付款
	 * 
	 * @param revenueAndRefund
	 * @return
	 */
	@Transactional(readOnly = false)
	public boolean revenue(RevenueAndRefund revenueAndRefund) {
		revenueAndRefund.setCreateDate(new Date());
		revenueAndRefund.setModifyDate(new Date());
		return this.revenueAndRefundMapper.insertSelective(revenueAndRefund) == 1;
	}

	/**
	 * 退款
	 * 
	 * @param revenueAndRefund
	 * @return
	 */
	@Transactional(readOnly = false)
	public boolean refund(RevenueAndRefund revenueAndRefund) {
		revenueAndRefund.setCategory(RevenueAndRefund.TYPE_CATEGORY_REFUND);
		revenueAndRefund.setCreateDate(new Date());
		revenueAndRefund.setModifyDate(new Date());
		return this.revenueAndRefundMapper.insertSelective(revenueAndRefund) == 1;
	}

	// -----2016-11-05
	/**
	 * 根据订单编号获取相应的收付款信息
	 * @param businessId
	 * @param orderId
	 * @return
	 */
	public List<RevenueAndRefund> selectRevenueAndRefundDetailsByOrderId(String businessId, String orderId) {
		RevenueAndRefundCondition condition = new RevenueAndRefundCondition();
		condition.setBusinessId(businessId);
		condition.setOrderId(orderId);
		List<RevenueAndRefund> list = this.revenueAndRefundMapper.selectRevenueAndRefundDetailsByCondition(condition);
		RevenueAndRefundExtDataHandler.resultExtDataHandle(businessId, list);

		return list;

	}

}
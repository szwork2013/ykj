package com.gnet.app.revenueandrefund;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.util.CollectionUtils;

import com.gnet.app.Constant;
import com.gnet.app.codeword.Codeword;
import com.gnet.app.codeword.CodewordService;
import com.gnet.utils.spring.SpringContextHolder;

public class RevenueAndRefundExtDataHandler {

	/**
	 * 查询结果处理
	 * 
	 * @param businessId
	 * @param RevenueAndRefund
	 */
	public static void resultExtDataHandle(String businessId, RevenueAndRefund revenueAndRefund) {
		if (null != revenueAndRefund) {
			List<RevenueAndRefund> list = new ArrayList<RevenueAndRefund>(1);
			list.add(revenueAndRefund);
			resultExtDataHandle(businessId, list);
		}
	}

	/**
	 * 查询结果处理
	 * 
	 * @param businessId
	 * @param revenueAndRefundList
	 */
	public static void resultExtDataHandle(String businessId, List<RevenueAndRefund> revenueAndRefundList) {
		CodewordService codewordService = SpringContextHolder.getBean(CodewordService.class);

		if (!CollectionUtils.isEmpty(revenueAndRefundList)) {
			Map<String, Codeword> payCategoryMap = codewordService.selectCodeword(businessId, Constant.PAY_CATEGORY);
			Map<String, Codeword> payWayMap = codewordService.selectCodeword(businessId, Constant.PAY_WAY);
			Codeword payCategory = null, payWay = null;
			for (RevenueAndRefund revenueAndRefund : revenueAndRefundList) {
				payCategory = payCategoryMap.get(String.valueOf(revenueAndRefund.getCategory()));
				if (null != payCategory) {
					revenueAndRefund.setCategoryName(payCategory.getValue());
				}

				payWay = payWayMap.get(String.valueOf(revenueAndRefund.getPayWay()));
				if (null != payWay) {
					revenueAndRefund.setPayWayName(payWay.getValue());
				}
			}
		}
	}

}

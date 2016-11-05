package com.gnet.app.good;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.util.CollectionUtils;

import com.gnet.app.Constant;
import com.gnet.app.codeword.Codeword;
import com.gnet.app.codeword.CodewordService;
import com.gnet.utils.spring.SpringContextHolder;

public class GoodExtDataHandler {

	/**
	 * 
	 * @param businessId
	 * @param goodList
	 */
	public static void resultExtDataHandle(String businessId, List<Good> goodList) {
		CodewordService codewordService = SpringContextHolder.getBean(CodewordService.class);
		if (!CollectionUtils.isEmpty(goodList)) {
			Map<String, Codeword> goodUnitMap = codewordService.selectCodeword(businessId, Constant.GOOD_UNIT);
			Map<String, Codeword> goodOnsaleStatusMap = codewordService.selectCodeword(businessId,
					Constant.GOOD_ONSALE_STATUS);
			Codeword goodUnit = null, goodOnsaleStatus = null;
			for (Good good : goodList) {
				goodUnit = goodUnitMap.get(String.valueOf(good.getUnit()));
				if (null != goodUnit) {
					good.setUnitText(goodUnit.getValue());
				}

				goodOnsaleStatus = goodOnsaleStatusMap.get(String.valueOf(good.getOnsaleStatus()));
				if (null != goodOnsaleStatus) {
					good.setOnsaleStatusText(goodOnsaleStatus.getValue());
				}
			}
		}
	}

	/**
	 * 
	 * @param businessId
	 * @param good
	 */
	public static void resultExtDataHandle(String businessId, Good good) {
		List<Good> goodList = new ArrayList<Good>(1);
		goodList.add(good);
		resultExtDataHandle(businessId, goodList);
	}

}

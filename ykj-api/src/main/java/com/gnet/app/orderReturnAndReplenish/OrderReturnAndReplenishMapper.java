package com.gnet.app.orderReturnAndReplenish;

import java.util.List;

import tk.mybatis.mapper.common.Mapper;

/**
 * 退补活Mapper
 *
 */
public interface OrderReturnAndReplenishMapper extends Mapper<OrderReturnAndReplenish>{

	/**
	 * 根据查询条件获取相应的退补活信息详情
	 * @param condition
	 * @return
	 */
	public List<OrderReturnAndReplenish> selectOrderReturnAndReplenishDetailsByCondition(OrderReturnAndReplenishCondition condition);
}

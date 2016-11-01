package com.gnet.app.orderServiceAttachment;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import tk.mybatis.mapper.common.Mapper;

public interface OrderServiceAttachmentMapper extends Mapper<OrderServiceAttachment> {

	/**
	 * 根据服务单号ID查询其下的所有附件信息
	 * 
	 * @author JunLin.Yang
	 * @param orderServiceId
	 *            服务单号ID
	 * @return 所有附件信息
	 */
	public List<OrderServiceAttachment> selectAttachmentsByOrderServiceId(
			@Param("orderServiceId") String orderServiceId);

}

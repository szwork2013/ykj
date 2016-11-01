package com.gnet.app.orderServiceAttachment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gnet.app.order.Order;
import com.gnet.app.order.OrderOrderType;
import com.gnet.utils.page.PageUtil;
import com.gnet.utils.sort.ParamSceneUtils;
import com.gnet.utils.sort.exception.NotFoundOrderDirectionException;
import com.gnet.utils.sort.exception.NotFoundOrderPropertyException;

@Service
@Transactional(readOnly = true)
public class OrderServiceAttachmentService {

	@Autowired
	private OrderServiceAttachmentMapper orderServiceAttachmentMapper;

	public OrderServiceAttachment findById(String id) {
		return orderServiceAttachmentMapper.selectByPrimaryKey(id);
	}

	@Transactional(readOnly = false)
	public Boolean create(OrderServiceAttachment orderServiceAttachment) {
		return orderServiceAttachmentMapper.insertSelective(orderServiceAttachment) == 1;
	}

	@Transactional(readOnly = false)
	public Boolean delete(String id) {
		return orderServiceAttachmentMapper.deleteByPrimaryKey(id) == 1;
	}

	/**
	 * 根据服务单号ID查询其下的所有附件信息
	 * 
	 * @author JunLin.Yang
	 * @param orderServiceId
	 *            服务单号ID
	 * @return 所有附件信息
	 */
	@Transactional(readOnly = true)
	public List<OrderServiceAttachment> selectAttachmentsByOrderServiceId(String orderServiceId) {
		return this.orderServiceAttachmentMapper.selectAttachmentsByOrderServiceId(orderServiceId);
	}

	/**
	 * 根据服务单号ID查询其下的所有附件信息
	 * 
	 * @author JunLin.Yang
	 * @param orderServiceId
	 *            服务单号ID
	 * @return 所有附件信息
	 */
	@Transactional(readOnly = true)
	public Page<OrderServiceAttachment> paginationAttachmentsByOrderServiceId(String orderServiceId,
			Pageable pageable) {

		return PageUtil.pagination(pageable, null, new PageUtil.Callback<OrderServiceAttachment>() {

			@Override
			public List<OrderServiceAttachment> getPageContent() {
				return orderServiceAttachmentMapper.selectAttachmentsByOrderServiceId(orderServiceId);
			}

		});
	}

}
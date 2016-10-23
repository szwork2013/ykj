package com.gnet.app.orderService;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import com.gnet.app.Constant;
import com.gnet.app.clerk.Clerk;
import com.gnet.app.orderServiceAttachment.OrderServiceAttachment;
import com.gnet.app.orderServiceAttachment.OrderServiceAttachmentMapper;
import com.gnet.upload.FileUploadService;
import com.gnet.utils.date.DateUtil;
import com.gnet.utils.page.PageUtil;
import com.gnet.utils.page.PageUtil.Callback;
import com.gnet.utils.sort.ParamSceneUtils;
import com.gnet.utils.sort.exception.NotFoundOrderDirectionException;
import com.gnet.utils.sort.exception.NotFoundOrderPropertyException;

@Service
@Transactional(readOnly = true)
public class OrderSerService {

	@Autowired
	private OrderServiceMapper orderServiceMapper;

	@Autowired
	private FileUploadService fileUploadService;

	@Autowired
	private OrderServiceAttachmentMapper orderServiceAttachmentMapper;

	/**
	 * 根据查询条件查询订单服务及其关联信息集合
	 * 
	 * @param condition
	 * @return
	 */
	public List<OrderSer> selectOrderServiceWithDetailByCondition(Clerk clerk, OrderServiceCondition condition) {
		Integer roleType = clerk.getRoleType();
		if (Clerk.ROLE_TYPE_ADMIN.equals(roleType) || Clerk.ROLE_TYPE_MANAGER.equals(roleType)
				|| Clerk.ROLE_TYPE_LOGISTIC.equals(roleType) || Clerk.ROLE_TYPE_AFTER_SALES.equals(roleType)
				|| Clerk.ROLE_TYPE_WAREHOUSE.equals(roleType)) {
			condition.setBusinessId(clerk.getBusinessId());
		} else if (Clerk.ROLE_TYPE_STORE_MANAGER.equals(roleType)) {
			condition.setSotreId(clerk.getStoreId());
		} else if (Clerk.ROLE_TYPE_CLERK.equals(roleType)) {
			condition.setOrderResponsibleId(clerk.getId());
		} else {
			return new ArrayList<OrderSer>();
		}
		List<OrderSer> list = this.orderServiceMapper.selectOrderServiceWithDetailByCondition(condition);
		setExtInfoDetail(list);

		return list;
	}

	@Transactional(readOnly = true)
	public Page<OrderSer> paginationOrderServiceWithDetailByCondition(Clerk clerk, OrderServiceCondition condition,
			Pageable pageable) {
		Integer roleType = clerk.getRoleType();

		if (Clerk.ROLE_TYPE_ADMIN.equals(roleType) || Clerk.ROLE_TYPE_MANAGER.equals(roleType)
				|| Clerk.ROLE_TYPE_LOGISTIC.equals(roleType) || Clerk.ROLE_TYPE_AFTER_SALES.equals(roleType)
				|| Clerk.ROLE_TYPE_WAREHOUSE.equals(roleType)) {
			condition.setBusinessId(clerk.getBusinessId());
		} else if (Clerk.ROLE_TYPE_STORE_MANAGER.equals(roleType)) {
			condition.setSotreId(clerk.getStoreId());
		} else if (Clerk.ROLE_TYPE_CLERK.equals(roleType)) {
			condition.setOrderResponsibleId(clerk.getId());
		} else {
			return PageUtil.pagination(pageable, new Callback<OrderSer>() {

				public List<OrderSer> getPageContent() {
					return new ArrayList<>();
				}
			});
		}

		List<String> orderList = null;

		// 排序处理
		try {
			orderList = ParamSceneUtils.toOrder(pageable, OrderServiceOrderType.class);
		} catch (NotFoundOrderPropertyException e) {
			throw new RuntimeException("排序字段不符合规则");
		} catch (NotFoundOrderDirectionException e) {
			throw new RuntimeException("排序方向不符合要求");
		}

		Page<OrderSer> pageResult = PageUtil.pagination(pageable, orderList, new PageUtil.Callback<OrderSer>() {

			@Override
			public List<OrderSer> getPageContent() {
				return orderServiceMapper.selectOrderServiceWithDetailByCondition(condition);
			}

		});
		this.setExtInfoDetail(pageResult.getContent());
		return pageResult;

	}

	// 因为预警期表还未完成，到时候还得增加消息提醒表记录
	@Transactional(readOnly = false)
	public Boolean createOrderService(Clerk clerk, OrderSer orderService, MultipartFile file) {

		orderService.setServiceCode(generateServiceCode());
		boolean result = orderServiceMapper.insertSelective(orderService) == 1;
		if (null != file && !file.isEmpty()) {
			// 存在附件，则进行保存

			String path = this.fileUploadService.getRootPath() + "order_service_file";
			File dir = new File(path);
			if (!dir.exists()) {
				dir.mkdirs();
			}

			File localFile = new File(path + "/" + file.getOriginalFilename());
			try {
				if (!localFile.exists()) {
					localFile.createNewFile();
				}
				file.transferTo(localFile);

				OrderServiceAttachment attachment = new OrderServiceAttachment();
				attachment.setAttachmentFilename(file.getOriginalFilename());
				attachment.setAttachmentSize(String.valueOf(file.getSize()));
				attachment.setCreateDate(new Date());
				attachment.setModifyDate(new Date());
				attachment.setUploadDate(new Date());
				attachment.setUploadPersonId(clerk.getId());
				attachment.setAttachmentRoot(path);
				attachment.setAttachmentSuffix(file.getOriginalFilename()
						.substring(file.getOriginalFilename().lastIndexOf('.'), file.getOriginalFilename().length()));

				result = orderServiceAttachmentMapper.insertSelective(attachment) == 1;

				orderService.setAttachmentId(attachment.getId());
				result = this.orderServiceMapper.updateByPrimaryKeySelective(orderService) == 1;
			} catch (IllegalStateException | IOException e) {
				// TODO Auto-generated catch block
				throw new RuntimeException(e);
			}
		}

		return result;

	}

	// 因为预警期表还未完成，到时候还得增加消息提醒表记录
	@Transactional(readOnly = false)
	public Boolean updateOrderService(Clerk clerk, OrderSer orderService, MultipartFile file) {

		OrderSer oldOrderSer = orderServiceMapper.selectByPrimaryKey(orderService.getId());
		boolean result = orderServiceMapper.updateByPrimaryKeySelective(orderService) == 1;

		if (null != file && !file.isEmpty()) {
			// 存在附件，则进行保存

			String path = this.fileUploadService.getRootPath() + "order_service_file";
			File dir = new File(path);
			if (!dir.exists()) {
				dir.mkdirs();
			}

			File localFile = new File(path + "/" + file.getOriginalFilename());
			try {
				if (!localFile.exists()) {
					localFile.createNewFile();
				}
				file.transferTo(localFile);

				// 先删除原附件
				orderServiceAttachmentMapper.deleteByPrimaryKey(oldOrderSer.getAttachmentId());
				// 新增附件记录信息
				OrderServiceAttachment attachment = new OrderServiceAttachment();
				attachment.setAttachmentFilename(file.getOriginalFilename());
				attachment.setAttachmentSize(String.valueOf(file.getSize()));
				attachment.setCreateDate(new Date());
				attachment.setModifyDate(new Date());
				attachment.setUploadDate(new Date());
				attachment.setUploadPersonId(clerk.getId());
				attachment.setAttachmentRoot("");
				attachment.setAttachmentSuffix(file.getOriginalFilename()
						.substring(file.getOriginalFilename().lastIndexOf('.'), file.getOriginalFilename().length()));

				result = orderServiceAttachmentMapper.insertSelective(attachment) == 1;

				// 跟新服务表信息
				orderService.setAttachmentId(attachment.getId());
				result = this.orderServiceMapper.updateByPrimaryKeySelective(orderService) == 1;
			} catch (IllegalStateException | IOException e) {
				// TODO Auto-generated catch block
				throw new RuntimeException(e);
			}
		}

		return result;

	}

	@Transactional(readOnly = false)
	public Boolean deleteOrderService(Clerk clerk, String orderServiceId) {

		OrderSer orderSer = orderServiceMapper.selectByPrimaryKey(orderServiceId);
		orderSer.setIsDel(Boolean.TRUE);
		boolean result = orderServiceMapper.updateByPrimaryKeySelective(orderSer) == 1;
		orderServiceAttachmentMapper.deleteByPrimaryKey(orderSer.getAttachmentId());

		return result;

	}

	protected String generateServiceCode() {
		String maxServiceCode = this.orderServiceMapper.selectMaxServiceCodeToday();
		int num = 0;
		if(StringUtils.isNotBlank(maxServiceCode)){
			num = Integer.parseInt(maxServiceCode.substring(10)) + 1;
		}
		DateUtil dateUtil = new DateUtil();
		return "FW" + dateUtil.dateToString(new Date(), "yyyyMMdd") + StringUtils.leftPad(String.valueOf(num), 3,'0');
	}

	private void setExtInfoDetail(OrderSer orderService) {
		Date date = new Date();
		if (StringUtils.isBlank(orderService.getClerkId())
				&& (DateUtil.dayDiff(orderService.getNeedTime(), date) > 0)) {
			orderService.setStatus(OrderSer.STATUS_OVERDUE);
		} else if (orderService.getIsFinish()) {
			orderService.setStatus(OrderSer.STATUS_COMPLETE);
		} else if (StringUtils.isNotBlank(orderService.getServicePosition())) {
			orderService.setStatus(OrderSer.STATUS_SIGN);
		} else if (StringUtils.isNotBlank(orderService.getClerkId())) {
			orderService.setStatus(OrderSer.STATUS_ARRANGE);
		} else {
			orderService.setStatus(OrderSer.STATUS_UNARRANGE);
		}
	}

	private void setExtInfoDetail(List<OrderSer> orderServiceList) {
		if (!CollectionUtils.isEmpty(orderServiceList)) {
			for (OrderSer orderService : orderServiceList) {
				this.setExtInfoDetail(orderService);
			}
		}
	}
}

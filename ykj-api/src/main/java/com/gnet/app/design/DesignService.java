package com.gnet.app.design;

import java.io.File;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.gnet.app.noticeMsg.NoticeMsg;
import com.gnet.app.noticeMsg.NoticeMsgService;
import com.gnet.app.orderProcess.OrderProcess;
import com.gnet.app.orderProcess.OrderProcessMapper;
import com.gnet.app.orderService.OrderSer;
import com.gnet.app.orderService.OrderSerService;
import com.gnet.app.orderService.OrderServiceMapper;
import com.gnet.app.orderServiceAttachment.OrderServiceAttachment;
import com.gnet.app.orderServiceAttachment.OrderServiceAttachmentService;
import com.gnet.upload.FileUploadService;
import com.gnet.utils.date.DateUtil;
import com.gnet.utils.page.PageUtil;
import com.gnet.utils.spring.SpringContextHolder;

@Service
@Transactional(readOnly = true)
public class DesignService extends OrderSerService{
	
	@Autowired
	private OrderServiceMapper orderServiceMapper;
	
	public OrderSer findById(String id) {
		return orderServiceMapper.findById(id);
	}

	public List<OrderSer> findAll(List<String> orderList, String orderId, Integer type) {
		List<OrderSer> measures = orderServiceMapper.findAll(orderList, orderId, type);
		Date date =  new Date();
		if(!measures.isEmpty()){
			for(OrderSer measure : measures){
				if(StringUtils.isBlank(measure.getClerkId()) && (DateUtil.dayDiff(measure.getNeedTime(), date) > 0)){
					measure.setStatus(OrderSer.STATUS_OVERDUE);
				}else if(measure.getIsFinish()){
					measure.setStatus(OrderSer.STATUS_COMPLETE);
				}else if(StringUtils.isNotBlank(measure.getServicePosition())){
					measure.setStatus(OrderSer.STATUS_SIGN);
				}else if(StringUtils.isNotBlank(measure.getClerkId())){
					measure.setStatus(OrderSer.STATUS_ARRANGE);
				}else{
					measure.setStatus(OrderSer.STATUS_UNARRANGE);
				}
			}
		}
		
		return measures;
	}
	
	
	public Page<OrderSer> pagination(Pageable pageable, List<String> orderList, String orderId, Integer type) {
		return PageUtil.pagination(pageable, orderList, new PageUtil.Callback<OrderSer>() {
			
			@Override
			public List<OrderSer> getPageContent() {
				List<OrderSer> measures = orderServiceMapper.selectAllList(orderId, type);
				Date date =  new Date();
				if(!measures.isEmpty()){
					for(OrderSer measure : measures){
						if(StringUtils.isBlank(measure.getClerkId()) && (DateUtil.dayDiff(measure.getNeedTime(), date) > 0)){
							measure.setStatus(OrderSer.STATUS_OVERDUE);
						}else if(measure.getIsFinish()){
							measure.setStatus(OrderSer.STATUS_COMPLETE);
						}else if(StringUtils.isNotBlank(measure.getServicePosition())){
							measure.setStatus(OrderSer.STATUS_SIGN);
						}else if(StringUtils.isNotBlank(measure.getClerkId())){
							measure.setStatus(OrderSer.STATUS_ARRANGE);
						}else{
							measure.setStatus(OrderSer.STATUS_UNARRANGE);
						}
					}
				}
				
				return measures;
			}
			
		});
	}
	
	//因为预警期表还未完成，如果删除的日期早于消息提醒表的时间的话，删除消息提醒表的数据
	@Transactional(readOnly = false)
	public Boolean delete(String id, Date date) {
		NoticeMsgService noticeMsgService = SpringContextHolder.getBean(NoticeMsgService.class);
		Boolean result;
		result = orderServiceMapper.deleteById(id, date) == 1;
		if(!result){
			return false;
		}
		NoticeMsg noticeMsg = noticeMsgService.findByFromId(id);
		if(noticeMsg != null && DateUtil.dayDiff(noticeMsg.getNoticeDate(), date) > 0){
			result = noticeMsgService.delete(noticeMsg.getId(), date);
			if(!result){
				TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			}
		}
		
		return true;
	}


	public boolean isCreateExist(String serviceCode, String businessId) {
		return orderServiceMapper.isCreateExist(serviceCode, businessId) > 0 ;
	}

	public boolean isModifyExist(String serviceCode, String oldServiceCode, String businessId) {
		return orderServiceMapper.isModifyExist(serviceCode, oldServiceCode, businessId) > 0;
	}
	
}
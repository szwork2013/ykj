package com.gnet.app.storageIn;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.util.CollectionUtils;

import com.gnet.app.clerk.Clerk;
import com.gnet.app.orderService.OrderServiceOrderType;
import com.gnet.app.storageGoodStatus.StorageGoodStatus;
import com.gnet.app.storageGoodStatus.StorageGoodStatusMapper;
import com.gnet.app.storageInDetail.StorageInDetail;
import com.gnet.app.storageInDetail.StorageInDetailMapper;
import com.gnet.utils.page.PageUtil;
import com.gnet.utils.sort.ParamSceneUtils;
import com.gnet.utils.sort.exception.NotFoundOrderDirectionException;
import com.gnet.utils.sort.exception.NotFoundOrderPropertyException;

@Service
@Transactional(readOnly = true)
public class StorageInService {

	@Autowired
	private StorageInMapper storageInMapper;

	@Autowired
	private StorageInDetailMapper storageInDetailMapper;

	@Autowired
	private StorageGoodStatusMapper storageGoodStatusMapper;

	public StorageIn getStorageIn(String id) {
		return this.storageInMapper.selectByPrimaryKey(id);
	}

	/**
	 * 根据用户信息及查询条件查询入库历史信息明细集合
	 * 
	 * @param clerk
	 *            用户信息
	 * @param condition
	 *            查询条件
	 * @return List<StorageIn> 入库历史信息明细集合
	 */
	@Transactional(readOnly = true)
	public List<StorageIn> selectStorageInHistoryDataList(Clerk clerk, StorageInCondition condition) {

		// 由于表中只包含商家编码和操作人编码，故这边不做任何处理
		condition.setBusinessId(clerk.getBusinessId());
		List<StorageIn> list = null;
		if (StringUtils.isBlank(condition.getGoodId())) {
			list = this.storageInMapper.selectStorageInHistoryDataListByCondition(condition);
		}else{
			list = this.storageInMapper.selectStorageInGoodHistoryDataListByCondition(condition);
		}
		return list;
	}

	/**
	 * 根据用户信息及查询条件查询入库历史信息明细分页信息
	 * 
	 * @param clerk
	 *            用户信息
	 * @param condition
	 *            查询条件
	 * @return Page<StorageIn> 入库历史信息分页集合
	 */
	@Transactional(readOnly = true)
	public Page<StorageIn> paginationStorageInHistoryDataList(Clerk clerk, StorageInCondition condition,
			Pageable pageable) {

		condition.setBusinessId(clerk.getBusinessId());

		List<String> orderList = null;

		// 排序处理
		try {
			orderList = ParamSceneUtils.toOrder(pageable, StorageInOrderType.class);
		} catch (

		NotFoundOrderPropertyException e) {
			throw new RuntimeException("排序字段不符合规则");
		} catch (

		NotFoundOrderDirectionException e) {
			throw new RuntimeException("排序方向不符合要求");
		}

		Page<StorageIn> pageResult = PageUtil.pagination(pageable, orderList, new PageUtil.Callback<StorageIn>() {

			@Override
			public List<StorageIn> getPageContent() {
				if (StringUtils.isBlank(condition.getGoodId())) {
					return storageInMapper.selectStorageInHistoryDataListByCondition(condition);
				}else{
					return storageInMapper.selectStorageInGoodHistoryDataListByCondition(condition);
				}
				
			}

		});
		return pageResult;

	}

	/**
	 * 新增入库及相关明细信息
	 * 
	 * @param clerk
	 *            操作用户信息
	 * @param storageIn
	 *            入库信息
	 * @return boolean 是否入库成功
	 */
	@Transactional(readOnly = false)
	public boolean create(Clerk clerk, StorageIn storageIn) {
		Date date = new Date();
		storageIn.setBusinessId(clerk.getBusinessId());
		storageIn.setClerkId(clerk.getId());
		storageIn.setChangeDate(date);
		storageIn.setCreateDate(date);
		storageIn.setModifyDate(date);

		boolean result = this.storageInMapper.insertSelective(storageIn) == 1;

		if (result && !CollectionUtils.isEmpty(storageIn.getStorageInDetailList())) {
			StorageGoodStatus storageGoodStatus = null;
			for (StorageInDetail storageInDetail : storageIn.getStorageInDetailList()) {
				storageInDetail.setCreateDate(date);
				storageInDetail.setModifyDate(date);
				storageInDetail.setStorageInId(storageIn.getId());
				result = this.storageInDetailMapper.insertSelective(storageInDetail) == 1;
				if (result) {
					// 针对现有商品计算现有库存
					storageGoodStatus = storageGoodStatusMapper.selectByPrimaryKey(storageInDetail.getStorageGoodsId());
					if (null != storageGoodStatus) {
						// 目前有该商品库存信息则直接修改
						storageGoodStatus.setModifyDate(date);
						storageGoodStatus.setCreateDate(date);
						storageGoodStatus.setStoreNow(storageGoodStatus.getStoreNow() + storageInDetail.getNum());
						this.storageGoodStatusMapper.updateByPrimaryKeySelective(storageGoodStatus);
					} else {
						// 不存在商品库存信息则直接添加
						storageGoodStatus = new StorageGoodStatus();
						storageGoodStatus.setId(storageInDetail.getStorageGoodsId());
						storageGoodStatus.setModifyDate(date);
						storageGoodStatus.setCreateDate(date);
						storageGoodStatus.setStoreNow(Long.valueOf(storageInDetail.getNum().toString()));
						this.storageGoodStatusMapper.insertSelective(storageGoodStatus);
					}
				} else {
					break;
				}
			}
		}

		if (!result) {
			// 新增失败则事务回滚
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}

		return result;
	}

}

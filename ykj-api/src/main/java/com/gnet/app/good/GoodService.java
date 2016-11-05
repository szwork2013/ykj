package com.gnet.app.good;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.gnet.app.Constant;
import com.gnet.app.clerk.Clerk;
import com.gnet.app.codeword.Codeword;
import com.gnet.app.codeword.CodewordService;
import com.gnet.utils.page.PageUtil;

@Service
@Transactional(readOnly = true)
public class GoodService {

	@Autowired
	private GoodMapper goodMapper;

	@Autowired
	private CodewordService codewordService;

	public Good findById(String id) {
		List<String> ids = new ArrayList<>();
		ids.add(id);
		List<Good> goodList = goodMapper.findByIds(ids);
		return goodList.size() > 0 ? goodList.get(0) : null;
	}

	public Good find(Good good) {
		return goodMapper.selectOne(good);
	}

	public List<Good> findAll(String name, Integer onsaleStatus, String businessId, List<String> orderList) {
		return goodMapper.selectGoodsAllList(orderList, name, onsaleStatus, businessId);
	}

	public Page<Good> pagination(Pageable pageable, String name, Integer onsaleStatus, String businessId,
			List<String> orderList) {
		return PageUtil.pagination(pageable, orderList, new PageUtil.Callback<Good>() {

			@Override
			public List<Good> getPageContent() {
				return goodMapper.selectGoodsAll(name, onsaleStatus, businessId);
			}

		});
	}

	@Transactional(readOnly = false)
	public Boolean create(Good good) {
		Date date = new Date();
		good.setCreateDate(date);
		good.setModifyDate(date);
		return goodMapper.insertSelective(good) == 1;
	}

	@Transactional(readOnly = false)
	public Boolean update(Good good) {
		good.setModifyDate(new Date());
		return goodMapper.updateByPrimaryKeySelective(good) == 1;
	}

	@Transactional(readOnly = false)
	public Boolean delete(String id) {
		return goodMapper.deleteByPrimaryKey(id) == 1;
	}

	/**
	 * 验证商品型号唯一
	 * 
	 * @param model
	 * @param originValue
	 * @return
	 */
	public Boolean isExists(String model, String originValue, String businessId) {
		return goodMapper.isExists(model, originValue, businessId) > 0;
	}

	/**
	 * 商品在订单中的使用情况
	 * 
	 * @param storageGoodsId
	 * @param businessId
	 * @return
	 */
	public Boolean useInOrder(String storageGoodsId) {
		return goodMapper.useInOrder(storageGoodsId) > 0;
	}

	/**
	 * 修改商品的在售状态
	 * 
	 * @param id
	 * @param onsaleStatus
	 * @return
	 */
	@Transactional(readOnly = false)
	public Boolean changeOnsaleStatus(String id, Integer onsaleStatus) {
		Good good = new Good();
		good.setId(id);
		good.setOnsaleStatus(onsaleStatus);
		good.setModifyDate(new Date());
		return goodMapper.updateByPrimaryKeySelective(good) == 1;
	}

	/**
	 * 根据用户及查询条件查询相关商品明细信息集合
	 * @param clerk
	 * @param condition
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<Good> selectGoodDetailsByCondition(Clerk clerk, GoodCondition condition) {
		condition.setBusinessId(clerk.getBusinessId());
		List<Good> goodList = this.goodMapper.selectGoodDetailsByCondition(condition);
		GoodExtDataHandler.resultExtDataHandle(clerk.getBusinessId(),goodList);
		return goodList;
	}

	/**
	 * 根据用户信息及商品查询信息获取商品库存状态明细分页信息
	 * 
	 * @return
	 */
	public Page<StorageGoodStatusDetail> paginationStorageGoodStatusDetailList(Pageable pageable,
			List<String> orderList, Clerk clerk, GoodCondition condition) {

		condition.setBusinessId(clerk.getBusinessId());
		return PageUtil.pagination(pageable, orderList, new PageUtil.Callback<StorageGoodStatusDetail>() {

			@Override
			public List<StorageGoodStatusDetail> getPageContent() {
				return goodMapper.selectStorageGoodStatusDetailList(condition);
			}

		});
	}

	/**
	 * 根据用户信息及商品查询信息获取商品库存状态明细信息
	 * 
	 * @return
	 */
	public List<StorageGoodStatusDetail> selectStorageGoodStatusDetailList(List<String> orderList, Clerk clerk,
			GoodCondition condition) {
		condition.setBusinessId(clerk.getBusinessId());
		return goodMapper.selectStorageGoodStatusDetailList(condition);
	}

	/**
	 * 根据ID获取商品信息及其相关出入库详情
	 * 
	 * @return
	 */
	public Good selectGoodInfoWithStorageInAndOutRecordById(String id) {
		Good good = this.goodMapper.selectByPrimaryKey(id);
		if (null != good) {
			good.setStorageInAndOutList(this.goodMapper.selectStorageInAndOutRecordsById(id));
		}

		return good;
	}

}
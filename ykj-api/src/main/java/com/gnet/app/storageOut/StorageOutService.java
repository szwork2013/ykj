package com.gnet.app.storageOut;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.util.CollectionUtils;

import com.gnet.app.clerk.Clerk;
import com.gnet.app.storageGoodStatus.StorageGoodStatus;
import com.gnet.app.storageGoodStatus.StorageGoodStatusMapper;
import com.gnet.app.storageIn.StorageInOrderType;
import com.gnet.app.storageOutDetail.StorageOutDetail;
import com.gnet.app.storageOutDetail.StorageOutDetailMapper;
import com.gnet.utils.page.PageUtil;
import com.gnet.utils.sort.ParamSceneUtils;
import com.gnet.utils.sort.exception.NotFoundOrderDirectionException;
import com.gnet.utils.sort.exception.NotFoundOrderPropertyException;

@Service
@Transactional(readOnly = true)
public class StorageOutService {

  @Autowired
  private StorageOutMapper storageOutMapper;

  @Autowired
  private StorageOutDetailMapper storageOutDetailMapper;

  @Autowired
  private StorageGoodStatusMapper storageGoodStatusMapper;


  public StorageOut getStorageOut(String id){
    return this.storageOutMapper.selectByPrimaryKey(id);
  }
  
  /**
   * 根据用户信息及查询条件查询出库历史信息明细集合
   * @param clerk 用户信息
   * @param condition 查询条件
   * @return
   * List<storageOut> 出库历史信息明细集合
   */
  @Transactional(readOnly = true)
  public List<StorageOut> selectStorageOutHistoryDataList(Clerk clerk, StorageOutCondition condition) {

    //由于表中只包含商家编码和操作人编码，故这边不做任何处理
    condition.setBusinessId(clerk.getBusinessId());
    List<StorageOut> list = this.storageOutMapper.selectStorageOutHistoryDataListByCondition(condition);

    return list;
  }

  /**
   * 根据用户信息及查询条件查询出库历史信息明细分页信息
   * @param clerk 用户信息
   * @param condition 查询条件
   * @return
   * Page<storageOut> 出库历史信息分页集合
   */
  @Transactional(readOnly = true)
  public Page<StorageOut> paginationStorageOutHistoryDataList(Clerk clerk, StorageOutCondition condition,
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

    Page<StorageOut> pageResult = PageUtil.pagination(pageable, orderList, new PageUtil.Callback<StorageOut>() {

      @Override
      public List<StorageOut> getPageContent() {
        return storageOutMapper.selectStorageOutHistoryDataListByCondition(condition);
      }

    });
    return pageResult;

  }

  /**
   * 新增出库及相关明细信息
   * @param clerk 操作用户信息
   * @param storageOut 出库信息 
   * @return
   * boolean 是否出库成功
   */
  @Transactional(readOnly = false)
  public boolean create(Clerk clerk, StorageOut storageOut) {
    Date date = new Date();
    storageOut.setBusinessId(clerk.getBusinessId());
    storageOut.setClerkId(clerk.getId());
    storageOut.setChangeDate(date);
    storageOut.setCreateDate(date);
    storageOut.setModifyDate(date);

    boolean result = this.storageOutMapper.insertSelective(storageOut) == 1;

    if (result && !CollectionUtils.isEmpty(storageOut.getStorageOutDetailList())) {
      StorageGoodStatus storageGoodStatus = null;
      for (StorageOutDetail storageOutDetail : storageOut.getStorageOutDetailList()) {
        storageOutDetail.setCreateDate(date);
        storageOutDetail.setModifyDate(date);
        storageOutDetail.setStorageOutId(storageOut.getId());
        result = this.storageOutDetailMapper.insertSelective(storageOutDetail) == 1;
        if (result) {
          //针对现有商品计算现有库存
          storageGoodStatus = storageGoodStatusMapper.selectByPrimaryKey(storageOutDetail.getStorageGoodsId());
          if (null != storageGoodStatus) {
            //目前有该商品库存信息则直接修改
            storageGoodStatus.setModifyDate(date);
            storageGoodStatus.setCreateDate(date);
            storageGoodStatus.setStoreNow(storageGoodStatus.getStoreNow() - storageOutDetail.getNum());
            this.storageGoodStatusMapper.updateByPrimaryKeySelective(storageGoodStatus);
          } else {
            //不存在商品库存信息则设置操作失败，且跳出循环
            result = false;
            break;
          }
        } else {
          break;
        }
      }
    }

    if (!result) {
      //新增失败则事务回滚
      TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
    }

    return result;
  }

}

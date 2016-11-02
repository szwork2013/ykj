package com.gnet.app.storageInDetail;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gnet.app.clerk.Clerk;
import com.gnet.app.orderService.OrderServiceOrderType;
import com.gnet.app.storageIn.StorageIn;
import com.gnet.app.storageIn.StorageInCondition;
import com.gnet.utils.page.PageUtil;
import com.gnet.utils.sort.ParamSceneUtils;
import com.gnet.utils.sort.exception.NotFoundOrderDirectionException;
import com.gnet.utils.sort.exception.NotFoundOrderPropertyException;

@Service
@Transactional(readOnly = true)
public class StorageInDetailService {

  @Autowired
  private StorageInDetailMapper storageInDetailMapper;

  public StorageInDetail getStorageInDetail(String id) {
    return this.storageInDetailMapper.selectByPrimaryKey(id);
  }

  /**
   * 根据用户信息及查询条件查询入库明细集合
   * @param clerk 用户信息
   * @param condition 查询条件
   * @return
   * List<StorageIn> 入库明细集合
   */
  @Transactional(readOnly = true)
  public List<StorageInDetail> selectStorageInDetailListByCondition(StorageInDetailCondition condition) {
    return this.storageInDetailMapper.selectStorageInDetailListByCondition(condition);
  }

  /**
   * 根据用户信息及查询条件查询入库明细分页信息
   * @param clerk 用户信息
   * @param condition 查询条件
   * @return
   * Page<StorageIn> 入库明细分页集合
   */
  @Transactional(readOnly = true)
  public Page<StorageInDetail> paginationStorageInDetailListByCondition(StorageInDetailCondition condition, Pageable pageable) {

    Page<StorageInDetail> pageResult = PageUtil.pagination(pageable, null,
        new PageUtil.Callback<StorageInDetail>() {

          @Override
          public List<StorageInDetail> getPageContent() {
            return storageInDetailMapper.selectStorageInDetailListByCondition(condition);
          }

        });
    return pageResult;

  }

}

package com.gnet.app.storageOutDetail;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gnet.utils.page.PageUtil;

@Service
@Transactional(readOnly = true)
public class StorageOutDetailService {

  @Autowired
  private StorageOutDetailMapper storageOutDetailMapper;

  public StorageOutDetail getStorageOutDetail(String id) {
    return this.storageOutDetailMapper.selectByPrimaryKey(id);
  }

  /**
   * 根据用户信息及查询条件查询出库明细集合
   * @param clerk 用户信息
   * @param condition 查询条件
   * @return
   * List<StorageOut> 出库明细集合
   */
  @Transactional(readOnly = true)
  public List<StorageOutDetail> selectStorageOutDetailListByCondition(StorageOutDetailCondition condition) {
    return this.storageOutDetailMapper.selectStorageOutDetailListByCondition( condition);
  }

  /**
   * 根据用户信息及查询条件查询出库明细分页信息
   * @param clerk 用户信息
   * @param condition 查询条件
   * @return
   * Page<StorageOut> 出库明细分页集合
   */
  @Transactional(readOnly = true)
  public Page<StorageOutDetail> paginationStorageOutDetailListByCondition(StorageOutDetailCondition condition, Pageable pageable) {

    Page<StorageOutDetail> pageResult = PageUtil.pagination(pageable, null,
        new PageUtil.Callback<StorageOutDetail>() {

          @Override
          public List<StorageOutDetail> getPageContent() {
            return storageOutDetailMapper.selectStorageOutDetailListByCondition(condition);
          }

        });
    return pageResult;

  }

}

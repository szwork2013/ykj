package com.gnet.app.storageIn;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gnet.app.clerk.Clerk;
import com.gnet.app.orderService.OrderServiceOrderType;
import com.gnet.utils.page.PageUtil;
import com.gnet.utils.sort.ParamSceneUtils;
import com.gnet.utils.sort.exception.NotFoundOrderDirectionException;
import com.gnet.utils.sort.exception.NotFoundOrderPropertyException;

@Service
@Transactional(readOnly = true)
public class StorageInService {

  @Autowired
  private StorageInMapper storageInMapper;

  @Transactional(readOnly = true)
  public List<StorageIn> selectStorageInHistoryDataList(Clerk clerk, StorageInCondition condition) {

    //由于表中只包含商家编码和操作人编码，故这边不做任何处理
    condition.setBusinessId(clerk.getBusinessId());
    List<StorageIn> list = this.storageInMapper.selectStorageInHistoryDataListByCondition(condition);

    return list;
  }

  @Transactional(readOnly = true)
  public Page<StorageIn> paginationStorageInHistoryDataList(Clerk clerk, StorageInCondition condition,
      Pageable pageable) {

    condition.setBusinessId(clerk.getBusinessId());

    List<String> orderList = null;

    // 排序处理
    try {
      orderList = ParamSceneUtils.toOrder(pageable, OrderServiceOrderType.class);
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
        return storageInMapper.selectStorageInHistoryDataListByCondition(condition);
      }

    });
    return pageResult;

  }

}

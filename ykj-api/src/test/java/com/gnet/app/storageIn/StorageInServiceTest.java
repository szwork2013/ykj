package com.gnet.app.storageIn;

import java.math.BigDecimal;
import java.util.ArrayList;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.gnet.Application;
import com.gnet.app.clerk.Clerk;
import com.gnet.app.storageInDetail.StorageInDetail;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class) // springboot 启动类
@WebAppConfiguration
public class StorageInServiceTest {
  @Autowired
  private StorageInService storageInService;

  @Test
  public void testSelectStorageInHistoryDataList() {
    StorageInCondition condition = new StorageInCondition();
    Clerk clerk = new Clerk();
    clerk.setBusinessId("1");
    this.storageInService.selectStorageInHistoryDataList(clerk, condition);
  }

  @Test
  public void testPaginationStorageInHistoryDataList() {
    // fail("Not yet implemented");
  }
  
  @Test
  public void testCreate(){
    Clerk clerk = new Clerk();
    clerk.setBusinessId("1");
    clerk.setId("clerk");
    StorageIn storageIn = new StorageIn();
    storageIn.setBatchNumber("storageIn0001");
    storageIn.setType(StorageIn.TYPE_PROCUREMENT);
    storageIn.setStorageInDetailList(new ArrayList<StorageInDetail>());
    for(int i = 0  ; i < 10 ; i++){
      StorageInDetail detail = new StorageInDetail();
      detail.setCost(new BigDecimal(10*i));
      detail.setNum(10*(i+2));
      detail.setStorageGoodsId(String.valueOf(i));
      storageIn.getStorageInDetailList().add(detail);
    }
    this.storageInService.create(clerk, storageIn);
    
  }

}

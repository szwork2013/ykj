package com.gnet.app.storageIn;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.gnet.Application;
import com.gnet.app.clerk.Clerk;

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

}

package com.gnet.app.good;

import java.util.List;

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
public class GoodServiceTest {

  @Autowired
  private GoodMapper goodMapper;
  
  @Test
  public void testPaginationStorageGoodStatusDetailList() {
    Clerk clerk = new Clerk();
    clerk.setBusinessId("1");
    GoodCondition condition = new GoodCondition();
    condition.setBusinessId("1");
    List<StorageGoodStatusDetail> list = this.goodMapper.selectStorageGoodStatusDetailList(condition);
    System.out.println(list);
    
  }

}

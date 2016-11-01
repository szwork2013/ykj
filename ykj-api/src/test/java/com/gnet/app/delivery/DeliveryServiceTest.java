package com.gnet.app.delivery;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.gnet.Application;
import com.gnet.app.orderService.OrderSer;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class) // springboot 启动类
@WebAppConfiguration
public class DeliveryServiceTest {

  @Autowired
  private DeliveryService deliveryService;
  
  @Test
  public void test() {
     OrderSer orderService = deliveryService.getOrderServiceForPrint("888888888");
     System.out.println(null != orderService.getClerk());
  }

}

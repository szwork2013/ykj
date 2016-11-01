package com.gnet.app.orderServiceAttachment;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.gnet.Application;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class) // springboot 启动类
@WebAppConfiguration
public class OrderServiceAttachmentServiceTest {

	@Autowired
	private OrderServiceAttachmentService orderServiceAttachmentService;

	@Test
	public void testSelectAttachmentsByOrderServiceId() {
		this.orderServiceAttachmentService.selectAttachmentsByOrderServiceId("030bc762-9e90-11e6-9dc9-08002715879c");
	}

}

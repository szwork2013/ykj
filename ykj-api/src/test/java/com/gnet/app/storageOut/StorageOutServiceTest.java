package com.gnet.app.storageOut;

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
import com.gnet.app.storageIn.StorageIn;
import com.gnet.app.storageOutDetail.StorageOutDetail;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class) // springboot 启动类
@WebAppConfiguration
public class StorageOutServiceTest {

	@Autowired
	private StorageOutService storageOutService;

	@Test
	public void testCreate() {
		Clerk clerk = new Clerk();
		clerk.setBusinessId("1");
		clerk.setId("clerk");
		StorageOut storageIn = new StorageOut();
		storageIn.setBatchNumber("storageIn0001");
		storageIn.setType(StorageIn.TYPE_PROCUREMENT);
		storageIn.setOrderId("test");
		storageIn.setStorageOutDetailList(new ArrayList<StorageOutDetail>());
		for (int i = 0; i < 2; i++) {
			StorageOutDetail detail = new StorageOutDetail();
			detail.setNum(10 * (i + 2));
			detail.setStorageGoodsId(String.valueOf(i));
			storageIn.getStorageOutDetailList().add(detail);
		}
		this.storageOutService.create(clerk, storageIn);

	}

}

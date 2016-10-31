package com.gnet.app.office;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.gnet.Application;
import com.gnet.app.clerk.Clerk;
import com.gnet.utils.model.TreeNode;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class) // springboot 启动类
@WebAppConfiguration
public class OfficeServiceTest {

	@Autowired
	private OfficeService officeService;

	@Test
	public void testSelectOfficesAndClerksForTree() {
		List<TreeNode<Object>> list = this.officeService.selectOfficesAndClerksForTree(
				"76622410-8af2-11e6-b721-00163e0030c0", "76622410-8af2-11e6-b721-00163e0030c0");
		System.out.println("-------------------------");
		for (TreeNode<Object> o : list) {
			if (Clerk.class.isInstance(o.getData())) {
				System.out.println(
						String.format("clerkInfo : id[%s]name[%s]leaf[%s]", ((Clerk) o.getData()).getId(), ((Clerk) o.getData()).getName(),o.isLeaf()));
			} else {
				System.out.println(
						String.format("officeInfo : id[%s]name[%s]leaf[%s]", ((Office) o.getData()).getId(), ((Office) o.getData()).getName(),o.isLeaf()));
			}
		}
		System.out.println("-------------------------");
	}

}

package com.gnet.app.office;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gnet.security.user.CustomUser;
import com.gnet.utils.model.TreeNode;

@RepositoryRestController
@ExposesResourceFor(Office.class)
@RequestMapping("/api/offices")
public class OfficeController {

	@Autowired
	private OfficeService officeService;

	/**
	 * 根据父节点获取相应的组织节点及人员信息
	 * 
	 * @author JunLin.Yang
	 * @param id 组织父节点
	 * @param authentication
	 * @return
	 */
	@RequestMapping(value = "/{id}/searchUnderOfficesAndClerks", method = RequestMethod.GET)
	public ResponseEntity<List<TreeNode<Object>>>  searchUnderOfficesAndClerksForTree(@PathVariable("id") String id,
			Authentication authentication) {
		CustomUser customUser = (CustomUser) authentication.getPrincipal();
		String parentId;
		if("ALL".equalsIgnoreCase(id)){
			//如果参数值为查询所有
			parentId = customUser.getClerk().getBusinessId();
		}else{
			parentId = id;
		}
		
		List<TreeNode<Object>> list = this.officeService.selectOfficesAndClerksForTree(
				customUser.getClerk().getBusinessId(), parentId);

		return ResponseEntity.status(HttpStatus.OK).body(list);

	}

}

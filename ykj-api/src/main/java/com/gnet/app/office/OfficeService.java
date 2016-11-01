package com.gnet.app.office;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.gnet.app.clerk.Clerk;
import com.gnet.app.clerk.ClerkCondition;
import com.gnet.app.clerk.ClerkMapper;
import com.gnet.utils.model.TreeNode;

@Service
@Transactional(readOnly = true)
public class OfficeService {

	@Autowired
	private OfficeMapper officeMapper;
	
	@Autowired
	private ClerkMapper clerkMapper;

	/**
	 * 商家或门店下是否有部门
	 * @param id
	 * @return
	 */
	public boolean existRelation(String id) {
		return officeMapper.existRelation(id) > 0;
	}
	
	/**
	 * 根据商家ID和上级组织ID查询所属的组织及人员信息，并封装成树节点返回
	 * @author JunLin.Yang
	 * @param businessId 商家ID
	 * @param parentId 上层节点组织ID
	 * @return 组织及人员的树节点信息
	 */
	public List<TreeNode<Object>> selectOfficesAndClerksForTree(String businessId,String parentId){
		List<TreeNode<Object>> nodeList = new LinkedList<TreeNode<Object>>();
		TreeNode<Object> treeNode = null;
		

		ClerkCondition clerkCondition = new ClerkCondition();
		clerkCondition.setBusinessId(businessId);
		clerkCondition.setOfficeId(parentId);
		clerkCondition.setIsDel(false);
		List<Clerk> clerkList = this.clerkMapper.selectClearksByCondition(clerkCondition);
		if(!CollectionUtils.isEmpty(clerkList)){
			for(Clerk clerk : clerkList){
				treeNode = new TreeNode<Object>();
				treeNode.setKey(clerk.getId());
				treeNode.setName(clerk.getName());
				treeNode.setLeaf(true);
				treeNode.setData(clerk);
				nodeList.add(treeNode);
			}
		}
		
		OfficeCondition officeCondition = new OfficeCondition();
		officeCondition.setIsDel(false);
		officeCondition.setParentId(parentId);
		List<Office> officeList = this.officeMapper.selectOfficesByCondition(officeCondition);
		if(!CollectionUtils.isEmpty(officeList)){
			for(Office office : officeList){
				treeNode = new TreeNode<Object>();
				treeNode.setKey(office.getId());
				treeNode.setName(office.getName());
				treeNode.setLeaf(false);
				treeNode.setData(office);
				treeNode.setChildren(this.selectOfficesAndClerksForTree(businessId, office.getId()));
				nodeList.add(treeNode);
				
			}
		}
		
		return nodeList;
	}
}

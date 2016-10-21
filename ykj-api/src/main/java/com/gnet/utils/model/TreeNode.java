package com.gnet.utils.model;

public class TreeNode implements java.io.Serializable{

	/**
	 * 名称
	 */
	private String name;
	
	/**
	 * ID
	 */
	private String id;
	
	/**
	 * 父ID
	 */
	private String pId;
	
	/**
	 * 是否为叶子节点
	 */
	private boolean isLeaf ;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getpId() {
		return pId;
	}

	public void setpId(String pId) {
		this.pId = pId;
	}

	public boolean isLeaf() {
		return isLeaf;
	}

	public void setLeaf(boolean isLeaf) {
		this.isLeaf = isLeaf;
	}
	
	
	
}

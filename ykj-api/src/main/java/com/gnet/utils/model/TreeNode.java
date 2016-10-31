package com.gnet.utils.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class TreeNode<T> implements java.io.Serializable{

	/**
	 * 名称
	 */
	private String name;
	
	/**
	 * 键值标识
	 */
	private String key;
	
	/**
	 * 数据元素
	 */
	private T data;
	
	/**
	 * 是否为叶子节点
	 */
	private boolean leaf ;
	
	private List<TreeNode<T>> children;
	
}

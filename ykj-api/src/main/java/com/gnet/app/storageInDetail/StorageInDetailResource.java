package com.gnet.app.storageInDetail;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

public class StorageInDetailResource extends Resource<StorageInDetail> {

	public StorageInDetailResource(StorageInDetail content, Iterable<Link> links) {
		super(content, links);
	}

	public StorageInDetailResource(StorageInDetail content, Link... links) {
		super(content, links);
	}
	
}
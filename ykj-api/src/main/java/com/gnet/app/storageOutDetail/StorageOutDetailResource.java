package com.gnet.app.storageOutDetail;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

public class StorageOutDetailResource extends Resource<StorageOutDetail> {

	public StorageOutDetailResource(StorageOutDetail content, Iterable<Link> links) {
		super(content, links);
	}

	public StorageOutDetailResource(StorageOutDetail content, Link... links) {
		super(content, links);
	}
	
}
package com.gnet.app.storageOut;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

public class StorageOutResource extends Resource<StorageOut> {

	public StorageOutResource(StorageOut content, Iterable<Link> links) {
		super(content, links);
	}

	public StorageOutResource(StorageOut content, Link... links) {
		super(content, links);
	}
	
}
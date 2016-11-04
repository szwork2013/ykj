package com.gnet.app.storageIn;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

public class StorageInResource extends Resource<StorageIn> {

	public StorageInResource(StorageIn content, Iterable<Link> links) {
		super(content, links);
	}

	public StorageInResource(StorageIn content, Link... links) {
		super(content, links);
	}
	
}
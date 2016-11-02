package com.gnet.app.good;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

public class StorageGoodStatusDetailResource extends Resource<StorageGoodStatusDetail> {

	public StorageGoodStatusDetailResource(StorageGoodStatusDetail content, Iterable<Link> links) {
		super(content, links);
	}

	public StorageGoodStatusDetailResource(StorageGoodStatusDetail content, Link... links) {
		super(content, links);
	}
	
}
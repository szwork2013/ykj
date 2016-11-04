package com.gnet.app.good;

import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;

public class StorageGoodStatusDetailResourceAssembler
		implements ResourceAssembler<StorageGoodStatusDetail, StorageGoodStatusDetailResource> {

	@Override
	public StorageGoodStatusDetailResource toResource(StorageGoodStatusDetail entity) {
		StorageGoodStatusDetailResource resource = new StorageGoodStatusDetailResource(entity);
		return resource;
	}

}
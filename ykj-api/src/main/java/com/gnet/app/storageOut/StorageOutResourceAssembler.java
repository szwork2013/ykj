package com.gnet.app.storageOut;

import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;

public class StorageOutResourceAssembler implements ResourceAssembler<StorageOut, StorageOutResource> {

	@Override
	public StorageOutResource toResource(StorageOut entity) {
	  StorageOutResource resource = new StorageOutResource(entity);
		resource.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(StorageOutController.class).getStorageOut(entity.getId())).withSelfRel());
		return resource;
	}
	
}
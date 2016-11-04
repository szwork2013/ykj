package com.gnet.app.storageIn;

import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;

public class StorageInResourceAssembler implements ResourceAssembler<StorageIn, StorageInResource> {

	@Override
	public StorageInResource toResource(StorageIn entity) {
	  StorageInResource resource = new StorageInResource(entity);
		resource.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(StorageInController.class).getStorageIn(entity.getId())).withSelfRel());
		return resource;
	}
	
}
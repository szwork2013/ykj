package com.gnet.app.storageInDetail;

import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;

public class StorageInDetailResourceAssembler implements ResourceAssembler<StorageInDetail, StorageInDetailResource> {

	@Override
	public StorageInDetailResource toResource(StorageInDetail entity) {
	  StorageInDetailResource resource = new StorageInDetailResource(entity);
		resource.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(StorageInDetailController.class).getStorageInDetail(entity.getId())).withSelfRel());
		return resource;
	}
	
}
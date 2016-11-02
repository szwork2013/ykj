package com.gnet.app.storageOutDetail;

import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;

public class StorageOutDetailResourceAssembler implements ResourceAssembler<StorageOutDetail, StorageOutDetailResource> {

	@Override
	public StorageOutDetailResource toResource(StorageOutDetail entity) {
	  StorageOutDetailResource resource = new StorageOutDetailResource(entity);
		resource.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(StorageOutDetailController.class).getStorageOutDetail(entity.getId())).withSelfRel());
		return resource;
	}
	
}
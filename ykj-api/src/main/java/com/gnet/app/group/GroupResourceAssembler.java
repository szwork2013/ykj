package com.gnet.app.group;

import com.gnet.app.customer.CustomerController;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;

/**
 * Created by yaoping on 16/10/24.
 */
public class GroupResourceAssembler implements ResourceAssembler<Group, GroupResource> {
    @Override
    public GroupResource toResource(Group entity) {
        GroupResource groupResource = new GroupResource(entity);
        groupResource.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(CustomerController.class).getCustomer(entity.getId())).withSelfRel());
        return groupResource;
    }
}

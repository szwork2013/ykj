package com.gnet.app.customerGroup;

import com.gnet.app.customer.CustomerController;
import com.gnet.app.group.GroupResource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;

/**
 * Created by yaoping on 16/10/27.
 */
public class CustomerGroupAssembler implements ResourceAssembler<CustomerGroup, CustomerGroupResource> {
    @Override
    public CustomerGroupResource toResource(CustomerGroup entity) {
        CustomerGroupResource customerGroupResource = new CustomerGroupResource(entity);
        customerGroupResource.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(CustomerGroupController.class).getCustomerGroup(entity.getId())).withSelfRel());
        return customerGroupResource;
    }
}



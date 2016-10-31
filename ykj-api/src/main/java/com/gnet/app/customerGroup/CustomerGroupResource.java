package com.gnet.app.customerGroup;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

/**
 * Created by yaoping on 16/10/27.
 */
public class CustomerGroupResource extends Resource<CustomerGroup> {
    public CustomerGroupResource(CustomerGroup content, Link... links) {
        super(content, links);
    }

    public CustomerGroupResource(CustomerGroup content, Iterable<Link> links) {
        super(content, links);
    }
}

package com.gnet.app.group;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

/**
 * Created by yaoping on 16/10/24.
 */
public class GroupResource extends Resource<Group> {
    public GroupResource(Group content, Link... links) {
        super(content, links);
    }

    public GroupResource(Group content, Iterable<Link> links) {
        super(content, links);
    }
}

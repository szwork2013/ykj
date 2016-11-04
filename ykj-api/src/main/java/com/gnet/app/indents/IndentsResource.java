package com.gnet.app.indents;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

/**
 * Created by yaoping on 16/11/3.
 */
public class IndentsResource extends Resource<Indents> {
    public IndentsResource(Indents content, Link... links) {
        super(content, links);
    }

    public IndentsResource(Indents content, Iterable<Link> links) {
        super(content, links);
    }
}

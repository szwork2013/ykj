package com.gnet.app.indents;

import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;

/**
 * Created by yaoping on 16/11/3.
 */
public class IndentsResourceAssembler implements ResourceAssembler<Indents, IndentsResource> {
    @Override
    public IndentsResource toResource(Indents entity) {
        IndentsResource indentsResource = new IndentsResource(entity);
        indentsResource.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(IndentsController.class).getIndents(entity.getId())).withSelfRel());
        return indentsResource;
    }
}

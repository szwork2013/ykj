package com.gnet.app.group;

import com.gnet.app.customer.CustomerErrorBuilder;
import com.gnet.app.customer.CustomerOrderType;
import com.gnet.utils.sort.ParamSceneUtils;
import com.gnet.utils.sort.exception.NotFoundOrderDirectionException;
import com.gnet.utils.sort.exception.NotFoundOrderPropertyException;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryLinksResource;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * Created by yaoping on 16/10/23.
 */
@RepositoryRestController
@ExposesResourceFor(Group.class)
@RequestMapping("/api/customers/group")
public class GroupController implements ResourceProcessor<RepositoryLinksResource> {

    @Autowired
    private GroupService groupService;
    @Autowired
    private PagedResourcesAssembler<Group> pagedResourcesAssembler;


    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getGroups(
            @PageableDefault Pageable pageable,
            Authentication authentication

    ) {
        return SearchGroups(pageable, null, null, authentication);
    }

    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public ResponseEntity<?> SearchGroups(
            @PageableDefault Pageable pageable,
            @Param("name") String name,
            @Param("phone") String phone,
            Authentication authentication
    ){
        //排序处理
        List<String> orderList = null;

        try {
            orderList = ParamSceneUtils.toOrder(pageable, CustomerOrderType.class);
        } catch (NotFoundOrderPropertyException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomerErrorBuilder(CustomerErrorBuilder.ERROR_SORT_PROPERTY_NOTFOUND, "排序字段不符合要求").build());
        } catch (NotFoundOrderDirectionException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomerErrorBuilder(CustomerErrorBuilder.ERROR_SORT_DIRECTION_NOTFOUND, "排序方向不符合要求").build());
        }

        Page<Group> groups = null;

        groups = groupService.pagination(pageable, orderList,  name, phone);


        GroupResourceAssembler groupResourceAssembler = new GroupResourceAssembler();
        PagedResources<GroupResource> pagedResources = pagedResourcesAssembler.toResource(groups, groupResourceAssembler);

        return ResponseEntity.ok(pagedResources);

    }


    @Override
    public RepositoryLinksResource process(RepositoryLinksResource resource) {
        resource.add(ControllerLinkBuilder.linkTo(GroupController.class).withRel("customers/group"));
        return resource;
    }
}

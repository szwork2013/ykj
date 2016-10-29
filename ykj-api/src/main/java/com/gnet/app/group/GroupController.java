package com.gnet.app.group;

import com.alibaba.fastjson.JSONObject;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Date;
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
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(build("20000", "排序字段不符合要求"));
        } catch (NotFoundOrderDirectionException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(build("20001", "排序方向不符合要求"));
        }

        Page<Group> groups = null;

        groups = groupService.pagination(pageable, orderList,  name, phone);


        GroupResourceAssembler groupResourceAssembler = new GroupResourceAssembler();
        PagedResources<GroupResource> pagedResources = pagedResourcesAssembler.toResource(groups, groupResourceAssembler);

        return ResponseEntity.ok(pagedResources);

    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getGroup(
            @PathVariable("id") String id
    ){
        Group group =groupService.findById(id);
        if (group == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(build("20002", "信息为空"));
        }

        GroupResourceAssembler groupResourceAssembler = new GroupResourceAssembler();
        GroupResource groupResource = groupResourceAssembler.toResource(group);

        return ResponseEntity.ok(groupResource);
    }

    @RequestMapping(value = "add", method = RequestMethod.POST)
    public ResponseEntity<?> createGroup(
            @RequestBody Group group
    ) {

        Date date = new Date();
        group.setCreateDate(date);
        group.setModifyDate(date);


        Boolean result = groupService.create(group);
        if (result) {
            return ResponseEntity.created(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(GroupController.class).getGroup(group.getId())).toUri()).build();
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(build("20003","创建错误"));
    }
    public JSONObject build(String code , String msg) {
        JSONObject result = new JSONObject();
        result.put("code", code);
        result.put("message", msg);
        return result;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateGroup(
            @PathVariable("id") String id,
            @RequestBody Group group
    ){
        Group oldGroup =groupService.findById(id);
        if(oldGroup == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(build("20002", "信息为空"));
        }

        Date date = new Date();
        group.setModifyDate(date);
        group.setId(id);

        Boolean result =  groupService.update(group);

        if(result) {
            return ResponseEntity.noContent().location(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(GroupController.class).getGroup(id)).toUri()).build();
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(build("20004", "更新错误"));

    }


    @Override
    public RepositoryLinksResource process(RepositoryLinksResource resource) {
        resource.add(ControllerLinkBuilder.linkTo(GroupController.class).withRel("customers/group"));
        return resource;
    }
}

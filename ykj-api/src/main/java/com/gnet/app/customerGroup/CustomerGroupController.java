package com.gnet.app.customerGroup;

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
 * Created by yaoping on 16/10/27.
 */
@RepositoryRestController
@ExposesResourceFor(CustomerGroup.class)
@RequestMapping(value = "/api/customers/groupon")
public class CustomerGroupController implements ResourceProcessor<RepositoryLinksResource> {

    @Autowired
    private CustomerGroupService customerGroupService;
    @Autowired
    private PagedResourcesAssembler<CustomerGroup> pagedResourcesAssembler;

    @Override
    public RepositoryLinksResource process(RepositoryLinksResource resource) {
        resource.add(ControllerLinkBuilder.linkTo(CustomerGroupController.class).withRel("customers/groupon"));
        return resource;
    }

    public JSONObject build(String code , String msg) {
        JSONObject result = new JSONObject();
        result.put("code", code);
        result.put("message", msg);
        return result;
    }

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

        Page<CustomerGroup> customerGroups = null;

        customerGroups = customerGroupService.pagination(pageable, orderList,  name, phone);


        CustomerGroupAssembler customerGroupAssembler = new CustomerGroupAssembler();
        PagedResources<CustomerGroupResource> pagedResources = pagedResourcesAssembler.toResource(customerGroups, customerGroupAssembler);

        return ResponseEntity.ok(pagedResources);

    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getCustomerGroup(
            @PathVariable("id") String id
    ){
        CustomerGroup customerGroup =customerGroupService.findDetailById(id);
        if (customerGroup == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(build("10003", "信息为空"));
        }

        CustomerGroupAssembler customerGroupAssembler = new CustomerGroupAssembler();
        CustomerGroupResource customerGroupResource = customerGroupAssembler.toResource(customerGroup);

        return ResponseEntity.ok(customerGroupResource);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateGroup(
            @PathVariable("id") String id,
            @RequestBody CustomerGroup customerGroup
    ){
        CustomerGroup oldCustomerGroup =customerGroupService.findById(id);
        if(oldCustomerGroup == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(build("20002", "信息为空"));
        }

        Date date = new Date();
        customerGroup.setModifyDate(date);
        customerGroup.setId(id);
        customerGroup.setCreateDate(oldCustomerGroup.getCreateDate());
        customerGroup.setCustomerId(oldCustomerGroup.getCustomerId());


        Boolean result =  customerGroupService.update(customerGroup);

        if(result) {
            return ResponseEntity.noContent().location(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(CustomerGroupController.class).getCustomerGroup(id)).toUri()).build();
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(build("20004", "更新错误"));

    }

}

package com.gnet.app.indents;

import com.alibaba.fastjson.JSONObject;
import com.gnet.resource.boolResource.BooleanResourceAssembler;
import com.gnet.utils.sort.ParamSceneUtils;
import com.gnet.utils.sort.exception.NotFoundOrderDirectionException;
import com.gnet.utils.sort.exception.NotFoundOrderPropertyException;
import org.apache.commons.lang3.StringUtils;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * Created by yaoping on 16/11/3.
 */
@RepositoryRestController
@ExposesResourceFor(Indents.class)
@RequestMapping("/api/indents")
public class IndentsController implements ResourceProcessor<RepositoryLinksResource>
{
    @Override
    public RepositoryLinksResource process(RepositoryLinksResource resource) {
        resource.add(ControllerLinkBuilder.linkTo(IndentsController.class).withRel("indents"));
        return resource;
    }

    public JSONObject build(String code , String msg) {
        JSONObject result = new JSONObject();
        result.put("code", code);
        result.put("message", msg);
        return result;
    }

    @Autowired
    private IndentsService indentsService;
    @Autowired
    private PagedResourcesAssembler<Indents> pagedResourcesAssembler;



    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getIndents(
            @PageableDefault Pageable pageable,
            Authentication authentication

    ) {
        return SearchIndents(pageable, null, null, authentication);
    }

    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public ResponseEntity<?> SearchIndents(
            @PageableDefault Pageable pageable,
            @Param("name") String name,
            @Param("phone") String phone,
            Authentication authentication
    ){
        //排序处理
        List<String> orderList = null;

        try {
            orderList = ParamSceneUtils.toOrder(pageable, IndentsOrderType.class);
        } catch (NotFoundOrderPropertyException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(build("20000", "排序字段不符合要求"));
        } catch (NotFoundOrderDirectionException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(build("20001", "排序方向不符合要求"));
        }

        Page<Indents> indentses = null;

        indentses = indentsService.pagination(pageable, orderList,  name, phone);


        IndentsResourceAssembler indentsResourceAssembler = new IndentsResourceAssembler();
        PagedResources<IndentsResource> pagedResources = pagedResourcesAssembler.toResource(indentses, indentsResourceAssembler);

        return ResponseEntity.ok(pagedResources);

    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getIndents(
            @PathVariable("id") String id
    ){
        Indents indents =indentsService.findById(id);
        if (indents == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(build("10003", "信息为空"));
        }

        IndentsResourceAssembler indentsResourceAssembler = new IndentsResourceAssembler();
        IndentsResource indentsResource = indentsResourceAssembler.toResource(indents);

        return ResponseEntity.ok(indentsResource);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteIndents(
            @PathVariable("id") String id
    ){
//        Map<String, Object> error = SupplierValidator.validateBeforeDeleteSupplier(id);
//        if (error != null) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new SupplierErrorBuilder(Integer.valueOf(error.get("code").toString()), error.get("msg").toString()).build());
//        }
        if (StringUtils.isBlank(id)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(build("00001", "删除缺失标识"));
        }


        if (indentsService.delete(id)) {
            BooleanResourceAssembler booleanResourceAssembler = new BooleanResourceAssembler();
            return ResponseEntity.ok(booleanResourceAssembler.toResource(Boolean.TRUE));
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(build("20001", "删除错误"));
    }

}

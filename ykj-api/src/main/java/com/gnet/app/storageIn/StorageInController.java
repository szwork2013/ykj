package com.gnet.app.storageIn;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.hateoas.Resources;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.gnet.resource.listResource.ListResourcesAssembler;
import com.gnet.security.user.CustomUser;

@RepositoryRestController
@ExposesResourceFor(StorageIn.class)
@RequestMapping("/api/storageIns")
public class StorageInController {

  @Autowired
  private StorageInService storageInService;

  @Autowired
  private PagedResourcesAssembler<StorageIn> pagedResourcesAssembler;

  @Autowired
  private ListResourcesAssembler<StorageIn> listResourcesAssembler;

  /**
   * 根据ID获取响应的出入单明细信息
   * @param id
   * @param authentication
   * @return
   * ResponseEntity<?>
   */
  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public ResponseEntity<?> getStorageIn(@PathVariable("id") String id) {
    StorageIn storageIn = storageInService.getStorageIn(id);
    if (null == storageIn) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(new StorageInErrorBuilder(StorageInErrorBuilder.ERROR_STORAGEIN_NULL, "找不到该出入单信息").build());
    }

    StorageInResourceAssembler storageInResourceAssembler = new StorageInResourceAssembler();
    StorageInResource storageInResource = storageInResourceAssembler.toResource(storageIn);

    return ResponseEntity.ok(storageInResource);
  }

  /**
   * 入库单历史信息搜索
   * @param pageable
   * @param isAll
   * @param condition
   * @param authentication
   * @return
   * ResponseEntity<?>
   */
  @RequestMapping(value = "/searchHistory", method = RequestMethod.GET)
  public ResponseEntity<?> searchHistory(@PageableDefault Pageable pageable,
      @RequestParam(name = "isall", required = false) Boolean isAll, StorageInCondition condition,
      Authentication authentication) {
    CustomUser customUser = (CustomUser) authentication.getPrincipal();
    // 判断是否分页
    Resources<StorageInResource> resources = null;

    if (isAll != null && isAll) {
      List<StorageIn> storageInList = this.storageInService.selectStorageInHistoryDataList(customUser.getClerk(),
          condition);
      resources = listResourcesAssembler.toResource(storageInList, new StorageInResourceAssembler());
    } else {
      Page<StorageIn> storageInPageResult = this.storageInService
          .paginationStorageInHistoryDataList(customUser.getClerk(), condition, pageable);
      resources = pagedResourcesAssembler.toResource(storageInPageResult, new StorageInResourceAssembler());
    }

    return ResponseEntity.ok(resources);
  }

  /**
   * 新增出入库信息
   * @param storageIn
   * @param authentication
   * @return
   * ResponseEntity<?>
   */
  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<?> createStorageIn(@RequestBody StorageIn storageIn, Authentication authentication) {

    CustomUser customUser = (CustomUser) authentication.getPrincipal();

    Map<String, Object> error = StorageInValidator.validateBeforeCreateStorageIn(storageIn);
    if (error != null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
          new StorageInErrorBuilder(Integer.valueOf(error.get("code").toString()), error.get("msg").toString()).build());
    }
    Boolean result = this.storageInService.create(customUser.getClerk(), storageIn);
    if (result) {
      return ResponseEntity.created(ControllerLinkBuilder
          .linkTo(ControllerLinkBuilder.methodOn(StorageInController.class).getStorageIn(storageIn.getId())).toUri())
          .build();
    }

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new StorageInErrorBuilder(StorageInErrorBuilder.ERROR_CREATED, "创建错误").build());
  }

}

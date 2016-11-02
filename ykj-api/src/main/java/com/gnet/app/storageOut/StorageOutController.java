package com.gnet.app.storageOut;

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
@ExposesResourceFor(StorageOut.class)
@RequestMapping("/api/storageOuts")
public class StorageOutController {

  @Autowired
  private StorageOutService storageOutService;

  @Autowired
  private PagedResourcesAssembler<StorageOut> pagedResourcesAssembler;

  @Autowired
  private ListResourcesAssembler<StorageOut> listResourcesAssembler;

  /**
   * 根据ID获取响应的出入单明细信息
   * @param id
   * @param authentication
   * @return
   * ResponseEntity<?>
   */
  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public ResponseEntity<?> getStorageOut(@PathVariable("id") String id) {
    StorageOut storageOut = storageOutService.getStorageOut(id);
    if (null == storageOut) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(new StorageOutErrorBuilder(StorageOutErrorBuilder.ERROR_STORAGEOUT_NULL, "找不到该出库单信息").build());
    }

    StorageOutResourceAssembler storageOutResourceAssembler = new StorageOutResourceAssembler();
    StorageOutResource storageOutResource = storageOutResourceAssembler.toResource(storageOut);

    return ResponseEntity.ok(storageOutResource);
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
      @RequestParam(name = "isall", required = false) Boolean isAll, StorageOutCondition condition,
      Authentication authentication) {
    CustomUser customUser = (CustomUser) authentication.getPrincipal();
    // 判断是否分页
    Resources<StorageOutResource> resources = null;

    if (isAll != null && isAll) {
      List<StorageOut> storageOutList = this.storageOutService.selectStorageOutHistoryDataList(customUser.getClerk(),
          condition);
      resources = listResourcesAssembler.toResource(storageOutList, new StorageOutResourceAssembler());
    } else {
      Page<StorageOut> storageOutPageResult = this.storageOutService
          .paginationStorageOutHistoryDataList(customUser.getClerk(), condition, pageable);
      resources = pagedResourcesAssembler.toResource(storageOutPageResult, new StorageOutResourceAssembler());
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
  public ResponseEntity<?> createStorageOut(@RequestBody StorageOut storageOut, Authentication authentication) {

    CustomUser customUser = (CustomUser) authentication.getPrincipal();

    Map<String, Object> error = StorageOutValidator.validateBeforeCreateStorageOut(storageOut);
    if (error != null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new StorageOutErrorBuilder(Integer.valueOf(error.get("code").toString()), error.get("msg").toString())
              .build());
    }
    Boolean result = this.storageOutService.create(customUser.getClerk(), storageOut);
    if (result) {
      return ResponseEntity.created(ControllerLinkBuilder
          .linkTo(ControllerLinkBuilder.methodOn(StorageOutController.class).getStorageOut(storageOut.getId())).toUri())
          .build();
    }

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new StorageOutErrorBuilder(StorageOutErrorBuilder.ERROR_CREATED, "创建错误").build());
  }

}

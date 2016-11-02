package com.gnet.app.storageOutDetail;

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
@ExposesResourceFor(StorageOutDetail.class)
@RequestMapping("/api/storageOutDetails")
public class StorageOutDetailController {

  @Autowired
  private StorageOutDetailService storageOutDetailService;

  @Autowired
  private PagedResourcesAssembler<StorageOutDetail> pagedResourcesAssembler;

  @Autowired
  private ListResourcesAssembler<StorageOutDetail> listResourcesAssembler;

  /**
   * 根据ID获取响应的出库单明细信息
   * @param id
   * @param authentication
   * @return
   * ResponseEntity<?>
   */
  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public ResponseEntity<?> getStorageOutDetail(@PathVariable("id") String id) {
    StorageOutDetail storageOutDetail = storageOutDetailService.getStorageOutDetail(id);
    if (null != storageOutDetail) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
          new StorageOutDetailErrorBuilder(StorageOutDetailErrorBuilder.ERROR_STORAGEOUTDETAIL_NULL, "找不到该出入库明细信息")
              .build());
    }

    StorageOutDetailResourceAssembler storageOutDetailResourceAssembler = new StorageOutDetailResourceAssembler();
    StorageOutDetailResource storageOutDetailResource = storageOutDetailResourceAssembler.toResource(storageOutDetail);

    return ResponseEntity.ok(storageOutDetailResource);
  }

  /**
   * 入库明细信息搜索
   * @param pageable
   * @param isAll
   * @param condition
   * @param authentication
   * @return
   * ResponseEntity<?>
   */
  @RequestMapping(value = "/search", method = RequestMethod.GET)
  public ResponseEntity<?> search(@PageableDefault Pageable pageable,
      @RequestParam(name = "isall", required = false) Boolean isAll,
      StorageOutDetailCondition condition, Authentication authentication) {
    CustomUser customUser = (CustomUser) authentication.getPrincipal();
    // 判断是否分页
    Resources<StorageOutDetailResource> resources = null;

    if (isAll != null && isAll) {
      List<StorageOutDetail> storageOutDetailList = this.storageOutDetailService
          .selectStorageOutDetailListByCondition(condition);
      resources = listResourcesAssembler.toResource(storageOutDetailList, new StorageOutDetailResourceAssembler());
    } else {
      Page<StorageOutDetail> storageOutDetailPageResult = this.storageOutDetailService
          .paginationStorageOutDetailListByCondition(condition, pageable);
      resources = pagedResourcesAssembler.toResource(storageOutDetailPageResult,
          new StorageOutDetailResourceAssembler());
    }

    return ResponseEntity.ok(resources);
  }

}

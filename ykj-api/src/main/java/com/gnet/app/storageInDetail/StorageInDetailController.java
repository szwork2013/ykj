package com.gnet.app.storageInDetail;

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
@ExposesResourceFor(StorageInDetail.class)
@RequestMapping("/api/storageInDetails")
public class StorageInDetailController {

  @Autowired
  private StorageInDetailService storageInDetailService;

  @Autowired
  private PagedResourcesAssembler<StorageInDetail> pagedResourcesAssembler;

  @Autowired
  private ListResourcesAssembler<StorageInDetail> listResourcesAssembler;

  /**
   * 根据ID获取响应的出入单明细信息
   * @param id
   * @param authentication
   * @return
   * ResponseEntity<?>
   */
  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public ResponseEntity<?> getStorageInDetail(@PathVariable("id") String id) {
    StorageInDetail storageInDetail = storageInDetailService.getStorageInDetail(id);
    if (null != storageInDetail) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(new StorageInDetailErrorBuilder(StorageInDetailErrorBuilder.ERROR_STORAGEINDETAIL_NULL, "找不到该出入库明细信息")
              .build());
    }

    StorageInDetailResourceAssembler storageInDetailResourceAssembler = new StorageInDetailResourceAssembler();
    StorageInDetailResource storageInDetailResource = storageInDetailResourceAssembler.toResource(storageInDetail);

    return ResponseEntity.ok(storageInDetailResource);
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
  @RequestMapping(value = "/searchByStorageInId", method = RequestMethod.GET)
  public ResponseEntity<?> search(@PageableDefault Pageable pageable,
      @RequestParam(name = "isall", required = false) Boolean isAll,
      @RequestParam(name = "isall", required = true) String storageInId, Authentication authentication) {
    CustomUser customUser = (CustomUser) authentication.getPrincipal();
    // 判断是否分页
    Resources<StorageInDetailResource> resources = null;

    if (isAll != null && isAll) {
      List<StorageInDetail> storageInDetailList = this.storageInDetailService
          .selectStorageInDetailListByStorageInId(storageInId);
      resources = listResourcesAssembler.toResource(storageInDetailList, new StorageInDetailResourceAssembler());
    } else {
      Page<StorageInDetail> storageInPageResult = this.storageInDetailService
          .paginationStorageInDetailListByStorageInId(storageInId, pageable);
      resources = pagedResourcesAssembler.toResource(storageInPageResult, new StorageInDetailResourceAssembler());
    }

    return ResponseEntity.ok(resources);
  }

}

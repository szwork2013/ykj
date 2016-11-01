package com.gnet.app.orderServiceAttachment;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryLinksResource;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.hateoas.Resources;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.gnet.app.orderService.OrderServiceErrorBuilder;
import com.gnet.resource.boolResource.BooleanResourceAssembler;
import com.gnet.resource.listResource.ListResourcesAssembler;
import com.gnet.security.user.CustomUser;
import com.gnet.upload.FileUploadService;
import com.gnet.utils.download.DownResponseBuilder;
import com.gnet.utils.spring.SpringContextHolder;

@RepositoryRestController
@ExposesResourceFor(OrderServiceAttachment.class)
@RequestMapping("/api/orderServiceAttachments")
public class OrderServiceAttachmentController implements ResourceProcessor<RepositoryLinksResource> {

	@Autowired
	private OrderServiceAttachmentService orderServiceAttachmentService;

	@Autowired
	private PagedResourcesAssembler<OrderServiceAttachment> pagedResourcesAssembler;
	@Autowired
	private ListResourcesAssembler<OrderServiceAttachment> listResourcesAssembler;

	/**
	 * 附件详情
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getAttachment(@PathVariable("id") String id) {
		OrderServiceAttachment orderServiceAttachment = orderServiceAttachmentService.findById(id);
		if (orderServiceAttachment == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new OrderServiceAttachmentErrorBuilder(
							OrderServiceAttachmentErrorBuilder.ERROR_ORDERSERVICEATTACHMENT_NULL, "找不到该订单服务附件表")
									.build());
		}

		OrderServiceAttachmentResourceAssembler orderServiceAttachmentResourceAssembler = new OrderServiceAttachmentResourceAssembler();
		OrderServiceAttachmentResource orderServiceAttachmentResource = orderServiceAttachmentResourceAssembler
				.toResource(orderServiceAttachment);

		return ResponseEntity.ok(orderServiceAttachmentResource);
	}

	/**
	 * 上传附件
	 * 
	 * @param fileType
	 * @param file
	 * @param authentication
	 * @return
	 */
	@RequestMapping(path = "/{orderServiceId}/upload", method = RequestMethod.POST)
	public ResponseEntity<?> uploadAttachment(@PathVariable("orderServiceId") String orderServiceId,
			@RequestParam("file") MultipartFile file, Authentication authentication) {
		CustomUser customUser = (CustomUser) authentication.getPrincipal();
		if (file == null) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN)
					.body(new OrderServiceErrorBuilder(OrderServiceErrorBuilder.ERROR_UPLOAD, "未获得上传文件").build());
		}

		String fileType = file.getOriginalFilename()
				.substring(file.getOriginalFilename().lastIndexOf('.')+1, file.getOriginalFilename().length())
				.toLowerCase();
		FileUploadService fileUploadService = SpringContextHolder.getBean(FileUploadService.class);
		Resource uploadResource = fileUploadService.getResourceWithoutFileType(file,fileType);
		if (uploadResource == null) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new OrderServiceErrorBuilder(OrderServiceErrorBuilder.ERROR_UPLOAD, "上传失败").build());
		}

		String path = null;
		try {
			path = uploadResource.getFile().getPath();
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new OrderServiceErrorBuilder(OrderServiceErrorBuilder.ERROR_UPLOAD, "上传失败").build());
		}

		Date date = new Date();
		OrderServiceAttachment attachment = new OrderServiceAttachment();
		attachment.setCreateDate(date);
		attachment.setModifyDate(date);
		attachment.setAttachmentRoot(fileUploadService.getRelativePath(path));
		attachment.setAttachmentSize(String.valueOf(file.getSize()));
		attachment.setAttachmentFilename(file.getOriginalFilename());
		attachment.setUploadDate(date);
		attachment.setUploadPersonId(customUser.getClerk().getId());
		attachment.setAttachmentSource(1);
		attachment.setServiceId(orderServiceId);
		attachment.setAttachmentSuffix(fileType);

		Boolean result = orderServiceAttachmentService.create(attachment);
		if (result) {
			return ResponseEntity.created(ControllerLinkBuilder.linkTo(ControllerLinkBuilder
					.methodOn(OrderServiceAttachmentController.class).getAttachment(attachment.getId())).toUri())
					.build();
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new OrderServiceErrorBuilder(OrderServiceErrorBuilder.ERROR_UPLOAD, "上传失败").build());
	}

	/**
	 * 上传附件
	 * 
	 * @param fileType
	 * @param file
	 * @param authentication
	 * @return
	 */
	@RequestMapping(path = "/{orderServiceId}/list", method = RequestMethod.POST)
	public ResponseEntity<?> searchAttachmentsByOrderServiceId(@PathVariable("orderServiceId") String orderServiceId,
			@PageableDefault Pageable pageable, @RequestParam(name = "isall", required = false) Boolean isAll,
			Authentication authentication) {
		// 判断是否分页
		Resources<OrderServiceAttachmentResource> resources = null;
		if (isAll != null && isAll) {
			List<OrderServiceAttachment> orderServiceAttachmentList = this.orderServiceAttachmentService
					.selectAttachmentsByOrderServiceId(orderServiceId);
			resources = listResourcesAssembler.toResource(orderServiceAttachmentList,
					new OrderServiceAttachmentResourceAssembler());
		} else {
			Page<OrderServiceAttachment> orderServiceAttachmentPage = this.orderServiceAttachmentService
					.paginationAttachmentsByOrderServiceId(orderServiceId, pageable);

			resources = pagedResourcesAssembler.toResource(orderServiceAttachmentPage,
					new OrderServiceAttachmentResourceAssembler());
		}

		return ResponseEntity.ok(resources);

	}

	/**
	 * 删除附件
	 * 
	 * @param fileType
	 * @param file
	 * @param authentication
	 * @return
	 */
	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteAttachment(@PathVariable("id") String id, Authentication authentication) {
		// 判断是否分页
		if (this.orderServiceAttachmentService.delete(id)) {
			BooleanResourceAssembler booleanResourceAssembler = new BooleanResourceAssembler();
			return ResponseEntity.ok(booleanResourceAssembler.toResource(Boolean.TRUE));
		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new OrderServiceErrorBuilder(OrderServiceErrorBuilder.ERROR_DELETED, "删除错误").build());

	}

	/**
	 * 下载附件
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(path = "/{id}/download", method = RequestMethod.GET)
	public ResponseEntity<?> downloadAttachment(@PathVariable("id") String id, HttpServletResponse response) {
		FileUploadService fileUploadService = SpringContextHolder.getBean(FileUploadService.class);
		if (StringUtils.isBlank(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
					new OrderServiceAttachmentErrorBuilder(OrderServiceAttachmentErrorBuilder.ERROR_ID_NULL, "附件编号为空")
							.build());
		}
		OrderServiceAttachment attachment = orderServiceAttachmentService.findById(id);
		FileSystemResource resource = new FileSystemResource(
				fileUploadService.getUploadRootPath() + attachment.getAttachmentRoot());
		try {
			DownResponseBuilder.buildFile(response, resource, attachment.getAttachmentFilename());
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new OrderServiceErrorBuilder(OrderServiceErrorBuilder.ERROR_DOWNLOAD, "下载附件失败").build());
		}

		return ResponseEntity.ok(null);

	}

	@Override
	public RepositoryLinksResource process(RepositoryLinksResource resource) {
		resource.add(ControllerLinkBuilder.linkTo(OrderServiceAttachmentController.class)
				.withRel("orderServiceAttachments"));
		return resource;
	}

}
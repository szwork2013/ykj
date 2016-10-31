import request from '../utils/request';
import querystring from 'querystring';


/**
 * 服务单附件查询
 */
export async function searchOrderServiceAttachment(access_token, orderServiceId) {
  return request(`/api/orderServiceAttachments/${orderServiceId}/list?isall=true`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    }
  })
}


/**
 * 服务单附件上传
 */
export async function uploadOrderServiceAttachment(access_token, uploadOption) {
  const formData = new FormData();
  formData.append('file', uploadOption.file);
  return request(`/api/orderServiceAttachments/${uploadOption.id}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
    body: formData,
  })
}


/**
 * 服务单附件删除
 */
export async function deleteOrderServiceAttachment(access_token, id) {
  return request(`/api/orderServiceAttachments/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  })
}


/**
 * 服务单附件下载
 */
export async function downloadOrderServiceAttachment(access_token, id) {
  return request(`/api/orderServiceAttachments/${id}/download`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  })
}


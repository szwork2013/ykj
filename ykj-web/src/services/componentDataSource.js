import request from '../utils/request';
import querystring from 'querystring';

/**
 * 根据姓名搜索用户信息
 */
export async function searchCustomers(access_token, name) {
	console.log("111"+name)
  return request(`/api/customers/searchCustomersAllByName/${name}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  })
}

/**
 * 根据类型获取词典数据信息
 */
export async function searchCodewordsByType(access_token, query) {
  return request(`/api/codeWords?${querystring.stringify(query)}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  });
}

/**
 * 根据组织父节点获取其下的组织及人员信息
 */
export async function searchSubOfficesAndClerks(access_token, parentId) {
  return request(`/api/offices/${parentId}/searchUnderOfficesAndClerks`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  });
}

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


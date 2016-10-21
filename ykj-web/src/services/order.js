import request from '../utils/request';
import querystring from 'querystring';

export async function root(access_token, query) {
  return request(`/api/orders?${querystring.stringify(query)}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
}

export async function search(access_token, query) {
  console.log(query)
  return request(`/api/orders/search?${querystring.stringify(query)}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
}

export async function view(access_token, id) {
  return request(`/api/orders/${id}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })
}

export async function create(access_token, order) {
  return request(`/api/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order)
  })
}

export async function update(access_token, order) {
  return request(`/api/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order)
  })
}

export async function remove(access_token, id) {
  return request(`/api/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  })
}

export async function removeAll(access_token, ids) {
  return request(`/api/orders`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ids),
  })
}

export async function searchCustomers(access_token, query) {
  return request(`/api/customers/${querystring.stringify(query)}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })
}

export async function finishOrder(access_token, finishOption) {
  return request(`/api/orders/${finishOption.id}/finish_result`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(finishOption)
  })
}

/**
 * 订单审核
 */
export async function auditOrder(access_token, id) {
  return request(`/api/orders/${id}/audit`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })
}

export async function payOrder(access_token, payOption) {
  return request(`/api/orders/${payOption.id}/trade`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payOption)
  })
}

export async function viewGood(access_token, id, goodId) {
  return request(`/api/orders/${id}/goods/${goodId}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })
}

export async function saveFillOrBack(access_token, fillBackRecord) {
  return request(`/api/orders/${fillBackRecord.id}/back_fill_goods`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fillBackRecord)
  })
}

/**
 * 订单上传
 */
export async function uploadOrder(access_token, uploadOption) {
  const formData = new FormData();
  formData.append('orderPicture', uploadOption.orderPicture);
  return request(`/api/orders/${uploadOption.id}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
    body: formData,
  })
}

/**
 * 获取订单最新流程状态
 */
export async function getOrderCurrentProcessStatus(access_token, id) {
  return request(`/api/orders/${id}/currentProcessStatus`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })
}

/**
 * 根据商品型号搜索商品信息
 */
export async function searchGoodsAllByModel(access_token, model) {
  return request(`/api/goods/searchGoodsAllByModel/${model}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  })
}

import request from '../utils/request';
import querystring from 'querystring';


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


export async function search(query, access_token) {
	return request(`/api/goods/search?${querystring.stringify(query)}`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${access_token}`,
			'Content-Type': 'application/json',
		}
	})
}

export async function create(payload, access_token) {
	return request(`/api/goods`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${access_token}`,
			'Content-Type': 'application/json',
		},
	 body: JSON.stringify(payload),
	})
}

export async function update(payload, access_token) {
	return request(`/api/goods/${payload.id}`, {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${access_token}`,
			'Content-Type': 'application/json',
		},
	 body: JSON.stringify(payload),
	})
}


export async function view(access_token, id) {
    return request(`/api/goods/${id}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    })
}

export async function remove(payload, access_token) {
	return request(`/api/goods/${payload}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${access_token}`,
			'Content-Type': 'application/json',
		},
	})
}
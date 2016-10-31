import request from '../utils/request';
import querystring from 'querystring';

export async function search(query, access_token) {
	return request(`/api/customers/groupon/search?${querystring.stringify(query)}`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${access_token}`,
			'Content-Type': 'application/json',
		}
	})
}

export async function create(payload, access_token) {
	return request(`/api/customers/groupon/add`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${access_token}`,
			'Content-Type': 'application/json',
		},
	 body: JSON.stringify(payload),
	})
}

export async function update(payload, access_token) {
	return request(`/api/customers/groupon/${payload.id}`, {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${access_token}`,
			'Content-Type': 'application/json',
		},
	 body: JSON.stringify(payload),
	})
}


export async function view(access_token, id) {
    return request(`/api/customers/groupon/${id}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    })
}
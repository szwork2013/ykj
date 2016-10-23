import request from '../utils/request';
import querystring from 'querystring';

export async function search(query, access_token) {
	return request(`/api/customers/group/search?${querystring.stringify(query)}`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${access_token}`,
			'Content-Type': 'application/json',
		}
	})
}


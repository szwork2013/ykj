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
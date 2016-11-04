import request from '../utils/request';
import querystring from 'querystring';

export async function searchStorageGoodStatusDetails(access_token, query) {
  return request(`/api/goods/searchStorageGoodStatusDetails?${querystring.stringify(query)}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
}
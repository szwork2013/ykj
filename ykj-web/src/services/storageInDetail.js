import request from '../utils/request';
import querystring from 'querystring';

export async function search(access_token, query) {
  return request(`/api/storageInDetails/search?${querystring.stringify(query)}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
}

import request from '../utils/request';
import querystring from 'querystring';

export async function searchHistory(access_token, query) {
  return request(`/api/storageOuts/searchHistory?${querystring.stringify(query)}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
}


export async function getStorageOut(access_token, id) {
  return request(`/api/storageOuts/${id}`, {
      method : 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
}
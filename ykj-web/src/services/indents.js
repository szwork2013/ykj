import request from '../utils/request';
import querystring from 'querystring';

export async function root(access_token, query) {
  return request(`/api/indents?${querystring.stringify(query)}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
}

export async function search(access_token, query) {
  return request(`/api/indents/search?${querystring.stringify(query)}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
}

export async function view(access_token, id) {
  return request(`/api/indents/${id}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })
}

export async function create(access_token, indents) {
  return request(`/api/indents`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(indents)
  })
}

export async function update(access_token, indents) {
  return request(`/api/indents/${indents.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(indents)
  })
}

export async function remove(access_token, id) {
  return request(`/api/indents/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  })
}

export async function removeAll(access_token, ids) {
  return request(`/api/indents`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ids),
  })
}

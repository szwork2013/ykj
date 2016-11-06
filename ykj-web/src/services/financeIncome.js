import request from '../utils/request';
import querystring from 'querystring';

export async function search(access_token, query) {
  return request(`/api/finance_income/search?${querystring.stringify(query)}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
}


export async function getFinanceIncome(access_token, id) {
  return request(`/api/finance_income/${id}`, {
      method : 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
}

export async function createOrUpdateFinanceIncome(access_token, payload) {
  return request(`/api/finance_income`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
}

export async function updateFinanceIncome(access_token, payload) {
  return request(`/api/finance_income/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
}

export async function deleteFinanceIncome(access_token, id) {
  return request(`/api/finance_income/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
}
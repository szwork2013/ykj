import request from '../utils/request';
import querystring from 'querystring';

export async function search(access_token, query) {
  return request(`/api/finance_expense/search?${querystring.stringify(query)}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
}


export async function getFinanceExpense(access_token, id) {
  return request(`/api/finance_expense/${id}`, {
      method : 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
}

export async function createOrUpdateFinanceExpense(access_token, payload) {
  return request(`/api/finance_expense`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
}

export async function updateFinanceExpense(access_token, payload) {
  return request(`/api/finance_expense/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
}

export async function deleteFinanceExpense(access_token, id) {
  return request(`/api/finance_expense/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
}
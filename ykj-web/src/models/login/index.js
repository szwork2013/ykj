import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'login',

  state: {
    username: '',
    password: '',
    loading: false,
  },

  effects: {
    *submit({ payload }, { put }) {
      const resp = yield put({
        type: 'oauth/token',
        payload,
      })
    },
    *loginOut({ payload }, { put }) {
      yield put({
        type: 'oauth/loginOutSuccess',
        payload : {}
      })
      routerRedux.replace('/login');
    }
  },

  reducers: {
    setUsername(state, action) {
      return { ...state, username: action.payload };
    },
    setPassword(state, action) {
      return { ...state, password: action.payload };
    },
  },

}


import request from '../utils/request';
import { searchCustomers  } from '../services/componentDataSource';


export default {
  namespace: 'componentDataSource',

  state: {
    dataSource: {
      "CUSTOMERS" : [{
        id : '1',
        name : '用户A'
      },{
        id : '2',
        name : '用户B'
      }],
      CODEWORDS : {
        "ORDER_SOURCE" : [{
          id : '1',
          name : '同行介绍'
        },{
          id : '2',
          name : '网站'
        }]
      }
    }
  },

  effects: {
    /**
     * 加载客户信息
     */
    *loadCustomersData({ payload }, { put, select }) {
      const access_token = yield select(state => state.oauth.access_token);
      const { data, error } = yield searchCustomers(access_token, payload);
      if (!error) {
        yield put({
          type: 'loadDataSourceSuccess',
          payload: {
            dataSource: {
              CUSTOMERS: data._embedded && data._embedded.customers || []
            }
          },
        })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`加载客户信息失败:${err.status} ${err.message}`, 3);
      return false;
    }
  },


  reducers:{
    /**
      数据源加载成功
      */
    loadDataSourceSuccess(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}

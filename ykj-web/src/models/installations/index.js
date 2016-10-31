
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import request, { parseError } from '../../utils/request';
import { root, search, view, create, update, remove, removeAll, statement, cancelStatement } from '../../services/installation';
import { getOrderDetailForEdit } from '../../services/order';
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';

const mergeQuery = (oldQuery, newQuery) => {
  return {
    ...oldQuery,
    ...newQuery,
  page: (newQuery.page ? newQuery.page - 1 : 0),
  }
}

const initialState = {
  query: {},
  /**
   * 数据集合
   */
  list: [],
  /**
   * 当前操作对象
   */
  currentItem: {},
  pagination: {
    current: 1,
  },
  loading: false,
  submiting: false,
  /**
   * 当前订单号
   */
  currentOrderId: '',
  /**
   * 当前订单
   */
  currentOrder: {},
  /**
   * 位置窗口查看
   */
  positionModalShow: false,
  clerkTreeModalShow: false,
  attachmentModalShow: false,
}

export default {
  namespace: 'installations',

  state: initialState,

  subscriptions: {

    listSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (pathToRegexp('/order/orders/:orderId/installations').test(location.pathname)) {
          const match = pathToRegexp('/order/orders/:orderId/installations').exec(location.pathname);
          const orderId = match[1];
          dispatch({ type: 'clear' })
          dispatch({
            type: 'setQuery',
            payload: {
              orderId : orderId
            }
          });
          dispatch({
            type: 'initOrderInfo',
            payload: {
              orderId: orderId
            },
          });
        }
      });
    },

    itemSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (pathToRegexp('/order/installations/:action+').test(location.pathname)) {
          dispatch({ type: 'clear' })
        }
      })
    },

    editSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (pathToRegexp('/order/installations/:orderId/edit/:installationId').test(location.pathname)) {
          const match = pathToRegexp('/order/installations/:orderId/edit/:installationId').exec(location.pathname);
          const orderId = match[1];
          const installationId = match[2];
          dispatch({
            type: 'view',
            payload: installationId,
          });
          dispatch({
            type: 'initOrderInfo',
            payload: {
              orderId: orderId
            },
          });
        }
      });
    },

    addSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (pathToRegexp('/order/orders/:orderId/installations/add').test(location.pathname)) {
          const match = pathToRegexp('/order/orders/:orderId/installations/add').exec(location.pathname);
          const orderId = match[1];
          dispatch({
            type: 'initOrderInfo',
            payload: {
              orderId: orderId
            },
          });
        }
      });
    }
  },

  effects: {
    setQuery: [function* ({ payload: query }, { put, select }) {
      yield put({
        type: 'toggleLoadding',
        payload: true,
      });

      const { access_token, oldQuery } = yield select(state => {
        return {
          'access_token': state.oauth.access_token,
          'oldQuery': state.installations.query,
        }
      });
      const { data, error } = yield search(access_token, query);

      if (!error) {
        yield put({
          type: 'setMeasures',
          payload: {
            list: data._embedded && data._embedded.orderSers || [],
            pagination: {
              current: data.page && data.page.number + 1,
              total: data.page && data.page.totalElements,
            },
          },
        });

        yield put({
          type: 'toggleLoadding',
          payload: false,
        });

        return true;
      }

      yield put({
        type: 'toggleLoadding',
        payload: false,
      });

      const err = yield parseError(error);
      yield message.error(`加载测量安排失败:${err.status} ${err.message}`, 3);
      return false;
    }, { type: 'takeLatest' }],
    *view({ payload: id }, { put, select }) {
      yield put({
        type: 'toggleLoadding',
        payload: true,
      });

      const { access_token, installations } = yield select(state => {
        return {
          'access_token': state.oauth.access_token,
          'installations': state.installations.installations,
        }
      });
      const { data, error } = yield view(access_token, id);

      if (!error) {
        yield put({
          type: 'setCurrent',
          payload: data,
        })

        yield put({
          type: 'toggleLoadding',
          payload: false,
        });

        return true;
      }

      yield put({
        type: 'toggleLoadding',
        payload: false,
      });

      const err = yield parseError(error);
      yield message.error(`加载测量安排详情失败:${err.status} ${err.message}`, 3);
      return false;
    },
    *add({ payload }, { put, call, select }) {
      yield put({
        type: 'toggleSubmiting',
        payload: true,
      });
      yield put({
        type: 'setCurrent',
        payload,
      });

      const access_token = yield select(state => state.oauth.access_token);
      const { data, error } = yield create(access_token, payload);

      if (!error) {
        yield message.success('创建测量安排信息成功', 2);
        yield put(routerRedux.goBack());
      } else {
        const err = yield parseError(error);
        yield message.error(`创建测量安排信息失败:${err.status} ${err.message}`, 3);
      }

      yield put({
        type: 'toggleSubmiting',
        payload: false,
      });
    },
    *edit({ payload }, { put, select }) {
      yield put({
        type: 'toggleSubmiting',
        payload: true,
      });
      yield put({
        type: 'setCurrent',
        payload,
      });

      const access_token = yield select(state => state.oauth.access_token);
      const { data, error } = yield update(access_token, payload);

      if (!error) {
        yield message.success('更新测量安排信息成功', 2);
        yield put(routerRedux.goBack());
      } else {
        const err = yield parseError(error);
        yield message.error(`更新测量安排信息失败:${err.status} ${err.message}`, 3);
      }

      yield put({
        type: 'toggleSubmiting',
        payload: false,
      });
    },
    *deleteOne({ payload: id }, { put, select }) {
      const { access_token, query } = yield select(state => {
        return {
          access_token: state.oauth.access_token,
          query: state.installations.query,
        }
      });
      const { data, error } = yield remove(access_token, id);

      if (!error) {
        yield message.success('成功删除测量安排', 2);
        yield put({ type: 'setQuery', payload: query })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`删除测量安排失败:${err.status} ${err.message}`, 3);
      return false;
    },
    *statement({ payload: id }, { put, select }) {
      const access_token = yield select(state => state.oauth.access_token);

      const { data, error } = yield statement(access_token, id);

      if (!error) {
        yield message.success('成功确认结算标识', 2);
        yield put({ type: 'setQuery', payload: query })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`确认结算标识失败:${err.status} ${err.message}`, 3);
      return false;
    },
    *cancelStatement({ payload: id }, { put, select }) {
      const access_token = yield select(state => state.oauth.access_token);

      const { data, error } = yield cancelStatement(access_token, id);

      if (!error) {
        yield message.success('成功取消结算标识', 2);
        yield put({ type: 'setQuery', payload: query })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`取消结算标识失败:${err.status} ${err.message}`, 3);
      return false;
    },
    /**
         * 初始化订单信息
         */
    *initOrderInfo({ payload }, { put, select }) {
      const access_token = yield select(state => state.oauth.access_token);
      const { data, error } = yield getOrderDetailForEdit(access_token, payload.orderId);
      if (!error) {
        yield put({
          type: 'merge',
          payload: {
            currentOrder: data,
            currentOrderId: payload.orderId
          }
        })
        return true;
      } else {
        const err = yield parseError(error);
        yield message.error(`获取订单信息失败:${err.status} ${err.message}`, 3);
      }
      return false;
    }
  },

  reducers: {
    setQuery(state, { payload: query }) {
      return { ...state, query: mergeQuery(state.query, query) }
    },
    setMeasures(state, { payload }) {
      return { ...state, ...payload }
    },
    setCurrent(state, { payload: current }) {
      return { ...state, current }
    },
    toggleLoadding(state, { payload: loading }) {
      return { ...state, loading }
    },
    toggleSubmiting(state, { payload: submiting }) {
      return { ...state, submiting }
    },
    merge(state, { payload }) {
      return { ...state, ...payload }
    },
    clear(state) {
      return initialState
    },
  }

}

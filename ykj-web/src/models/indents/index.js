
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import request, { parseError } from '../../utils/request';
import { root, search, view, create, update, remove, removeAll } from '../../services/indents';
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';

const mergeQuery = (oldQuery, newQuery) => {
  return {
    ...newQuery,
    page: (newQuery.page ? newQuery.page - 1 : 0),
  }
}

const initialState = {
  query: {},
  indents: [],
  current: {},
  pagination: {
    current: 1,
  },
  loading: false,
  submiting: false,
}

export default {
  namespace: 'indents',

  state: initialState,

  subscriptions: {
    listSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (location.pathname === '/indents/indents') {
          dispatch({ type: 'clear' })
          dispatch({
            type: 'setQuery',
            payload: location.query,
          });
        }
      });
    },
    
    itemSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (pathToRegexp('/indents/indents/:action+').test(location.pathname)) {
          dispatch({ type: 'clear' })
        }
      })
    }, 
    
    editSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (pathToRegexp('/indents/indents/edit/:id').test(location.pathname)) {
          const match = pathToRegexp('/indents/indents/edit/:id').exec(location.pathname);
          const id = match[1];
          dispatch({
            type: 'view',
            payload: id,
          });
        }
      });
    }
  },

  effects: {
    setQuery: [function*({ payload }, { put, select }) {
      console.log([
    "                   _ooOoo_",
    "                  o8888888o",
    "                  88\" . \"88",
    "                  (| -_- |)",
    "                  O\\  =  /O",
    "               ____/`---'\\____",
    "             .'  \\\\|     |//  `.",
    "            /  \\\\|||  :  |||//  \\",
    "           /  _||||| -:- |||||-  \\",
    "           |   | \\\\\\  -  /// |   |",
    "           | \\_|  ''\\---/''  |   |",
    "           \\  .-\\__  `-`  ___/-. /",
    "         ___`. .'  /--.--\\  `. . __",
    "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
    "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
    "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
    "======`-.____`-.___\\_____/___.-`____.-'======",
    "                   `=---='",
    "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
    "         佛祖保佑       永无BUG"
].join('\n'));

      yield put({
        type: 'toggleLoadding',
        payload: true,
      });
      const query = { [payload.type]: payload.value }
      const { access_token, oldQuery } = yield select( state => {
        return {
          'access_token': state.oauth.access_token,
          'oldQuery': state.indents.query,
        }
      } );
      const { data, error } = yield search(access_token, mergeQuery(oldQuery, query));

      if (!error) {
        yield put({
          type: 'setIndents',
          payload: {
            indents: data._embedded && data._embedded.indentses || [],
            pagination: {
              current: data.page && data.page.number + 1,
              total: data.page && data.page.totalElements,
            },
            query: payload
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
      yield message.error(`加载列表失败:${err.status} ${err.message}`, 3);
      return false;
    }, { type: 'takeLatest' }],
    *view({ payload: id }, { put, select }) {
      yield put({
        type: 'toggleLoadding',
        payload: true,
      });

      const { access_token, suppliers } = yield select( state => {
        return {
          'access_token': state.oauth.access_token,
          'indents': state.indents.suppliers,
        }
      } );
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
      yield message.error(`加载列表详情失败:${err.status} ${err.message}`, 3);
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
      
      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield create(access_token, payload);

      if (!error) {
    	yield message.success('创建列表信息成功', 2);
        yield put(routerRedux.goBack());
      } else {
    	const err = yield parseError(error);
        yield message.error(`创建列表信息失败:${err.status} ${err.message}`, 3);
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
      
      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield update(access_token, payload);
      
      if (!error) {
	    yield message.success('更新列表信息成功', 2);
        yield put(routerRedux.goBack());
      } else {
        const err = yield parseError(error);
        yield message.error(`更新列表信息失败:${err.status} ${err.message}`, 3);
      }
      
      yield put({
        type: 'toggleSubmiting',
        payload: false,
      });
    },
    *deleteOne({ payload: id }, { put, select }) {
	  const { access_token, query } = yield select( state => {
        return {
  	      access_token: state.oauth.access_token,
  	      query: state.suppliers.query,
        }
      } );
      const { data, error } = yield remove(access_token, id);
      
      if (!error) {
        yield message.success('成功删除列表', 2);
        yield put({ type: 'setQuery', payload: query })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`删除列表失败:${err.status} ${err.message}`, 3);
      return false;
    },
  },

  reducers: {
    setQuery(state, { payload: query }) {
      return { ...state, query: mergeQuery(state.query, query) }
    },
    setIndents(state, { payload }) {
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
    clear(state) {
      return initialState
    },
  }

}

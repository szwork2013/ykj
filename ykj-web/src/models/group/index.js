import request from '../../utils/request';
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { search,searchCustomersAllByName } from '../../services/group';
import { parseError } from '../../utils/request';

const mergeQuery = (oldQuery, newQuery) => {
  return {
    ...newQuery,
    page: (newQuery.page ? newQuery.page - 1 : 0),
  }
}

const initialState = {
    query: {},
    current: {},
    group: [],
    loading: false,
    pagination: {
        current: 1,
    },
    typeId: undefined,
}

export default {

    namespace: 'group',

    state: initialState,

    subscriptions: {
        listSubscriptions({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/customers/grouporder') {
                    dispatch({ type: 'clear' })
                    dispatch({
                        type: 'setQuery',
                        payload: location.query,
                        origin: 'urlchange',
                    });
                }
            });
        },
    },

    effects: {
         *setQuery({ payload }, { put, call, select }) {
            yield put({
                type: 'toggleLoadding',
                payload: true,
            });
            
                        
            const query = { [payload.type]: payload.value }
            
            const { access_token, oldQuery } = yield select( state => ({
                'access_token': state.oauth.access_token,
                'oldQuery': state.group.query,
            }) );
            const { data, error } = yield call(search, mergeQuery(oldQuery, query), access_token);

            if (!error) {
                yield put({
                    type: 'setGroup',
                    payload: {
                        group: data._embedded && data._embedded.group || [],
                        pagination: data._embedded && data._embedded.page || {}
                    },
                    query: payload
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
            yield message.error(`加载列表信息失败:${err.status} ${err.message}`, 3);
            return false;
        },
        
    },

    reducers: {
        setQuery(state, { payload: query }) {
            return { ...state, query: mergeQuery(state.query, query) }
        },
        setGroup(state, { payload }) {
            return {...state, ...payload}
        },
        toggleLoadding(state, { payload: loading }) {
            return { ...state, loading }
        }
    },
}




import { routerRedux } from 'dva/router';
import { message } from 'antd';
import request, { parseError } from '../../utils/request';
import { search, create, update, view, remove } from '../../services/goods';
import pathToRegexp from 'path-to-regexp';

const mergeQuery = (oldQuery, newQuery) => {
  return {
    ...newQuery,
    page: (newQuery.page ? newQuery.page - 1 : 0),
  }
}

const initialState = {
    query: {},
    goods: [],
    current: {},
    pagination: {
        current: 1,
    },
    loading: false,
    submiting: false,
    typeId: undefined,
}

export default {

    namespace: 'goods',

    state: initialState,

    subscriptions: {
        listSubscriptions({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/stock/goods') {
                    dispatch({ type: 'clear' })
                    dispatch({
                        type: 'setQuery',
                        payload: location.query,
                        origin: 'urlchange',
                    });
                }
            });
        },
         editSubscriptions({ dispatch, history }) {
             
            history.listen((location, state) => {
                if (pathToRegexp('/stock/goods/edit/:id').test(location.pathname)) {
                const match = pathToRegexp('/stock/goods/edit/:id').exec(location.pathname);
                const id = match[1];
                    dispatch({
                        type: 'view',
                        payload: id,
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
                'oldQuery': state.goods.query,
            }) );
            const { data, error } = yield call(search, mergeQuery(oldQuery, query), access_token);

            if (!error) {
                yield put({
                    type: 'setGoods',
                    payload: {
                        goods: data._embedded && data._embedded.goods || [],
                        pagination: data._embedded && data.page || {}
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
       
        *'view'({ payload:id }, {select, put, call}) {
            yield put({
                type: 'toggleLoadding',
                payload: true,
            });

            const { access_token } = yield select( state => {
                return {
                    'access_token':state.oauth.access_token,
                }
            });

            const { data, error } = yield view(access_token, id);

            if (!error) {
                yield put({
                    type: 'setCurrent',
                    payload: data,
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
            yield message.error(`加载详情失败:${err.status} ${err.message}`, 3);
            return false;
        },
        *'add'({payload}, {select, put, call}) {
            yield put({
                type: 'toggleSubmiting',
                payload: true,
            });

            const { access_token } = yield select( (state) => {
                return {
                    "access_token": state.oauth.access_token,
                }
            });

            const { data, error } = yield create(payload, access_token);
            if (!error) {
                yield message.success('创建信息成功', 2);
                yield put({
                    type: 'toggleSubmiting',
                    payload: false,
                });
                yield put(routerRedux.goBack());
            } else {
                const err = parseError(error);
                yield message.error(`创建信息失败:${err.status} ${err.message}`, 2);
                yield put({
                    type: 'toggleSubmiting',
                    payload: false,
                });
                return false;
            }
        },
        *'update'({payload}, {select, put, call}) {
                    yield put({
                        type: "toggleSubmiting",
                        payload: true,
                    });

                    const { access_token } = yield select( state => {
                        return {
                            'access_token':state.oauth.access_token,
                        }
                    });
                    
                    const { data, error } =yield update(payload, access_token);
                    if(!error) {
                        yield message.success(`更新信息成功`, 2);
                        yield put(routerRedux.goBack());
                        yield put({
                            type: "toggleSubmiting",
                            payload: false,
                        });
                        return true;
                    } else {
                        const err = yield parseError(error);
                        yield message.error(`更新信息失败：${err.status} ${err.message}`, 2);
                        yield put({
                            type: "toggleSubmiting",
                            payload: false,
                        });
                        return false;
                    }
                },

                *'delete'({ payload:id }, {select, put, call}) {
                    const { access_token } = yield select( state => {
                        return {
                            'access_token':state.oauth.access_token,
                        }
                    });
                    
                    const { data, error } = yield remove(id, access_token);
                    if(!error) {
                        yield message.success(`成功删除`, 2);
                        yield put({ type: 'setQuery', payload: {} })
                        return true;
                    }

                    const err = yield parseError(error);
                    yield message.error(`删除失败：${err.status} ${err.message}`, 3);
                    return false;
                }
            },   


    reducers: {
        
        setQuery(state, { payload: query }) {
            return { ...state, query: mergeQuery(state.query, query) }
        },
        setGood(state, { payload }) {
            return {...state, current: payload}
        },
        setGoods(state, { payload }) {
            return {...state, ...payload}
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
            return { ...state, ...initialState}
        },
    },
}


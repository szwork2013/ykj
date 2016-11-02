
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import request, { parseError } from '../../utils/request';
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';

import { search } from '../../services/storageInDetail';
import { getStorageIn } from '../../services/storageIn';

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
    list: [{
        id: '1',
        name: '实木地板',
        model: '兔宝宝VIP版',
        price: 100,
        storeNow: 10,
        reservedGoodsNum: 40,
        notDeliverGoodsNum: 50,
        outStorageGoodsNum: 50,
        usableGoodsNum: 100,
        replenishStockNum: 20,
        status: '在售',
        modifyDate: '2016-10-6'
    }],
    /**
     * 当前操作对象
     */
    currentItem: {},
    pagination: {
        current: 1,
    },
    loading: false,
    submiting: false,
    //当前查询的入库单信息
    currentStorageIn : ''
}

export default {
    namespace: 'storageInDetails',

    state: initialState,

    subscriptions: {

        listSubscriptions({ dispatch, history }) {
            history.listen((location, state) => {
                if (pathToRegexp('/storage/storageIns/good/:goodId/detail/:storageInId').test(location.pathname)) {
                    const match = pathToRegexp('/storage/storageIns/good/:goodId/detail/:storageInId').exec(location.pathname);
                    const goodId = match[1];
                    const storageInId = match[2];
                    dispatch({ type: 'clear' })
                    dispatch({
                        type : 'loadStorageIn',
                        payload : storageInId
                    })
                    dispatch({
                        type: 'setQuery',
                        payload: {
                            storageInId : storageInId,
                            storageGoodsId : goodId
                        }
                    });
                }
                if (pathToRegexp('/storage/storageIns/detail/:storageInId').test(location.pathname)) {
                    const match = pathToRegexp('/storage/storageIns/detail/:storageInId').exec(location.pathname);
                    const storageInId = match[1];
                    dispatch({ type: 'clear' })
                    dispatch({
                        type : 'loadStorageIn',
                        payload : storageInId
                    })
                    dispatch({
                        type: 'setQuery',
                        payload: {
                            storageInId : storageInId
                        }
                    });
                }
            });
        }
    },

    effects: {
        /**
         * 加载入库单信息
         */
        *loadStorageIn({ payload: id }, { put, select }) {
            yield put({
                type: 'toggleLoadding',
                payload: true,
            });

            const { access_token, oldQuery } = yield select(state => {
                return {
                    'access_token': state.oauth.access_token,
                    'oldQuery': state.storageInDetails.query,
                }
            });

            const { data, error } = yield getStorageIn(access_token, id);
            if (!error) {
                yield put({
                    type: 'merge',
                    payload: {
                        currentStorageIn : data||{}
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
            yield message.error(`加载入库单失败:${err.status} ${err.message}`, 3);
            return false;
        },
        /**
         * 查询
         */
        *setQuery({ payload: query }, { put, select }) {
            yield put({
                type: 'toggleLoadding',
                payload: true,
            });

            const { access_token, oldQuery } = yield select(state => {
                return {
                    'access_token': state.oauth.access_token,
                    'oldQuery': state.storageInDetails.query,
                }
            });

            const { data, error } = yield search(access_token, query);
            if (!error) {
                yield put({
                    type: 'merge',
                    payload: {
                        list: data._embedded && data._embedded.storageInDetails || [],
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
            yield message.error(`加载入库详情失败:${err.status} ${err.message}`, 3);
            return false;
        },
    },

    reducers: {
        setQuery(state, { payload: query }) {
            return { ...state, query: mergeQuery(state.query, query) }
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

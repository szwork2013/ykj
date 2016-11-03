
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import request, { parseError } from '../../utils/request';
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';

import {searchHistory,storageOut} from '../../services/storageOut'

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
    /**
     * 商品编码
     */
    goodId : undefined
}

export default {
    namespace: 'storageOuts',

    state: initialState,
    
    subscriptions: {

        listSubscriptions({ dispatch, history }) {
            history.listen((location, state) => {
                if (pathToRegexp('/storage/storageOuts/good/:goodId').test(location.pathname)) {
                    const match = pathToRegexp('/storage/storageOuts/good/:goodId').exec(location.pathname);
                    const goodId = match[1];
                    dispatch({ type: 'clear' })
                    dispatch({
                        type: 'merge',
                        payload: {
                            "goodId" : goodId
                        }
                    });
                    dispatch({
                        type: 'setQuery',
                        payload: {
                        }
                    });
                }
                if (pathToRegexp('/storage/storageOuts').test(location.pathname)) {
                    dispatch({ type: 'clear' })
                    dispatch({
                        type: 'setQuery',
                        payload: {
                            
                        }
                    });
                }
                


                
            });
        }
    },

    effects: {
        /**
         * 查询
         */
        *setQuery({ payload: query }, { put, select }) {
            yield put({
                type: 'toggleLoadding',
                payload: true,
            });

            const { access_token, oldQuery,goodId } = yield select(state => {
                return {
                    'access_token': state.oauth.access_token,
                    'oldQuery': state.storageIns.query,
                    'goodId' : state.storageIns.goodId
                }
            });
            const { data, error } = yield searchHistory(access_token, {...query,goodId});
            if (!error) {
                yield put({
                    type: 'merge',
                    payload: {
                        list: data._embedded && data._embedded.storageOuts || [],
                        pagination: {
                            current: data.page && data.page.number + 1,
                            total: data.page && data.page.totalElements,
                        }
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
            yield message.error(`加载出库记录失败:${err.status} ${err.message}`, 3);
            return false;
        },
        /**
         * 创建出库单
         */
        *storageOut({ payload }, { put, select }) {
            yield put({
                type: 'toggleSubmiting',
                payload: true,
            });

            const { access_token} = yield select(state => {
                return {
                    'access_token': state.oauth.access_token
                }
            });

            yield put({
                type: 'merge',
                payload: {
                    currentItem: payload
                },
            });
            const { data, error } = yield storageOut(access_token, payload);
            console.log(error)
            if (!error) {
                yield message.success('创建出库单信息成功', 2);
                yield put(routerRedux.goBack());
                return;
            }

            const err = yield parseError(error);
            yield message.error(`创建出库单信息失败:${err.status} ${err.message}`, 3);

            yield put({
                type: 'toggleSubmiting',
                payload: false,
            });
            return false;
        },
    },

    reducers: {
        setQuery(state, { payload: query }) {
            return { ...state, query: mergeQuery(state.query, query) }
        },
        setMeasures(state, { payload }) {
            return { ...state, ...payload }
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


import { routerRedux } from 'dva/router';
import { message } from 'antd';
import request, { parseError } from '../../utils/request';
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';

import {searchHistory} from '../../services/storageIn'

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
    namespace: 'storageIns',

    state: initialState,
    
    subscriptions: {

        listSubscriptions({ dispatch, history }) {
            history.listen((location, state) => {
                if (pathToRegexp('/storage/storageIns/good/:goodId').test(location.pathname)) {
                    const match = pathToRegexp('/storage/storageIns/good/:goodId').exec(location.pathname);
                    const goodId = match[1];
                    console.log("商品号："+goodId);
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
                if (pathToRegexp('/storage/storageIns').test(location.pathname)) {
                    console.log("coming")
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
                        list: data._embedded && data._embedded.storageIns || [],
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
            yield message.error(`加载商品失败:${err.status} ${err.message}`, 3);
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

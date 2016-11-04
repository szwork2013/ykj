
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import request, { parseError } from '../../utils/request';
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';

import { searchStorageGoodStatusDetails } from '../../services/storageGoodsStatus';

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
     * 商品批次明细数据集合及分页信息
     */
    goodBatchDetails: [{
        storageOutId: 'A001',
        num: 10
    }, {
        storageInId: 'A002',
        num: 10,
        cost: 100
    }],
    goodBatchDetailsPagination: {
        current: 1
    }
}

export default {
    namespace: 'storageGoodsStatus',

    state: initialState,

    subscriptions: {

        listSubscriptions({ dispatch, history }) {
            history.listen((location, state) => {
                if (pathToRegexp('/storage/storageGoodsStatus').test(location.pathname)) {
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

            const { access_token, oldQuery } = yield select(state => {
                return {
                    'access_token': state.oauth.access_token,
                    'oldQuery': state.measures.query,
                }
            });

            const { data, error } = yield searchStorageGoodStatusDetails(access_token, query);
            if (!error) {
                yield put({
                    type: 'setStorageGoodsStatus',
                    payload: {
                        list: data._embedded && data._embedded.storageGoodStatusDetails || [],
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
            yield message.error(`加载商品库存失败:${err.status} ${err.message}`, 3);
            return false;
        },
    },

    reducers: {
        setQuery(state, { payload: query }) {
            return { ...state, query: mergeQuery(state.query, query) }
        },
        setStorageGoodsStatus(state, { payload }) {
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

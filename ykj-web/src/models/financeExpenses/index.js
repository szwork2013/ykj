
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import request, { parseError } from '../../utils/request';
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';

import { search,getFinanceExpense,createOrUpdateFinanceExpense,deleteFinanceExpense } from '../../services/financeExpenses';

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
    payModalShow : false
}

export default {
    namespace: 'financeExpenses',

    state: initialState,

    subscriptions: {

        listSubscriptions({ dispatch, history }) {
            history.listen((location, state) => {
                if (pathToRegexp('/finance/financeExpenses').test(location.pathname)) {
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
         * 创建支出信息
         */
        *addOrUpdate({ payload }, { put, select }) {
            yield put({
                type: 'toggleLoadding',
                payload: true,
            });

            const { access_token, oldQuery } = yield select(state => {
                return {
                    'access_token': state.oauth.access_token,
                    'oldQuery': state.financeExpenses.query,
                }
            });

            const { data, error } = yield createOrUpdateFinanceExpense(access_token, payload);
            if (!error) {

                yield put({
                    type: 'toggleLoadding',
                    payload: false,
                });
                yield put({
                    type: 'hidePayModal'
                });
                yield put({
                    type: 'merge',
                    payload : {
                        currentItem : {}
                    }
                });
                yield put({
                    type: 'setQuery',
                    payload : {}
                });
                

                return true;
            }

            yield put({
                type: 'toggleLoadding',
                payload: false,
            });

            const err = yield parseError(error);
            yield message.error(`新增支出记录失败:${err.status} ${err.message}`, 3);
            return false;
        },
        /**
         * 创建支出信息
         */
        *delete({ payload : id }, { put, select }) {
            yield put({
                type: 'toggleLoadding',
                payload: true,
            });

            const { access_token, oldQuery } = yield select(state => {
                return {
                    'access_token': state.oauth.access_token,
                    'oldQuery': state.financeExpenses.query,
                }
            });



            const { data, error } = yield deleteFinanceExpense(access_token, id);
            if (!error) {

                yield put({
                    type: 'toggleLoadding',
                    payload: false,
                });
                yield put({
                    type: 'setQuery',
                    payload : {}
                });
                

                return true;
            }

            yield put({
                type: 'toggleLoadding',
                payload: false,
            });

            const err = yield parseError(error);
            yield message.error(`修改支出记录失败:${err.status} ${err.message}`, 3);
            return false;
        },
        /**
         * 修改的前置操作
         */
        *preUpdate({ payload  : id }, { put, select }) {

            const { access_token, oldQuery } = yield select(state => {
                return {
                    'access_token': state.oauth.access_token,
                    'oldQuery': state.financeExpenses.query,
                }
            });

            const { data, error } = yield getFinanceExpense(access_token, id);
            if (!error) {
                
                yield put({
                    type: 'merge',
                    payload : {
                        currentItem:data || {}
                    }
                });

                yield put({
                    type: 'showPayModal'
                });


                return true;
            }

            yield put({
                type: 'toggleLoadding',
                payload: false,
            });

            const err = yield parseError(error);
            yield message.error(`修改支出记录失败:${err.status} ${err.message}`, 3);
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
                    'oldQuery': state.financeExpenses.query,
                }
            });
            console.log(mergeQuery(oldQuery,query));
            const { data, error } = yield search(access_token,mergeQuery(oldQuery,query));
            if (!error) {
                yield put({
                    type: 'merge',
                    payload: {
                        list: data._embedded && data._embedded.financeExpenses || [],
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
            yield message.error(`查询财务支出信息失败:${err.status} ${err.message}`, 3);
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
        showPayModal(state) {
            return { ...state, ...{
                  payModalShow : true  
            } }
        },
        hidePayModal(state) {
            console.log("hidePay")
            return { ...state, ...{
                  payModalShow : false,
                  currentItem : {}  
            } }
        },
        merge(state, { payload }) {
            return { ...state, ...payload }
        },
        clear(state) {
            return initialState
        },
    }

}

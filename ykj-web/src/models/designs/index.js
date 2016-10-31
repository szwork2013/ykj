
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import request, { parseError } from '../../utils/request';
import { root, search, view, create, update, remove, removeAll, statement, cancelStatement, upload } from '../../services/design';
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

    /**
     * 附件是否可上传
     */
    uploadable: false,
    /**
     * 附件列表
     */
    attachments: [],
    /**
     * 是否显示附件窗口
     */
    attachmentModalShow: false,
}

export default {
    namespace: 'designs',

    state: initialState,

    subscriptions: {
        listSubscriptions({ dispatch, history }) {
            history.listen((location, state) => {
                if (pathToRegexp('/order/orders/:orderId/designs').test(location.pathname)) {
                    const match = pathToRegexp('/order/orders/:orderId/designs').exec(location.pathname);
                    const orderId = match[1];
                    dispatch({ type: 'clear' })
                    dispatch({
                        type: 'setQuery',
                        payload: {
                            orderId: orderId
                        },
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
                if (pathToRegexp('/order/designs/:action+').test(location.pathname)) {
                    dispatch({ type: 'clear' })
                }
            })
        },

        editSubscriptions({ dispatch, history }) {
            history.listen((location, state) => {
                if (pathToRegexp('/order/orders/:orderId/designs/edit/:measureId').test(location.pathname)) {
                    const match = pathToRegexp('/order/orders/:orderId/designs/edit/:measureId').exec(location.pathname);
                    const orderId = match[1];
                    const measureId = match[2];
                    dispatch({
                        type: 'view',
                        payload: measureId,
                    });
                    dispatch({
                        type: 'orderServiceAttachment/loadOrderServiceAttachment',
                        payload: measureId
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
                if (pathToRegexp('/order/orders/:orderId/designs/add').test(location.pathname)) {
                    const match = pathToRegexp('/order/orders/:orderId/designs/add').exec(location.pathname);
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
                    'oldQuery': state.designs.query,
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
            yield message.error(`加载设计安排失败:${err.status} ${err.message}`, 3);
            return false;
        },
        /**
         * 新增
         */
        *add({ payload }, { put, call, select }) {
            yield put({
                type: 'toggleSubmiting',
                payload: true,
            });

            const access_token = yield select(state => state.oauth.access_token);
            const { data, error } = yield create(access_token, payload);

            if (!error) {
                yield message.success('创建设计安排信息成功', 2);
                payload.id = data;
                yield put({
                    type: 'merge',
                    payload: {
                        currentItem: payload
                    }
                });
                yield put(routerRedux.goBack());
            } else {
                const err = yield parseError(error);
                yield message.error(`创建设计安排信息失败:${err.status} ${err.message}`, 3);
            }

            yield put({
                type: 'toggleSubmiting',
                payload: false,
            });
        },
        *view({ payload: id }, { put, select }) {
            yield put({
                type: 'toggleLoadding',
                payload: true,
            });

            const { access_token, designs } = yield select(state => {
                return {
                    'access_token': state.oauth.access_token,
                    'designs': state.designs.designs,
                }
            });
            const { data, error } = yield view(access_token, id);

            if (!error) {
                yield put({
                    type: 'merge',
                    payload: {
                        currentItem: data
                    }
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
            yield message.error(`加载设计安排详情失败:${err.status} ${err.message}`, 3);
            return false;
        },

        *edit({ payload }, { put, select }) {
            yield put({
                type: 'toggleSubmiting',
                payload: true,
            });
            yield put({
                type: 'merge',
                payload: {
                    currentItem: payload
                }
            });

            const {access_token} = yield select(state => {
                return {
                    access_token: state.oauth.access_token
                }
            });

            const { data, error } = yield update(access_token, payload);

            if (!error) {
                yield message.success('更新设计安排信息成功', 2);
                yield put(routerRedux.goBack());
            } else {
                const err = yield parseError(error);
                yield message.error(`更新设计安排信息失败:${err.status} ${err.message}`, 3);
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
                    query: state.designs.query,
                }
            });
            const { data, error } = yield remove(access_token, id);

            if (!error) {
                yield message.success('成功删除设计安排', 2);
                yield put({ type: 'setQuery', payload: query })
                return true;
            }

            const err = yield parseError(error);
            yield message.error(`删除设计安排失败:${err.status} ${err.message}`, 3);
            return false;
        },
        *statement({ payload: id }, { put, select }) {
            const { access_token, query } = yield select(state => {
                return {
                    access_token: state.oauth.access_token,
                    query: state.designs.query,
                }
            });
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
            const { access_token, query } = yield select(state => {
                return {
                    access_token: state.oauth.access_token,
                    query: state.designs.query,
                }
            });

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

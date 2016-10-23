
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
    list : [],
    /**
     * 当前操作对象
     */
    currentItem : {},
    pagination: {
        current: 1,
    },
    loading: false,
    submiting: false,
    /**
     * 当前订单号
     */
    currentOrderId : '',
    /**
     * 当前订单
     */
    currentOrder : {},
    /**
     * 上传文件列表
     */
    uploadFileList :[],
    /**
     * 位置窗口查看
     */
    positionModalShow : false
}

export default {
    namespace: 'designs',

    state: initialState,

    subscriptions: {
        /**
         * 通用监听，用于加载订单用户信息
         */
        commonSubscriptions({ dispatch, history }) {
            
            history.listen((location, state) => {
                if (pathToRegexp('/order/orders/:id/designs/*').test(location.pathname) || pathToRegexp('/order/orders/:id/designs').test(location.pathname)) {
                    const match = pathToRegexp('/order/orders/:id/designs/*').exec(location.pathname) || pathToRegexp('/order/orders/:id/designs').exec(location.pathname);
                    const orderId = match[1];
                    dispatch({
                        type: 'initOrderInfo',
                        payload: {
                            orderId : orderId
                        },
                    });
                    dispatch({
                        type: 'setQuery',
                        payload:  orderId
                    });


                    /*
                    dispatch({
                        type: 'merge',
                        payload: {
                            serviceType : getServiceTypeByPath(location),
                            currentOrder : {
                                orderNo : '1111',
                                customerName : 'XXX',
                                customerPhone : '130000000',
                                address : '123121'
                            }
                        },
                    });
                    */
                    
                }
            });
        },
        /**
         * 设计数据修改监听
         */
        editEditSubscriptions({ dispatch, history }) {
            
            history.listen((location, state) => {
                if (pathToRegexp('/order/orders/:id/designs/edit/:measureId').test(location.pathname)) {
                    const match = pathToRegexp('/order/orders/:id/designs/edit/:measureId').exec(location.pathname);
                    const orderId = match[1];
                    const measureId = match[2];
                    dispatch({
                        type: 'view',
                        payload: measureId
                    });
                    /*
                    dispatch({
                        type: 'merge',
                        payload: {
                            currentItem : {
                                id : '123',
                                name : '设计名称',
                                needTime : '2016-10-16',
                                clerkId : '3',
                                clerkPhone : '1300000000',
                                cost: 5,
                                remark : '备注',
                                servicePosition : '服务位置 : 小和山公交站',
                                isFinish : true
                            }
                        },
                    });
                    */
                }
            });
        },
        
    },

    effects: {
        setQuery: [function* ({ payload: query }, { put, select }) {
            yield put({
                type: 'toggleLoadding',
                payload: true,
            });

            const access_token = yield select(state => state.oauth.access_token);

            
            const { data, error } = yield search(access_token, query);
            if (!error) {
                yield put({
                    type: 'merge',
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
        }, { type: 'takeLatest' }],
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
                    payload : {
                        currentItem : data
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
        *add({ payload }, { put, call, select }) {
            yield put({
                type: 'toggleSubmiting',
                payload: true,
            });
            yield put({
                type: 'merge',
                payload : {
                    currentItem : payload
                }
            });

            const access_token = yield select(state => state.oauth.access_token);
            const { data, error } = yield create(access_token, payload);

            if (!error) {
                yield message.success('创建设计安排信息成功', 2);
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
        *edit({ payload }, { put, select }) {
            yield put({
                type: 'toggleSubmiting',
                payload: true,
            });
            yield put({
                type: 'merge',
                payload :{
                    currentItem : payload
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
            const { access_token, query,currentOrderId } = yield select(state => {
                return {
                    access_token: state.oauth.access_token,
                    query: state.designs.query,
                    currentOrderId : state.designs.currentOrderId
                }
            });
            
            const { data, error } = yield remove(access_token, id);

            if (!error) {
                yield message.success('成功删除设计安排', 2);
                yield put({ type: 'setQuery', payload: currentOrderId })
                return true;
            }

            const err = yield parseError(error);
            yield message.error(`删除设计安排失败:${err.status} ${err.message}`, 3);
            return false;
        },
        *statement({ payload: id }, { put, select }) {
             const { access_token, query,currentOrderId } = yield select(state => {
                return {
                    access_token: state.oauth.access_token,
                    query: state.designs.query,
                    currentOrderId : state.designs.currentOrderId
                }
            });
            const { data, error } = yield statement(access_token, id);

            if (!error) {
                yield message.success('成功确认结算标识', 2);
                yield put({ type: 'setQuery', payload: currentOrderId })
                return true;
            }

            const err = yield parseError(error);
            yield message.error(`确认结算标识失败:${err.status} ${err.message}`, 3);
            return false;
        },
        *cancelStatement({ payload: id }, { put, select }) {
             const { access_token, query,currentOrderId } = yield select(state => {
                return {
                    access_token: state.oauth.access_token,
                    query: state.designs.query,
                    currentOrderId : state.designs.currentOrderId
                }
            });
            const { data, error } = yield cancelStatement(access_token, id);

            if (!error) {
                yield message.success('成功取消结算标识', 2);
                yield put({ type: 'setQuery', payload: currentOrderId })
                return true;
            }

            const err = yield parseError(error);
            yield message.error(`取消结算标识失败:${err.status} ${err.message}`, 3);
            return false;
        },
        *upload({ payload }, { put, select }) {
            const access_token = yield select(state => state.oauth.access_token);
            let fileList = payload.fileList;
            let file = payload.file
            console.log(file, fileList)
            const { data, error } = yield upload(access_token, file);
            if (!error) {
                yield message.success('上传附件成功', 2);
                payload.replace({...file, status: 2, serviceId: 'data'}, fileList)
                console.log(fileList, 'new')
                yield put({
                    type: 'setFileList',
                    payload: fileList       
                })
                return true;
            }   
            const newFileList = payload.replace({...file, status: 3}, payload.fileList);
            yield put({
                type: 'setFileList',
                payload: newFileList
            })

            const err = yield parseError(error);
            yield message.error(`上传附件失败:${err.status} ${err.message}`, 3);
            return false;
        },
        /**
         * 初始化订单信息
         */
        *initOrderInfo({ payload }, { put, select }){
            const access_token = yield select(state => state.oauth.access_token);
            const { data, error } = yield getOrderDetailForEdit(access_token, payload.orderId);
            
            if (!error) {
                yield put({
                    type: 'merge',
                    payload: {
                        currentOrder : data,
                        currentOrderId : payload.orderId
                    }
                })
                return true;
            }else{
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
    toggleLoadding(state, { payload: loading }) {
        return { ...state, loading }
    },
    toggleSubmiting(state, { payload: submiting }) {
        return { ...state, submiting }
    },
    merge(state, { payload }) {
        console.log({ ...state, ...payload })
        return { ...state, ...payload }
    },
    clear(state) {
        return initialState
    },
}

}

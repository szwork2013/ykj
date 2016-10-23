
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import request, { parseError } from '../../utils/request';
import { root, search, view, create, update, remove, removeAll, searchCustomers, 
       finishOrder, auditOrder, payOrder, viewGood, saveFillOrBack, uploadOrder, searchGoodsAllByModel,getOrderCurrentProcessStatus,revenueOrder,getOrderDetailForPrint,
      getOrderDetailForEdit,cancelOrder,deleteOrder  } from '../../services/order';
import {searchCustomersAllByName } from '../../services/customer';
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
  orders: [],
  stateStatisticalResult : [],
  currentOrder : {},
  //模糊匹配到的用户列表
  fuzzyCustomerList : [],
  current: {},
  currentGoodInfo: {},
  goodList : [],
  customerList : [],
  pagination: {
    current: 1,
  },
  loading: false,
  submiting: false,
  modalShowWin: false,
  currentOrderId: undefined,
  finishModalShow: false,
  AuditModalShow: false,
  payModalShow: false,
  UploadModalShow: false,
  FollowModalShow: false,
  goodsEditing: false,
  queryCustomers: [],
  updateOrderGoods: [],
  followStatus: [],
}

export default {
  namespace: 'orders',

  state: initialState,

  subscriptions: {

    overListSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (location.pathname === '/order/orders/overOrders') {
          location.query.type = 2;
          dispatch({ type: 'clear' });
          dispatch({
            type: 'setQuery',
            payload: location.query,
          });
        }
      });
    },

    listSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (location.pathname === '/order/orders') {
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
        if (pathToRegexp('/order/orders/:action+').test(location.pathname)) {
          dispatch({ type: 'clear' })
        }
      })
    }, 
    
    editSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (pathToRegexp('/order/orders/edit/:id').test(location.pathname)) {
          const match = pathToRegexp('/order/orders/edit/:id').exec(location.pathname);
          const id = match[1];
          dispatch({
            type: 'searchGoodsByModel',
            payload: 'ALL'
          });
          dispatch({
            type: 'searchCustomersByName',
            payload: 'ALL'
          });
          dispatch({
            type: 'codewords/setCodewordsByType',
            payload: 'ORDER_SOURCE'
          });
          dispatch({
             type : "toEdit",
             payload : id
          });
        }
      });
    },

    /**
     * 新增操作时的监听处理
     */
    addSubscriptions({ dispatch, history }) {
      history.listen(location => {
                if (location.pathname === '/order/orders/add') {
                    dispatch({
                        type: 'searchGoodsByModel',
                        payload: 'ALL'
                    });
                    dispatch({
                        type: 'searchCustomersByName',
                        payload: 'ALL'
                    });
                    dispatch({
                        type: 'codewords/setCodewordsByType',
                        payload: 'ORDER_SOURCE'
                    });
                }
            });
    },
    enterOutSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (pathToRegexp('/order/orders/enterOut/:id/:goodId').test(location.pathname)) {
          const match = pathToRegexp('/order/orders/enterOut/:id/:goodId').exec(location.pathname);
          const orderId = match[1];
          const goodId = match[2];
          dispatch({
            type: 'viewGoodInfo',
            payload: {
              id: orderId,
              goodId: goodId,
            },
          });
        }
      });
    },
    /**
     * 打印监听器
     */
    printSubscriptions({ dispatch, history }) {
      history.listen((location, state) => {
        if (pathToRegexp('/order/orders/print/:id').test(location.pathname)) {
          const match = pathToRegexp('/order/orders/print/:id').exec(location.pathname);
          const id = match[1];
           dispatch({
             type : "toPrint",
             payload : id
          });
        }
      });
    },
  },

  effects: {
    setQuery: [function*({ payload: query }, { put, select }) {
      yield put({
        type: 'toggleLoadding',
        payload: true,
      });

      const { access_token, oldQuery } = yield select( state => {
        return {
          'access_token': state.oauth.access_token,
          'oldQuery': state.orders.query,
        }
      } );
      const { data, error } = yield search(access_token, mergeQuery(oldQuery, query));
      console.log(data)
      if (!error) {
        yield put({
          type: 'setOrders',
          payload: {
            orders: data._embedded && data._embedded.orders || [],
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
      yield message.error(`加载订单管理失败:${err.status} ${err.message}`, 3);
      return false;
    }, { type: 'takeLatest' }],
    *view({ payload: id }, { put, select }) {
      yield put({
        type: 'toggleLoadding',
        payload: true,
      });

      const { access_token } = yield select( state => {
        return {
          'access_token': state.oauth.access_token,
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
      yield message.error(`加载订单管理详情失败:${err.status} ${err.message}`, 3);
      return false;
    },
    *add({ payload }, { put, call, select }) {
      yield put({
        type: 'toggleSubmiting',
        payload: true,
      });
      
       yield put({
        type: 'createSuccess',
        payload: payload,
      });
      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield create(access_token, payload);

      if (!error) {
    	yield message.success('创建订单管理信息成功', 2);
        yield put(routerRedux.goBack());
      } else {
    	const err = yield parseError(error);
        yield message.error(`创建订单管理信息失败:${err.status} ${err.message}`, 3);
      }
      console.log(payload)
     

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
      
      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield update(access_token, payload);
      
      if (!error) {
	      yield message.success('更新订单管理信息成功', 2);
        yield put(routerRedux.goBack());
      } else {
        const err = yield parseError(error);
        yield message.error(`更新订单管理信息失败:${err.status} ${err.message}`, 3);
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
  	      query: state.orders.query,
        }
      } );
      const { data, error } = yield remove(access_token, id);
      
      if (!error) {
        yield message.success('成功删除订单', 2);
        yield put({ type: 'setQuery', payload: query })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`删除订单管理失败:${err.status} ${err.message}`, 3);
      return false;
    },
    *queryCustomer({ payload: query }, { put, select }) {
      yield put({
        type: 'toggleLoadding',
        payload: true,
      });

      const { access_token } = yield select( state => {
        return {
  	      access_token: state.oauth.access_token,
        }
      } );
      const { data, error } = yield searchCustomers(access_token, query);

      if (!error) {
        yield put({
          type: 'toggleLoadding',
          payload: false,
        });

        yield put({
          type: 'setQueryCustomers',
          payload: data,
        }) 
        return true;
      }
      
      yield put({
        type: 'toggleLoadding',
        payload: false,
      });

      const err = yield parseError(error);
      yield message.error(`加载客户信息失败:${err.status} ${err.message}`, 3);
      return false;
    },
    *viewGoodInfo({ payload: dataSourse }, {select, put}) {
      yield put({
        type: 'toggleLoadding',
        payload: true,
      });

      const { access_token, id, goodId } = yield select( state => {
        return {
          access_token: state.oauth.access_token,
          id: dataSourse.id,
          goodId: dataSourse.goodId,
        }
      } );
      const { data, error } = yield viewGood(access_token, id, goodId);

      if (!error) {
        yield put({
          type: 'setCurrentGoodInfo',
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
      yield message.error(`加载商品详情失败:${err.status} ${err.message}`, 3);
      return false;
    },
    *saveEnterOut({ payload }, {select, put}) {
      yield put({
        type: 'toggleSubmiting',
        payload: true,
      });
      
      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield saveFillOrBack(access_token, payload);

      if (!error) {
    	  yield message.success('创建退补货信息成功', 2);
        yield put(routerRedux.goBack());
      } else {
    	const err = yield parseError(error);
        yield message.error(`创建退补货信息失败:${err.status} ${err.message}`, 3);
      }

      yield put({
        type: 'toggleSubmiting',
        payload: false,
      });
    },
    *queryFollowStatus({payload: dataSourse}, {select, put}) {
      const { access_token, id, query } = yield select( state => {
        return {
  	      access_token: state.oauth.access_token,
          id: dataSourse.currentOrderId,
          query: state.orders.query,
        }
      } );
      
      const { data, error } = yield s(access_token, id);

      if (!error) {
        yield put({
          type: 'toggleFollowModal',
          payload: dataSourse,
        });
        
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`跟踪订单状态失败:${err.status} ${err.message}`, 3);
      return false;
    },

    /**
     * 完成订单
     */
    *toFinishOrder({payload},{select,put}){
      yield put({
          type: 'merge',
          payload: {
            currentOrder : {}
          },
        })
      
      yield put({
          type: 'merge',
          payload: {
            currentOrder : payload,
            finishModalShow : true
          },
        })

    },
     /**
     * 完成订单
     */
    *finishOrder({payload},{select,put}){
      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield finishOrder(access_token,payload);
       if (!error) {
        yield message.success('订单完成操作成功', 2);
        yield put({
          type: 'setQuery',
          payload: {},
        })
        yield put({
          type: 'toggleFinishModal',
          payload: {
            finishModalShow : false
          },
        })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`订单完成操作失败:${err.status} ${err.message}`, 3);

      return false;
    },
     /**
     * 删除订单
     */
    *deleteOrder({payload},{select,put}){
      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield deleteOrder(access_token,payload);

       if (!error) {
        yield message.success('订单删除操作成功', 2);
        yield put({
          type: 'setQuery',
          payload: {},
        })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`订单删除操作失败:${err.status} ${err.message}`, 3);

      return false;
    },
    /**
     * 退单
     */
    *cancelOrder({payload},{select,put}){
      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield cancelOrder(access_token,payload);

       if (!error) {
        yield message.success('订单退单操作成功', 2);
        yield put({
          type: 'setQuery',
          payload: {},
        })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`订单退单操作失败:${err.status} ${err.message}`, 3);

      return false;
    },
    /**
     * 准备编辑
     */
    *toEdit({payload},{select,put}){
      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield getOrderDetailForEdit(access_token,payload);

       if (!error) {
        yield message.success('获取订单信息操作成功', 2);
        yield put({
          type: 'merge',
          payload: {
            currentOrder : data
          },
        })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`获取订单信息失败:${err.status} ${err.message}`, 3);

      return false;
    },
    /**
     * 准备打印
     */
    *toPrint({payload},{select,put}){
      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield getOrderDetailForPrint(access_token,payload);

       if (!error) {
        yield message.success('获取订单打印信息操作成功', 2);
        yield put({
          type: 'merge',
          payload: {
            currentOrder : data
          },
        })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`获取订单打印信息失败:${err.status} ${err.message}`, 3);

      return false;
    },
    /**
     * 准备付款
     */
    *toRevenueOrder({payload},{select,put}){
      yield put({
        type: 'codewords/setCodewordsByType',
        payload: 'PAYMENT_WAY'
      });
      yield put({
        type: 'codewords/setCodewordsByType',
        payload: 'CATEGORY'
      });
       yield put({
        type: 'merge',
        payload: {
        currentOrder: {}
        },
      });  
       yield put({
          type: 'merge',
          payload: {
            currentOrder : payload.currentOrder
          },
        })
        yield put({
          type: 'togglePayModal',
          payload: {
            payModalShow : true
          },
        })
    },
    /**
     * 订单付款
     */
    *revenueOrder({ payload }, {select, put}) {
      yield put({
        type: 'toggleSubmiting',
        payload: true,
      });
      console.log(payload)

      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield revenueOrder(access_token, payload.orderId,payload);

      if (!error) {
        yield message.success('付款操作成功', 2);
        
        yield put({
          type: 'togglePayModal',
          payload: {
            payModalShow: false,
          },
        });
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`付款操作失败:${err.status} ${err.message}`, 3);

      yield put({
        type: 'toggleSubmiting',
        payload: false,
      });


      return false;
    },
    /**
     * 显示订单最新流程状态状态
     */
    *showOrderProcessStatus({payload},{select,put}){
      
        const access_token = yield select( state => state.oauth.access_token );
        const { data, error } = yield getOrderCurrentProcessStatus(access_token, payload.currentOrder.id || '');

        if (!error) {
          yield put({
            type: 'merge',
            payload: {
              currentOrder : {
                processStatus : data
              }
            },
          })
          
           yield put({
            type: 'toggleFollowModal',
            payload: {FollowModalShow : true},
          })

          return true;
        }

        const err = yield parseError(error);
        yield message.error(`加载订单状态失败:${err.status} ${err.message}`, 3);
        return false;
      }, 
    /**
     * 图片上传准备
     */
    *toUpload({payload},{select,put}){
      
        yield put({
          type: 'merge',
          payload: {
            currentOrder : {}
          },
        })
        const access_token = yield select( state => state.oauth.access_token );
        const { data, error } = yield view(access_token, payload.currentOrder.id || '');

        if (error) {
          yield message.warn(`订单信息查询失败，若原有已上传图片，再次上传将会覆盖原图片`, 3);
        }
        yield put({
          type: 'merge',
          payload: {
            currentOrder : data
          },
        })
        
        yield put({
          type: 'toggleUploadModal',
          payload: {UploadModalShow : true},
        })
        return true;
      },
    /**
     * 图片上传
     */
    *upload({ payload }, {select, put}) {
      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield uploadOrder(access_token, payload);

      if (!error) {
        yield message.success('订单上传操作成功', 2);
        
        yield put({
          type: 'toggleUploadModal',
          payload: {
            UploadModalShow: false, 
          },
        });
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`订单上传操作失败:${err.status} ${err.message}`, 3);


      return false;
    },
    /**
     * 准备订单审核
     */
    *toAudit({payload},{select,put}){
      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield view(access_token, payload.currentOrder.id || '');

      if (!error) {
        yield put({
          type: 'merge',
          payload: {
            currentOrder : data
          },
        })
        yield put({
          type: 'toggleAuditModal',
          payload: {AuditModalShow : true},
        })
        return true;
      }

       const err = yield parseError(error);
      yield message.error(`加载订单信息失败:${err.status} ${err.message}`, 3);
      return false;
    },
    /**
     * 订单审核
     */
    *audit({ payload }, {select, put}) {
      console.log(payload)
      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield auditOrder(access_token, payload.id);

      if (!error) {
        yield message.success('审核操作成功', 2);
        
        yield put({
          type: 'toggleAuditModal',
          payload: {
            AuditModalShow: false, 
          },
        });

        yield put({
          type: 'setQuery',
          payload: {
          },
        });

        
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`审核操作失败:${err.status} ${err.message}`, 3);


      return false;
    },
    /**
     * 搜索商品信息
     */
    *searchGoodsByModel({payload },{select, put}){
      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield searchGoodsAllByModel(access_token, payload);

      if (!error) {
        yield put({
          type: 'merge',
          payload: {
            goodList: data._embedded && data._embedded.goods || []
          },
        })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`加载商品信息失败:${err.status} ${err.message}`, 3);
      return false;
    },
    /**
     * 搜索客户信息
     */
    *searchCustomersByName({payload },{select, put}){
      const access_token = yield select( state => state.oauth.access_token );
      const { data, error } = yield searchCustomersAllByName(access_token, payload);
       if (!error) {
        yield put({
          type: 'merge',
          payload: {
            customerList: data._embedded && data._embedded.customers || []
          },
        })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`加载客户信息失败:${err.status} ${err.message}`, 3);
      return false;
    },
  },

  reducers: {
    setQuery(state, { payload: query }) {
      return { ...state, query: mergeQuery(state.query, query) }
    },
    setOrders(state, { payload }) {
      return { ...state, ...payload }
    },
    setCurrent(state, { payload: current }) {
      return { ...state, current }
    },
    setCurrentGoodInfo(state, { payload: currentGoodInfo }) {
      return { ...state, currentGoodInfo }
    },
    toggleLoadding(state, { payload: loading }) {
      return { ...state, loading }
    },
    toggleSubmiting(state, { payload: submiting }) {
      return { ...state, submiting }
    },
    toggleModalShow(state, { payload: modalShowWin }) {
      return { ...state, modalShowWin }
    },
    toggleFinishModal(state, { payload }) {
      return { ...state, ...payload }
    },
    
    togglePayModal(state, { payload }) {
      return { ...state, ...payload }
    },
    toggleUploadModal(state, { payload }) {
      return { ...state, ...payload }
    },
    toggleFollowModal(state, { payload }) {
      return { ...state, ...payload }
    },
    toggleOrdergoodsState(state, { payload }) {
      return { ...state, ...payload }
    },
    setQueryCustomers(state, { payload }) {
      return { ...state, ...payload }
    },
    setUpdateGoods(state, { payload }) {
      return { ...state, ...payload }
    },
    clear(state) {
      return initialState
    },

    merge(state,{payload}){
      return { ...state, ...payload }
    },
    createSuccess(state,{payload}){
      return { ...state, ...payload }
    },
    toggleAuditModal(state, { payload }) {
      return { ...state, ...payload }
    },
  }

}

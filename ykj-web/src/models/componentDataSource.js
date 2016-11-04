import { message } from 'antd';
import request, { parseError, isApiUrl } from '../utils/request';
import { searchCustomers, searchCodewordsByType, searchSubOfficesAndClerks, uploadOrderServiceAttachment, deleteOrderServiceAttachment, downloadOrderServiceAttachment, searchOrderServiceAttachment } from '../services/componentDataSource';
import { searchGoodsAllByModel } from '../services/goods'

export default {
  namespace: 'componentDataSource',

  state: {
    customers: [{
      id: '1',
      name: '用户A'
    }, {
      id: '2',
      name: '用户B'
    }],
    codewords: {
      ORDER_SOURCE: [{
        code: '1',
        value: '同行介绍'
      }, {
        code: '2',
        value: '网站'
      }]
    },
    orderServiceAttachments: [{
      id: 'eafcfa2f-9e47-11e6-9dc9-08002715879c',
      attachmentFilename: '附件1',
      attachmentSuffix: 'doc',
      uploadDate: '2016-10-12 23:00:00',
      uploadPersonName: '管理员A',
    }, {
      id: 2,
      attachmentFilename: '附件2',
      attachmentSuffix: 'txt',
      uploadDate: '2016-10-12 24:00:00',
      uploadPersonName: '管理员A',
    }]
    ,
    officeClerks: [{
      name: '杭州',
      key: '1',
      children: [{
        name: '西湖区',
        key: '1-1',
        children: [{
          name: '人员A',
          key: '1-1-1'
        }, {
          name: '人员B',
          key: '1-1-2'
        }, {
          name: '人员C',
          key: '1-1-3'
        }]
      }, {
        name: '江干区',
        key: '1-2',
        children: [{
          name: '人员A',
          key: '1-2-1',
          isLeaf: true
        }, {
          name: '人员B',
          key: '1-2-2',
          isLeaf: true
        }, {
          name: '人员C',
          key: '1-2-3',
          isLeaf: true
        }]
      }]
    }, {
      name: '绍兴',
      key: '2',
      isLeaf: false,
      children: [{
        name: '未知区',
        key: '2-1',
        children: [{
          name: '人员A',
          key: '2-1-1',
          isLeaf: true
        }, {
          name: '人员B',
          key: '2-1-2',
          isLeaf: true
        }, {
          name: '人员C',
          key: '2-1-3',
          isLeaf: true
        }]
      }]
    },]
  },

  effects: {
    /**
     * 加载客户信息
     */
    *loadCustomersData({ payload }, { put, select }) {
      const access_token = yield select(state => state.oauth.access_token);
      const { data, error } = yield searchCustomers(access_token, 'ALL');
      if (!error) {
        if (payload.callback) {
          payload.callback(data);
        } else {
          yield put({
            type: 'loadCustomerDataSourceSuccess',
            payload: {
              customers: data._embedded && data._embedded.customers || []
            }
          })
        }
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`加载客户信息失败:${err.status} ${err.message}`, 3);
      return false;
    },
    /**
     * 加载数据字典信息
     */
    *loadCodewordsData({ payload}, { put, select }) {
      const access_token = yield select(state => state.oauth.access_token);
      const { data, error } = yield searchCodewordsByType(access_token, { typeValue: payload.typeValue });
      if (!error) {
        if (payload.callback) {
          payload.callback(data);
        } else {
          yield put({
            type: 'loadCodewordDataSourceSuccess',
            payload: {
              [payload.typeValue]: data._embedded && data._embedded.codewords || []
            },
          })
        }
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`加载数据字典详情失败:${err.status} ${err.message}`, 3);
      return false;
    },
    /**
     * 加载商品信息
     */
    *loadGoodsData({ payload}, { put, select }) {
      const access_token = yield select(state => state.oauth.access_token);
      const { data, error } = yield searchGoodsAllByModel(access_token, 'ALL');
      if (!error) {
        if (payload.callback) {
          payload.callback(data);
        }
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`加载商品信息失败:${err.status} ${err.message}`, 3);
      return false;
    },
    /**
     * 加载针对树的组织及人员数据信息
     */
    *loadOfficesAndClerksDataForTree({ payload: id}, { put, select }) {
      const access_token = yield select(state => state.oauth.access_token);
      const { data, error } = yield searchSubOfficesAndClerks(access_token, id);
      if (!error) {
        if (payload.callback) {
          payload.callback(data);
        } else {
          yield put({
            type: 'loadOfficesAndClerksDataForTreeSuccess',
            payload: {
              data: data || [],
              id: id
            }
          })
        }
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`加载组织详情失败:${err.status} ${err.message}`, 3);
      return false;
    },
    /**
     * 加载订单服务单附件信息
     */
    *loadOrderServiceAttachment({payload: orderServiceId}, {select, put}) {
      const access_token = yield select(state => state.oauth.access_token);
      const { data, error } = yield searchOrderServiceAttachment(access_token, orderServiceId);

      if (!error) {
        yield put({
          type: 'loadOrderServiceAttachmentSuccess',
          payload: {
            orderServiceAttachments: data._embedded && data._embedded.orderServiceAttachments || []
          }
        })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`加载附件信息失败:${err.status} ${err.message}`, 3);
      return false;
    },
    /**
     * 上传服务单附件信息
     */
    *toUploadOrderServiceAttachment({payload}, {select, put}) {
      const access_token = yield select(state => state.oauth.access_token);
      const { data, error } = yield uploadOrderServiceAttachment(access_token, payload);

      if (!error) {
        if (payload.callback) {
          payload.callback(true);
        }
        yield put({
          type: 'loadOrderServiceAttachment',
          payload: payload.id
        })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`上传附件失败:${err.status} ${err.message}`, 3);
      if (payload.callback) {
        payload.callback(false);
      }
      return false;
    },
    /**
     * 删除订单服务单附件信息
     */
    *toDeleteOrderServiceAttachment({payload}, {select, put}) {
      const access_token = yield select(state => state.oauth.access_token);
      const { data, error } = yield deleteOrderServiceAttachment(access_token, payload.id);

      if (!error) {
        if (payload.callback) {
          payload.callback(true);
        }
        yield put({
          type: 'loadOrderServiceAttachment',
          payload: payload.id
        })
        return true;
      }

      const err = yield parseError(error);
      yield message.error(`删除附件失败:${err.status} ${err.message}`, 3);
      if (payload.callback) {
        payload.callback(false);
      }
      return false;
    },
    /**
     * 下载订单服务单附件信息
     */
    *toDownloadOrderServiceAttachment({payload}, {select, put}) {
      const access_token = yield select(state => state.oauth.access_token);
      window.open(isApiUrl(`/api/orderServiceAttachments/${payload}/download?access_token=${access_token}`))
    },

  },


  reducers: {
    /**
      * 用户信息加载成功
      */
    loadCustomerDataSourceSuccess(state, { payload }) {
      return { ...state, ...payload }
    },
    /**
      数据字典加载成功
      */
    loadCodewordDataSourceSuccess(state, { payload }) {
      let codewords = state.codewords;
      codewords = { ...codewords, ...payload };
      return { ...state, codewords }
    },
    /**
     * 树组织加载成功
     */
    loadOfficesAndClerksDataForTreeSuccess(state, {payload}) {
      let officeClerks = state.officeClerks;
      if (payload.id !== 'ALL') {
        const loop = (data) => {
          data.forEach((item) => {
            if (payload.id !== item.key) {
              if (item.children) {
                loop(item.children);
              }
            } else {
              item.children = payload.data;
            }
          });
        };
        loop(officeClerks);
      } else {
        officeClerks = payload.data;
      }
      return { ...state, officeClerks }
    },
    /**
     * 订单附件信息加载成功
     */
    loadOrderServiceAttachmentSuccess(state, {payload}) {
      return { ...state, ...payload }
    },


  }

}

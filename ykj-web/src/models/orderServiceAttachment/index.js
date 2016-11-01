import { message } from 'antd';
import request, { parseError, isApiUrl } from '../../utils/request';
import { uploadOrderServiceAttachment, deleteOrderServiceAttachment, downloadOrderServiceAttachment, searchOrderServiceAttachment } from '../../services/orderServiceAttachment';


export default {
    namespace: 'orderServiceAttachment',

    state: {
        attachments: [{
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
    },

    effects: {
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
                        attachments: data._embedded && data._embedded.orderServiceAttachments || []
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
                // if (payload.callback) {
                //     payload.callback(true);
                // }
                console.log(payload)
                yield put({
                    type: 'loadOrderServiceAttachment',
                    payload: payload.id
                })
                return true;
            }

            const err = yield parseError(error);
            yield message.error(`上传附件失败:${err.status} ${err.message}`, 3);
            // if (payload.callback) {
            //     payload.callback(false);
            // }
            return false;
        },
        /**
         * 删除订单服务单附件信息
         */
        *toDeleteOrderServiceAttachment({payload}, {select, put}) {
            const access_token = yield select(state => state.oauth.access_token);
            const { data, error } = yield deleteOrderServiceAttachment(access_token, payload.id);

            if (!error) {
                // if (payload.callback) {
                //     payload.callback(true);
                // }
                yield put({
                    type: 'loadOrderServiceAttachment',
                    payload: payload.orderServiceId
                })
                return true;
            }

            const err = yield parseError(error);
            yield message.error(`删除附件失败:${err.status} ${err.message}`, 3);
            // if (payload.callback) {
            //     payload.callback(false);
            // }
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
         * 订单附件信息加载成功
         */
        loadOrderServiceAttachmentSuccess(state, {payload}) {
            return { ...state, ...payload }
        },


    }

}

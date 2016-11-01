import React, { PropTypes, Component } from 'react';
import { Button, Table, Upload } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';

/**
 * 订单服务附件组件
 */
const OrderServiceAttachmentTable = ({...rest }) => {

    const {dataSource, uploadCallback, uploadable=true, dispatch, orderServiceId } = rest;

    const downloadAttachment = (id) => {
        dispatch({
            type: 'orderServiceAttachment/toDownloadOrderServiceAttachment',
            payload: id
        });
    }

    const deleteAttachment = (data) => {
        dispatch({
            type: 'orderServiceAttachment/toDeleteOrderServiceAttachment',
            payload: {
                id: data.id,
                orderServiceId : data.serviceId
            }
        });
    }

    const columns = [{
        title: '文件名',
        dataIndex: 'attachmentFilename',
        key: 'attachmentFilename',
        render: (text, record, index) => {
            return (
                <a href="javascript:void(0);" onClick={() => {
                    downloadAttachment(record.id);
                } }>{text}</a>
            )
        }
    }, {
        title: '文件类型',
        dataIndex: 'attachmentSuffix',
        key: 'attachmentSuffix',
    }, {
        title: '上传时间',
        dataIndex: 'uploadDate',
        key: 'uploadDate',
    }, {
        title: '上传人',
        dataIndex: 'uploadPersonName',
        key: 'uploadPersonName',
    }, {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        render: (text, record, index) => {
            return (
                <a href="javascript:void(0);" onClick={() => {
                    deleteAttachment(record);
                } }>删除</a>
            )
        }
    }];
    return (
        <div>
        { uploadable ?
            <div style={{ marginBottom: 16 }}>
                <Upload
                    beforeUpload={file => {
                        const fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onload = (e) => {
                            dispatch({
                                type: 'orderServiceAttachment/toUploadOrderServiceAttachment',
                                payload: {
                                    file: file,
                                    id: orderServiceId,
                                    callback: { uploadCallback }
                                }
                            });
                        }

                        return false;
                    } }
                    >
                    <Button type="primary">上传</Button>
                </Upload>
            </div> : ''
        }
            <Table columns={columns} dataSource={dataSource} pagination={false} />

        </div>
    )
}

export {
    OrderServiceAttachmentTable
}
import React, { PropTypes, Component } from 'react';
import { Button, Table, Upload } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';

/**
 * 订单服务附件组件
 */
export class OrderServiceAttachmentTable extends Component {

    constructor(props) {
        super(props);
        this.componentDataSourceName = "orderServiceAttachments";
        this.state = {
            orderServiceId: this.props.orderServiceId,
            uploadable: this.props.uploadable,
            loading: false
        }
    }


    componentDidUpdate() {
        if(this.state.orderServiceId != this.props.orderServiceId){
            this.setState({
                orderServiceId : this.props.orderServiceId
            })
        }
    }

    componentWillMount() {
        if (this.props.orderServiceId) {
            this.props.dispatch({
                type: 'componentDataSource/loadOrderServiceAttachment',
                payload: this.props.orderServiceId
            });
        }
    }

    componentWillUpdate() {

    }

    toUpload() {
    }

    download(id) {
        this.props.dispatch({
            type: 'componentDataSource/toDownloadOrderServiceAttachment',
            payload: id
        });
    }

    delete(id) {
        this.props.dispatch({
            type: 'componentDataSource/toDeleteOrderServiceAttachment',
            payload: {
                id: id,
                callback: this.deleteResult
            }
        });
    }

    uploadSuccess(success) {
        this.setState({
            loading: false,
            uploadable: true
        })
    }

    deleteResult(success) {
        if (success) {
            console.log("delete success")
        } else {
            console.log("delete faire")
        }

    }

    render() {
        const dataSource = this.props.componentDataSource[this.componentDataSourceName] || [];
        const columns = [{
            title: '文件名',
            dataIndex: 'attachmentFilename',
            key: 'attachmentFilename',
            render: (text, record, index) => {
                return (
                    <a href="javascript:void(0);" onClick={() => {
                        this.download(record.id);
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
                        this.delete(record.id);
                    } }>删除</a>
                )
            }
        }];
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Upload
                        {...this.props.uploadProps}
                        beforeUpload={file => {
                            this.setState({
                                loading: true,
                                uploadable: false
                            })
                            const fileReader = new FileReader();
                            fileReader.readAsDataURL(file);
                            fileReader.onload = (e) => {
                                this.props.dispatch({
                                    type: 'componentDataSource/toUploadOrderServiceAttachment',
                                    payload: {
                                        file: file,
                                        id: this.state.orderServiceId,
                                        callback: () => { this.uploadSuccess() }
                                    }
                                });
                            }

                            return false;
                        } }
                        >
                        <Button type="primary" onClick={this.toUpload}
                            disabled={!this.state.uploadable} loading={this.props.loading}
                            >上传</Button>
                    </Upload>
                </div>
                <Table columns={columns} dataSource={dataSource} pagination={false} />

            </div>
        )
    }
}

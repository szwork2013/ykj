import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Button, Icon, Tabs, Form, Input, Popconfirm, Row, Col, Modal, Checkbox } from 'antd';

import Container from '../Container';
import Box from '../Box';
import BoxTable from '../BoxTable';
import BoxTabs from '../BoxTabs';
import OperationBox from '../OperationBox';
import styles from './index.less';

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { confirm } = Modal;
const List = ({ form, storageInDetails, componentDataSource, dispatch, ...rest }) => {
    const { getFieldProps } = form;

    const formItemLayout = {
        labelCol: { span: 3},
        wrapperCol: { span: 14 },
    };

    return (
        <Container
            { ...rest }
            >
            <Box>
                <Row>
                    <Col span="8">
                        <FormItem
                            {...formItemLayout}
                            label="批次号"
                            >
                            <p>{storageInDetails.currentStorageIn.batchNumber}</p>
                        </FormItem>
                    </Col>
                </Row>
            </Box>
            <BoxTable
                noPadding
                scroll={{ x: 1000 }}
                columns={
                    [
                        {
                            title: '序号',
                            dataIndex: 'index',
                            key: 'index',
                            render: (text, record, index) => index + 1
                        },
                        {
                            title: '商品名称',
                            dataIndex: 'goodName',
                            key: 'goodName',
                            render: (text, record) => {
                                if (record.good) {
                                    return record.good.name || ''
                                } else {
                                    return ''
                                }
                            }
                        },
                        {
                            title: '型号',
                            dataIndex: 'goodModel',
                            key: 'goodModel',
                            render: (text, record) => {
                                if (record.good) {
                                    return record.good.model || ''
                                } else {
                                    return ''
                                }
                            }
                        },
                        {
                            title: '类别',
                            dataIndex: 'goodType',
                            key: 'goodType',
                            render: (text, record) => {
                                if (record.good) {
                                    return record.good.type || ''
                                } else {
                                    return ''
                                }
                            }
                        },
                        {
                            title: '状态',
                            dataIndex: 'goodOnsaleStatusText',
                            key: 'goodOnsaleStatusText',
                            render: (text, record) => {
                                if (record.good) {
                                    return record.good.onsaleStatusText
                                } else {
                                    return ''
                                }
                            }
                        },
                        {
                            title: '入库数量',
                            dataIndex: 'num',
                            key: 'num'
                        },
                        {
                            title: '成本',
                            dataIndex: 'cost',
                            key: 'cost'
                        }]
                }
                rowKey={record => record.id}
                dataSource={storageInDetails.list}
                pagination={storageInDetails.pagination}
                loading={storageInDetails.loading}
                />
        </Container>
    )
}

List.propTypes = {

}

export default Form.create({
    mapPropsToFields: (props) => {
    }
})(List);

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

const BatchDetail = ({ form, storageGoods, dispatch, ...rest }) => {
    const { getFieldProps } = form;
    const {currentItem: good} = storageGoods;
    const formItemLayout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
    };

    return (
        <Container
            { ...rest }
            >
            <Box>
                <Row>
                    <Col span="12">
                        <FormItem
                            {...formItemLayout}
                            label="商品名称"
                            >
                            <p>{good.name}</p>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem
                            {...formItemLayout}
                            label="商品型号"
                            >
                            <p>{good.model}</p>
                        </FormItem>
                    </Col>
                </Row>
            </Box>
            <BoxTable
                noPadding
                scroll={{ x: 1000 }}
                columns={
                    [{
                        title: '序号',
                        dataIndex: 'index',
                        key: 'index',
                        render: (text, record, index) => index + 1
                    },
                    {
                        title: '批次号',
                        dataIndex: 'batchNum',
                        key: 'batchNum',
                        render: (text, record, index) => {
                            if (record.storageOutId) {
                                return record.storageOutId;
                            } else if (record.storageInId) {
                                return record.storageInId;
                            }
                        }
                    },
                    {
                        title: '商品数量',
                        dataIndex: 'num',
                        key: 'num'
                    },
                    {
                        title: '成本(元)',
                        dataIndex: 'cost',
                        key: 'cost'
                    }]
                }
                rowKey={record => {
                    if (record.storageOutId) {
                        return "IN_" + record.storageOutId;
                    } else if (record.storageInId) {
                        return "OUT_" + record.storageInId;
                    }
                } }
                dataSource={storageGoods.goodBatchDetails}
                pagination={storageGoods.goodBatchDetailsPagination}
                loading={storageGoods.loading}
                />
        </Container>
    )
}

BatchDetail.propTypes = {

}

export default Form.create({
    mapPropsToFields: (props) => {
    }
})(BatchDetail);

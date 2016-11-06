import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Button, Icon, Tabs, Form, Input, Popconfirm, Row, Col, Modal, Checkbox } from 'antd';

import Container from '../Container';
import Box from '../Box';
import BoxTable from '../BoxTable';
import BoxTabs from '../BoxTabs';
import styles from './index.less';
import OperationBox from '../OperationBox';
import PayModal from './PayModal';

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { confirm } = Modal;

const List = ({ form, financeIncomes, dispatch, ...rest }) => {
    const { getFieldProps } = form;

    const formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 14 },
    };

    const options = {
      operation: [
        {
            label: "新增",
            url: '',
            type : 'primary'
        }]
    }

    return (
        <Container
            { ...rest }
            >
            <BoxTabs>
                <Form
                    horizontal
                    >
                    <Tabs defaultActiveKey="1" tabBarExtraContent={

                        <ButtonGroup>
                            <Button type="primary" onClick={() => {

                                const formData = form.getFieldsValue();
                                dispatch({
                                        type: 'financeIncomes/setQuery',
                                        payload: formData
                                    });

                            } } >查询</Button>
                            <Button type="ghost" onClick={() => {
                                form.resetFields();
                            } } >重置</Button>
                        </ButtonGroup>

                    } >
                        <TabPane tab="快捷搜索" key="1">

                            <Row gutter={1} >
                                <Col sm={6}>
                                    <FormItem
                                        { ...formItemLayout }
                                        >
                                        <Input
                                            placeholder="请输入订单号"
                                            style={{ width: 250 }}
                                            {...getFieldProps('fuzzyOrderId') }
                                            >
                                        </Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <ButtonGroup className={styles['right']}>
                                <Button type="primary" size="large"onClick={()=>{
                                    dispatch({
                                        type: 'financeIncomes/merge',
                                        payload: {
                                            currentItem : {}
                                        }
                                    });
                                   dispatch({
                                        type: 'financeIncomes/showPayModal'
                                    });
                                }}>
                                   新增
                                </Button>
                            
                            </ButtonGroup>
                        </TabPane>
                    </Tabs>
                </Form>
            </BoxTabs>
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
                            title: '收款类型',
                            render: (text, record) => {
                                if (record.orderId) {
                                    return '订单收款'
                                } else {
                                    return '其他收款'
                                }
                            }
                        },
                        {
                            title: '关联订单',
                            dataIndex: 'orderId',
                            key: 'orderId'
                        },
                        {
                            title: '总金额',
                            dataIndex: 'money',
                            key: 'money'
                        },
                        {
                            title: '摘要',
                            dataIndex: 'remark',
                            key: 'remark'
                        },
                        {
                            title: '日期',
                            dataIndex: 'recordDate',
                            key: 'recordDate'
                        },
                        {
                            title: '操作',
                            key: 'operation',
                            render: (text, record) => {
                                
                                if (record.orderId) {
                                    return (
                                        <Link to={``}><Icon type="shopping-cart" />详情</Link>
                                    )
                                } else {
                                    return (
                                        <span>
                                            <a href="javascript:void(0)" onClick={()=>{
                                                dispatch({
                                                    type: 'financeIncomes/preUpdate',
                                                    payload: record.id
                                                });
                                            }}><Icon type="edit" />编辑</a>
                                            <span className="ant-divider"></span>
                                            <Popconfirm title="确定要删除这个订单吗？" onConfirm={() => {
                                                 dispatch({
                                                        type: 'financeIncomes/delete',
                                                        payload: record.id
                                                    });
                                            } } onCancel={() => { } }>
                                                <a href="javascript:void(0)"><Icon type="delete" />删除</a>
                                            </Popconfirm>
                                        </span>
                                    )
                                }
                            }
                        }]
                }
                rowKey={record => record.id}
                dataSource={financeIncomes.list}
                pagination={financeIncomes.pagination}
                loading={financeIncomes.loading}
                />
                <PayModal
                    visible={financeIncomes.payModalShow}
                    dispatch={dispatch}
                    financeExpense={financeIncomes.currentItem}
                    onOk={(formData) => {
                        dispatch({
                            type: 'financeIncomes/addOrUpdate',
                            payload: formData
                        });
                    } }
                    >
                </PayModal>
        </Container>
        
    )
}

List.propTypes = {

}

export default Form.create({
    mapPropsToFields: (props) => {
        const query = props.financeIncomes.query;
        return {
            fuzzyOrderId: {
                value: query.fuzzyOrderId
            }
        }
    }
})(List);

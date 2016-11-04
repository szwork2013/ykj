import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Button, Icon, Tabs, Form, Input, Popconfirm, Row, Col, Modal, Checkbox } from 'antd';

import CodewordSelect from '../Common/CodewordComponent';
import GoodSotrageInTable from './GoodSotrageInTable';
import Container from '../Container';
import Box from '../Box';
import BoxTable from '../BoxTable';
import BoxTabs from '../BoxTabs';
import styles from './index.less';

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { confirm } = Modal;
const   Add = ({ form, storageIns, componentDataSource, dispatch, ...rest }) => {
    const { getFieldProps } = form;
    const {currentItem} = storageIns;

    const formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 10 },
    };

    let table = undefined;


    const getGoodStorageOutData = ()=>{
        return this.table.getDataSource();
    }

    const onSubmit = (e, form)=>{
        e.preventDefault();
        form.validateFieldsAndScroll((errors, values) => {
          if (!!errors) {
            return;
          }
		  
          const formData = form.getFieldsValue();
		  formData.storageInDetailList = table.getDataSource();
          console.log(formData)
          dispatch({
            type: 'storageIns/storageIn',
            payload: formData,
          })
        });

    }

    return (
        <Container
            { ...rest }
            >
            <Row>
                <Col span="12">
                    <h1>创建入库单</h1>
                </Col>
            </Row>
            <Box>
                <Row>
                    <Col span="12">
                        <FormItem
                            {...formItemLayout}
                            label="入库类型"
                            >
                            <CodewordSelect
                                elementProps={getFieldProps('type',{
                                    initialValue : currentItem.type
                                })}
                                type={"STORAGE_IN_TYPE"}
                                dispatch={dispatch}
                                >
                            </CodewordSelect>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem
                            {...formItemLayout}
                            label="批次号"
                            >
                            <Input
                                {...getFieldProps('batchNumber', {
                                    initialValue : currentItem.batchNumber,
                                    rules: [
                                        { required: true, message: '批次号必须填写' }
                                    ]
                                }) }
                                >
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <GoodSotrageInTable
                    {...rest}
                    dispatch={dispatch}
                    ref={(ref) => {
                        table = ref;
                    } }
                    columns={
                        [{
                            title: '序号',
                            dataIndex: 'Number',
                            key: 'Number',
                        },
                        {
                            title: '商品名称',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: '商品型号',
                            dataIndex: 'model',
                            key: 'model',
                            width: '120px',
                        },
                        {
                            title: '类别',
                            dataIndex: 'type',
                            key: 'type',
                        },
                        {
                            title: '成本',
                            dataIndex: 'cost',
                            key: 'cost',

                        },
                        {
                            title: '状态',
                            dataIndex: 'onsaleStatusText',
                            key: 'onsaleStatusText',
                        },
                        {
                            title: '数量',
                            dataIndex: 'num',
                            key: 'num',
                        },
                        {
                            title: '操作',
                            key: 'operation',
                        }]
                    }
                    type={'add'}
                    isAddable={true}
                    form={form}

                    >
                </GoodSotrageInTable>
                <Row>
                    <Col sm={24} offset={19}>
                        <FormItem { ...formItemLayout } style={{ marginTop: 24 }}>
                            <Button type="primary" htmlType="submit" onClick={(e) => {
                                onSubmit(e,form)
                            }}>确定</Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="ghost" onClick={() => dispatch(routerRedux.goBack())}>返回</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Box>

        </Container >
    )
}

Add.propTypes = {

}

export default Form.create({
    mapPropsToFields: (props) => {
        return {

        }
    }
})(Add);

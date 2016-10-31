import React, { PropTypes } from 'react';
import { Form, Input, Select, TreeSelect, Checkbox, Button, Cascader, Spin, Row, Col, Upload, Icon, DatePicker, InputNumber } from 'antd';
import { routerRedux } from 'dva/router';
import { isApiUrl } from '../../utils/request';

import Container from '../Container';
import Box from '../Box';
import OrderCustomerInfo from '../OrderService/OrderCustomerInfo'
import UploadBox from '../UploadBox';
import TreeBox from '../TreeBox';
import PositionModal from '../OrderService/PositionModal';
import { OrderServiceAttachmentTable } from '../Common/OrderServiceAttachmentComponent'
import { ClerkSelectModalInput } from '../Common/ClerkComponent'

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const Detail = ({ designs, orderService, componentDataSource,orderServiceAttachment, form, type, onSubmit, moreProps, dispatch, ...rest }) => {
    const {uploadAttachmentAble = false} = rest;
    const { loading } = designs;
    const { getFieldProps, getFieldError, isFieldValidating, setFieldsValue } = form;
    const measure = designs.currentItem;
    let fileList = [];

    const nameProps = getFieldProps('name', {
        rules: [
            { required: true, message: '设计名称必须填写' }
        ]
    });

    const clerkIdProps = getFieldProps('clerkId', {
        rules: [
            { required: true, message: '服务人员必须选择' }
        ]
    });

    const clerkNameProps = getFieldProps('clerkName', {
        rules: [
            { required: true, message: '服务人员必须选择' }
        ]
    });

    const clerkPhoneProps = getFieldProps('clerkPhone', {
    });

    const attachmentFileProps = getFieldProps('attachmentFile', {
        rules: [
        ],
        valuePropName: 'fileList',
        normalize: (e) => {
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        },
        onRemove: () => { },
        onPreview: () => { },
    });

    const needTimeProps = getFieldProps('needTime', {
        rules: [
            { required: true, message: '要求时间必须填写' }
        ]
    });

    const remarkProps = getFieldProps('remark', {
        rules: [
        ]
    });

    const idProps = getFieldProps('id', {
        rules: [
        ]
    });

    const costProps = getFieldProps('cost', {
        rules: [
            { required: true, type: 'number', message: '费用必须填写' }
        ]
    });

    const servicePositionProps = getFieldProps('servicePosition', {
        rules: [
        ]
    });

    const {  } = moreProps(getFieldProps);

    const rowItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
    }
    const fullRowLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 18 },
    }

    const saveDataToCurrentItem = () => {


    }
    
    return (

        <Container
            {...rest}
            >
            <Spin spinning={loading}>
                <Box
                    >
                    <Form horizontal >
                        <h3>订单客户资料</h3>
                        <br />
                        <OrderCustomerInfo
                            dispatch={dispatch}
                            currentOrder={designs.currentOrder}
                            />
                        <h3>设计内容</h3>
                        <br />
                        <Box>
                            <Row>
                                <Col span="12">
                                    <FormItem
                                        {...rowItemLayout}
                                        label="设计名称"
                                        hasFeedback
                                        help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
                                        >
                                        <Input type='hidden' {...idProps} disabled={designs.submiting} />
                                        <Input {...nameProps} disabled={designs.submiting} />
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem
                                        {...rowItemLayout}
                                        label="要求时间"
                                        hasFeedback
                                        help={isFieldValidating('needTime') ? '校验中...' : (getFieldError('needTime') || []).join(', ')}
                                        >
                                        <DatePicker {...needTimeProps} disabled={designs.submiting} style={{ width: '100%' }}
                                            onChange={(date, dateString) => {
                                                setFieldsValue({
                                                    needTime: dateString
                                                })
                                            } }
                                            />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <FormItem
                                        {...rowItemLayout}
                                        label="服务人员"
                                        hasFeedback
                                        help={isFieldValidating('clerkId') ? '校验中...' : (getFieldError('clerkId') || []).join(', ')}
                                        >
                                        <ClerkSelectModalInput
                                            idProps={clerkIdProps}
                                            nameProps={clerkNameProps}
                                            style={{ width: '80%' }}
                                            dispatch={dispatch}
                                            componentDataSource={componentDataSource}
                                            onOk={(value) => {
                                                setFieldsValue({
                                                    clerkPhone: value.phone,
                                                    clerkId: value.id,
                                                    clerkName: value.name
                                                })
                                            } }
                                            visible={designs.clerkTreeModalShow}
                                            onCancel={() => {
                                                dispatch({
                                                    type: 'designs/merge',
                                                    payload: {
                                                        clerkTreeModalShow: false
                                                    },
                                                });
                                            } }
                                            >
                                        </ClerkSelectModalInput>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem
                                        {...rowItemLayout}
                                        label="服务人员电话"
                                        hasFeedback
                                        help={isFieldValidating('clerkPhone') ? '校验中...' : (getFieldError('clerkPhone') || []).join(', ')}
                                        >

                                        <Input {...clerkPhoneProps} disabled={true} />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <FormItem
                                        {...rowItemLayout}
                                        label="费用"
                                        hasFeedback
                                        help={isFieldValidating('cost') ? '校验中...' : (getFieldError('cost') || []).join(', ')}
                                        >
                                        <InputNumber {...costProps} disabled={designs.submiting} style={{ width: '100%' }} />
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem
                                        {...rowItemLayout}
                                        label="服务位置"
                                        hasFeedback
                                        help={isFieldValidating('servicePosition') ? '校验中...' : (getFieldError('servicePosition') || []).join(', ')}
                                        >
                                        <a href="javascript:void(0)" onClick={() => {
                                            dispatch({
                                                type: 'designs/merge',
                                                payload: {
                                                    positionModalShow: true
                                                },
                                            });

                                        } }>
                                            签到<Icon type="environment" />
                                        </a>
                                        <span className="ant-divider"></span>
                                        <a>
                                            完成<Icon type="environment" />
                                        </a>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                    <FormItem
                                        {...fullRowLayout}
                                        label="摘要"
                                        hasFeedback
                                        help={isFieldValidating('remark') ? '校验中...' : (getFieldError('remark') || []).join(', ')}
                                        >
                                        <Input type='textarea' rows={6} {...remarkProps} />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                    <FormItem
                                        {...fullRowLayout}
                                        label="测量标记"
                                        hasFeedback
                                        help={isFieldValidating('isFinish') ? '校验中...' : (getFieldError('isFinish') || []).join(', ')}
                                        >
                                        <Checkbox disabled={true} defaultChecked={measure.status == '已安排' || false}>已安排</Checkbox>
                                        <Checkbox disabled={true} defaultChecked={measure.status == '已签到' || false}>已签到</Checkbox>
                                        <Checkbox disabled={true} defaultChecked={measure.status == '已完成' || false}>已完成</Checkbox>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Box>
                        <FormItem wrapperCol={{ span: 20, offset: 4 }} style={{ marginTop: 24 }}>
                            <Button type="primary" htmlType="submit" loading={designs.submiting} onClick={(e) => onSubmit(e, form, fileList)}>确定</Button>
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <Button type="ghost" onClick={() => dispatch(routerRedux.goBack())}>返回</Button>
                        </FormItem>
                    </Form>
                    {uploadAttachmentAble?
                    <Row >
                        <Col span="24">
                            <OrderServiceAttachmentTable
                                dispatch={dispatch}
                                dataSource={orderServiceAttachment.attachments}
                                orderServiceId={designs.currentItem.id}
                                >
                            </OrderServiceAttachmentTable>
                        </Col>
                    </Row> : ''
                    }
                </Box>
            </Spin>
            <PositionModal
                data={measure.servicePosition}
                visible={designs.positionModalShow}
                dispatch={dispatch}
                onOk={() => {
                    dispatch({
                        type: 'designs/merge',
                        payload: {
                            positionModalShow: false
                        },
                    });
                } }
                onCancle={() => {
                    dispatch({
                        type: 'designs/merge',
                        payload: {
                            positionModalShow: false
                        },
                    });
                } }
                >
            </PositionModal>
        </Container>
    )
}

Detail.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    moreProps: PropTypes.func.isRequired,
    mapPropsToFields: PropTypes.func.isRequired,
}

Detail.defaultProps = {
    onSubmit: () => { },
    moreProps: () => ({}),
    mapPropsToFields: () => ({}),
}

export default Form.create({
    mapPropsToFields: (props) => {
        const measure = props.designs.currentItem;
        return {
            id: {
                value: measure.id
            },
            name: {
                value: measure.name
            },
            clerkId: {
                value: measure.clerkId
            },
            clerkName: {
                value: measure.clerkName
            },
            clerkPhone: {
                value: measure.clerkPhone
            },
            needTime: {
                value: measure.needTime
            },
            remark: {
                value: measure.remark
            },
            cost: {
                value: measure.cost
            },
            servicePosition: {
                value: measure.servicePosition
            },
      ...props.mapPropsToFields(measure),
    }
  }
})(Detail);

import React, { PropTypes } from 'react';
import { Form, Input, Select, TreeSelect, Checkbox, Button, Cascader, Spin, Row, Col, Upload, Icon, DatePicker, InputNumber } from 'antd';
import { routerRedux } from 'dva/router';

import Container from '../Container';
import Box from '../Box';
import OrderCustomerInfo from './OrderCustomerInfo'
import UploadBox from '../UploadBox';
import TreeBox from '../TreeBox';
import PositionModal from './PositionModal';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const MeasureDetail = ({ orderService, form, type, onSubmit, moreProps, dispatch, ...rest }) => {
    const { loading } = orderService;
    const { getFieldProps, getFieldError, isFieldValidating, setFieldsValue } = form;
    const measure = orderService.currentItem;


    let fileList = [];

    const nameProps = getFieldProps('name', {
        rules: [
            { required: true, message: '测量名称必须填写' }
        ]
    });

    const clerkIdProps = getFieldProps('clerkId', {
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

    const treeData = [
      { name: '杭州', id: '1' },
      { name: '台州', id: '2' },
      { name: '湖州', id: '3' },
      { name: '张伟刚', id: '4', pId: '1' },
      { name: '许照亮', id: '5', pId: '2' },
      { name: '其味无穷', id: '6', pId: '5' },
    ]

    return (
        <Container
            {...rest}
            >
            <Spin spinning={ loading }>
                <Box
                    >
                    <Form horizontal >
                        <h3>订单客户资料</h3>
                        <br/>
                       <OrderCustomerInfo
                            dispatch={dispatch}
                            currentOrder={orderService.currentOrder}
                        />
                        <h3>测量内容</h3>
                        <br/>
                        <Box>
                            <Row>
                                <Col span="12">
                                    <FormItem
                                        {...rowItemLayout}
                                        label="测量名称"
                                        hasFeedback
                                        help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ') }
                                        >
                                        <Input {...nameProps} disabled={ orderService.submiting } />
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem
                                        {...rowItemLayout}
                                        label="要求时间"
                                        hasFeedback
                                        help={isFieldValidating('needTime') ? '校验中...' : (getFieldError('needTime') || []).join(', ') }
                                        >
                                        <DatePicker {...needTimeProps} disabled={ orderService.submiting } style={{ width: '100%' }}
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
                                        help={isFieldValidating('clerkId') ? '校验中...' : (getFieldError('clerkId') || []).join(', ') }
                                        >
                                        <TreeBox 
                                            treeData={treeData}
                                            multiple={ false }
                                            checkable={ false }
                                            changeable={ true }
                                            treeProps={ clerkIdProps }
                                            onOk={(value) => {
                                                alert(value)
                                            const { setFieldsValue } = form
                                            setFieldsValue({
                                                clerkId: value
                                            })
                                            }}
                                        /> 
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem
                                        {...rowItemLayout}
                                        label="服务人员电话"
                                        hasFeedback
                                        help={isFieldValidating('clerkPhone') ? '校验中...' : (getFieldError('clerkPhone') || []).join(', ') }
                                        >

                                        <Input {...clerkPhoneProps} />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <FormItem
                                        {...rowItemLayout}
                                        label="费用"
                                        hasFeedback
                                        help={isFieldValidating('cost') ? '校验中...' : (getFieldError('cost') || []).join(', ') }
                                        >
                                        <InputNumber {...costProps} disabled={ orderService.submiting } style={{ width: '100%' }}/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem
                                        {...rowItemLayout}
                                        label="服务位置"
                                        hasFeedback
                                        help={isFieldValidating('servicePosition') ? '校验中...' : (getFieldError('servicePosition') || []).join(', ') }
                                        >
                                        <a href="javascript:void(0)"  onClick={()=>{
                                            dispatch({
                                                type: 'orderService/merge',
                                                payload: {
                                                    positionModalShow : true
                                                },
                                            });    

                                        }}>
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
                                        help={isFieldValidating('remark') ? '校验中...' : (getFieldError('remark') || []).join(', ') }
                                        >
                                        <Input type='textarea' rows={6} {...remarkProps} />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                    <FormItem
                                        {...fullRowLayout}
                                        label="附件"
                                        hasFeedback
                                        help={isFieldValidating('attachmentId') ? '校验中...' : (getFieldError('attachmentId') || []).join(', ') }
                                        >
                                        <Upload
                                            name= "orderUpload"
                                            showUploadList={ false }
                                            disabled={ orderService.submiting }
                                            beforeUpload={ file => {
                                                form.setFieldsValue({
                                                    'orderPicture': file
                                                })
                                                return false;
                                            }}
                                        >
                                            <Button type="ghost">
                                                <Icon type="upload" /> upload
                                            </Button>
                                        </Upload>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                    <FormItem
                                        {...fullRowLayout}
                                        label="测量标记"
                                        hasFeedback
                                        help={isFieldValidating('isFinish') ? '校验中...' : (getFieldError('isFinish') || []).join(', ') }
                                        >
                                        <Checkbox disabled={true} defaultChecked={measure.isFinish || false}
                                            onChange={(e) => {
                                                setFieldsValue({
                                                    isFinish: e.target.checked
                                                })
                                            } }
                                            >已安排</Checkbox>
                                        <Checkbox disabled={true} defaultChecked={measure.isFinish || false}
                                            onChange={(e) => {
                                                setFieldsValue({
                                                    isFinish: e.target.checked
                                                })
                                            } }
                                            >已签到</Checkbox>
                                        <Checkbox disabled={true} defaultChecked={measure.isFinish || false}
                                            onChange={(e) => {
                                                setFieldsValue({
                                                    isFinish: e.target.checked
                                                })
                                            } }
                                            >已完成</Checkbox>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Box>
                        <FormItem wrapperCol={{ span: 20, offset: 4 }} style={{ marginTop: 24 }}>
                            <Button type="primary" htmlType="submit" loading={ orderService.submiting } onClick={ (e) => onSubmit(e, form,fileList) }>确定</Button>
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <Button type="ghost" onClick={ () => dispatch(routerRedux.goBack()) }>返回</Button>
                        </FormItem>
                    </Form>
                </Box>
            </Spin>
            <PositionModal
                data= {measure.servicePosition}
                visible={ orderService.positionModalShow }
                dispatch={ dispatch }
            >
            </PositionModal>
        </Container>
    )
}

MeasureDetail.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    moreProps: PropTypes.func.isRequired,
    mapPropsToFields: PropTypes.func.isRequired,
}

MeasureDetail.defaultProps = {
    onSubmit: () => { },
    moreProps: () => ({}),
    mapPropsToFields: () => ({}),
}

export default Form.create({
    mapPropsToFields: (props) => {
        const measure = props.orderService.currentItem;
        return {
            name: {
                value: measure.name
            },
            clerkId: {
                value: measure.clerkId
            },
            clerkPhone : {
                value : measure.clerkPhone
            },
            attachmentId: {
                value: measure.attachmentId
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
})(MeasureDetail);

import React, { PropTypes } from 'react';
import { Form, Input, Select, TreeSelect, Checkbox, Button, Cascader, Spin, Row, Col, Upload, Icon, DatePicker, InputNumber } from 'antd';
import { routerRedux } from 'dva/router';

import Container from '../Container';
import Box from '../Box';
import OrderCustomerInfo from '../OrderService/OrderCustomerInfo'
import InstallGoods from './InstallGoods';
import { ClerkSelectModalInput } from '../Common/ClerkComponent'

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

const Detail = (props) => {

  const { installations, installGoods, componentDataSource, customers, form, type, onSubmit, moreProps, dispatch, ...rest } = props;

  const { loading } = installations;
  const { getFieldProps, getFieldError, isFieldValidating, setFieldsValue } = form;
  const installation = installations.currentItem
  const customer = customers.current


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


  const clerkNameProps = getFieldProps('clerkName', {
    rules: [
      { required: true, message: '服务人员必须选择' }
    ]
  });

  const orderGoodNumProps = getFieldProps('orderGoodNum', {
    rules: [
      { required: true, message: '订单商品数必须填写' }
    ]
  });

  const clerkPhoneProps = getFieldProps('clerkPhone', {
  });


  const needTimeProps = getFieldProps('needTime', {
    rules: [
      { required: true, message: '要求时间必须填写' }
    ]
  });

  const serviceCostProps = getFieldProps('serviceCost', {
    rules: [
      { required: false }
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

  const isFinishProps = getFieldProps('isFinish', {
    rules: [
    ]
  });

  const isSignProps = getFieldProps('isSign', {
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
              currentOrder={installations.currentOrder}
              />
            <h3>安装安排详情</h3>
            <br />
            <Box>
              <Row>
                <Col span="12">
                  <FormItem
                    {...rowItemLayout}
                    label="业主要求时间"
                    hasFeedback
                    help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
                    >
                    <DatePicker {...needTimeProps} disabled={installations.submiting} style={{ width: '100%' }}
                      onChange={(date, dateString) => {
                        setFieldsValue({
                          needTime: dateString
                        })
                      } }
                      />
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    {...rowItemLayout}
                    label="安装师傅"
                    hasFeedback
                    help={isFieldValidating('needTime') ? '校验中...' : (getFieldError('needTime') || []).join(', ')}
                    >
                     <Input {...clerkNameProps} disabled={installations.submiting} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem
                    {...rowItemLayout}
                    label="师傅联系电话"
                    hasFeedback
                    help={isFieldValidating('clerkId') ? '校验中...' : (getFieldError('clerkId') || []).join(', ')}
                    >
                    <Input {...clerkPhoneProps} disabled={installations.submiting} />
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    {...rowItemLayout}
                    label="订单产品数"
                    hasFeedback
                    help={isFieldValidating('clerkPhone') ? '校验中...' : (getFieldError('clerkPhone') || []).join(', ')}
                    >
                    <InputNumber {...orderGoodNumProps} disabled={installations.submiting} style={{ width: '100%' }} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem
                    {...rowItemLayout}
                    label="服务费"
                    hasFeedback
                    help={isFieldValidating('cost') ? '校验中...' : (getFieldError('cost') || []).join(', ')}
                    >
                    <Input {...serviceCostProps} disabled={installations.submiting} />
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
                        type: 'measures/merge',
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
                    label="安装说明"
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
                    label="安装标记"
                    hasFeedback
                    help={isFieldValidating('isFinish') ? '校验中...' : (getFieldError('isFinish') || []).join(', ')}
                    >
                    <Checkbox disabled={true} defaultChecked={installations.status == '已安排' || false}>已安排</Checkbox>
                    <Checkbox disabled={true} defaultChecked={installations.status == '已签到' || false}>已签到</Checkbox>
                    <Checkbox disabled={true} defaultChecked={installations.status == '已完成' || false}>已完成</Checkbox>
                  </FormItem>
                </Col>
              </Row>
            </Box>
            <FormItem wrapperCol={{ span: 20, offset: 4 }} style={{ marginTop: 24 }}>
              <Button type="primary" htmlType="submit" loading={installations.submiting} onClick={(e) => onSubmit(e, form)}>确定</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={() => dispatch(routerRedux.goBack())}>返回</Button>
            </FormItem>
          </Form>
          <InstallGoods
            {...props}
            onSubmit={e => {
              e.preventDefault();
              let formData = form.getFieldsValue();
              if (type === 'edit') {
                let goods = installGoods;
                goods.deliveryId = delivery.id
                dispatch({
                  type: 'installGoods/edit',
                  payload: goods
                })
              } else {

                form.validateFieldsAndScroll((errors, values) => {
                  if (!!errors) {
                    return;
                  }
                  formData.installGoods = installGoods;
                  dispatch({
                    type: 'deliverys/add',
                    payload: formData
                  })
                });
              }
            } }
            >
          </InstallGoods>
        </Box>
      </Spin>
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
    const installation = props.installations.currentItem;
    return {
      needTime : {
        value : installation.needTime
      },
      clerkName : {
        value : installation.clerkName
      },
      clerkPhone : {
        value : installation.clerkPhone
      },
      orderGoodNum : {
        value : installation.orderGoodNum
      },
      serviceCost : {
        value : installation.serviceCost
      },
      remark : {
        value : installation.remark
      },
      status : {
        value : installation.status
      },
      ...props.mapPropsToFields(installation),
    }
  }
})(Detail);

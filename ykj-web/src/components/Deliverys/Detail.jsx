import React, { PropTypes } from 'react';
import { Form, Input, Select, TreeSelect, Checkbox, Button, Cascader, Spin, Row, Col, Upload, Icon, DatePicker, InputNumber } from 'antd';
import { routerRedux } from 'dva/router';

import Container from '../Container';
import Box from '../Box';
import BoxTable from '../BoxTable';
import OrderCustomerInfo from '../OrderService/OrderCustomerInfo'
import { ClerkSelectModalInput } from '../Common/ClerkComponent'
import { OrderServiceAttachmentTable } from '../Common/OrderServiceAttachmentComponent'

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

const Detail = (props) => {

  const { deliverys, installGoods, componentDataSource, customers, form, type, onSubmit, moreProps, dispatch, uploadAttachmentAble = true, orderServiceAttachment, ...rest } = props;

  const { loading } = deliverys;
  const { getFieldProps, getFieldError, isFieldValidating, setFieldsValue } = form;
  const delivery = deliverys.currentItem
  const customer = customers.current

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
      { required: true, message: '费用必须填写' }
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
              currentOrder={deliverys.currentOrder}
              />
            <h3>送货安排详情</h3>
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
                    <DatePicker {...needTimeProps} disabled={deliverys.submiting} style={{ width: '100%' }}
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
                    label="送货师傅"
                    hasFeedback
                    help={isFieldValidating('needTime') ? '校验中...' : (getFieldError('needTime') || []).join(', ')}
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
                      visible={deliverys.clerkTreeModalShow}
                      onCancel={() => {
                        dispatch({
                          type: 'deliverys/merge',
                          payload: {
                            clerkTreeModalShow: false
                          },
                        });
                      } }
                      >
                    </ClerkSelectModalInput>
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
                    <Input {...clerkPhoneProps} disabled={deliverys.submiting} />
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    {...rowItemLayout}
                    label="费用"
                    hasFeedback
                    help={isFieldValidating('cost') ? '校验中...' : (getFieldError('cost') || []).join(', ')}
                    >
                    <Input {...costProps} disabled={deliverys.submiting} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
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
                    label="送货说明"
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
                    label="送货标记"
                    hasFeedback
                    help={isFieldValidating('isFinish') ? '校验中...' : (getFieldError('isFinish') || []).join(', ')}
                    >
                    <Checkbox disabled={true} defaultChecked={deliverys.status == '已安排' || false}>已安排</Checkbox>
                    <Checkbox disabled={true} defaultChecked={deliverys.status == '已签到' || false}>已签到</Checkbox>
                    <Checkbox disabled={true} defaultChecked={deliverys.status == '已完成' || false}>已完成</Checkbox>
                  </FormItem>
                </Col>
              </Row>
            </Box>
            <h3>本次送货的商品列表</h3>
            <br />
            <BoxTable
              noPadding

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
                  },
                  {
                    title: '商品型号',
                    dataIndex: 'goodModel',
                    key: 'goodModel',
                  },
                  {
                    title: '单位',
                    dataIndex: 'goodUnitName',
                    key: 'goodUnitName'
                  },
                  {
                    title: '订货数量',
                    dataIndex: 'orderGoodsNum',
                    key: 'orderGoodsNum',
                  },
                  {
                    title: '未送货数量',
                    dataIndex: 'needDeliverNum',
                    key: 'needDeliverNum',
                  },
                  {
                    title: '本次送货数量',
                    dataIndex: 'deliverNum',
                    key: 'deliverNum',
                    render: (text, record, index) => {
                      return (
                        <InputNumber {...getFieldProps('serviceGoods['+index+'].deliverNum')}>

                        </InputNumber>
                      )
                    }
                  },
                  {
              title: '当前库存',
                    dataIndex: 'goodStoreNow',
                    key: 'goodStoreNow',
                  },
                  {
              title: '备注',
                    dataIndex: 'remark',
                    key: 'remark'
                  }]
              }
              rowKey={record => record.id}
            dataSource={deliverys.orderGoods}
            pagination={false}
            loading={deliverys.loading}
            />
            <FormItem wrapperCol={{ span: 20, offset: 4 }} style={{ marginTop: 24 }}>
              <Button type="primary" htmlType="submit" loading={deliverys.submiting} onClick={(e) => onSubmit(e, form)}>确定</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={() => dispatch(routerRedux.goBack())}>返回</Button>
            </FormItem>
          </Form>

          {uploadAttachmentAble ?
            <Row >
              <Col span="24">
                <OrderServiceAttachmentTable
                  dispatch={dispatch}
                  dataSource={orderServiceAttachment.attachments}
                  orderServiceId={deliverys.currentItem.id}
                  >
                </OrderServiceAttachmentTable>
              </Col>
            </Row> : ''
          }
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
    const delivery = props.deliverys.currentItem;
    return {
      name: {
        value: delivery.name
      },
      clerkId: {
        value: delivery.clerkId
      },
      needTime: {
        value: delivery.needTime
      },
      remark: {
        value: delivery.remark
      },
      cost: {
        value: delivery.cost
      },
      servicePosition: {
        value: delivery.servicePosition
      },
      ...props.mapPropsToFields(delivery),
    }
  }
})(Detail);

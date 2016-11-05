import React, { PropTypes, Component } from 'react';
import { Form, Input, Select, TreeSelect, Checkbox, Button, Cascader, Spin, Row, Col, DatePicker, Table, Icon, Popconfirm, InputNumber } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';
import classNames from 'classnames';


import Container from '../Container';
import Box from '../Box';
import TreeBox from '../TreeBox';
import TableVariable from './TableVariable';
import CustomerSelect from '../Common/CustomerComponent';
import CodewordSelect from '../Common/CodewordComponent';
import { ClerkSelectModalInput } from '../Common/ClerkComponent'


const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const InputGroup = Input.Group;

class Detail extends Component {

  constructor(props) {
    super();
    this.state = {
      currentCustOrg: undefined,
      currentCustPhone: undefined,
      currentCustFollower: undefined,
    }
  }

  getOrderGoodsData() {
    return this.table.getDataSource();
  }

  render() {
    const { orders, form, type, onSubmit, codewordTypes, currentOrderz, moreProps, dispatch, ...rest } = this.props;
    const { loading, queryCustomers, currentOrder = {}, fuzzyCustomerList = [], goodList = [], customerList = []} = orders;
    const { getFieldProps, getFieldError, isFieldValidating, setFields } = form;


    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };


    const customers = [{
      id: '1',
      name: '33'
    }]
    return (
      <Container
        {...rest}
        >
        <Spin spinning={loading}>

          <Form horizontal >
            <Box>
              <h3>基本资料</h3>
              <br />
              <Row>
                <Col sm={12}>
                  <FormItem
                    { ...formItemLayout }
                    label="订单号"
                    hasFeedback
                    help={isFieldValidating('orderNo') ? '校验中...' : (getFieldError('orderNo') || []).join(', ')}
                    >
                    <Input {...getFieldProps('orderNo', {
                      initialValue: currentOrder.batchNumber,
                      rules: [
                        { required: false }
                      ]
                    }) } size="default" style={{ width: '80%' }} disabled={true} />
                  </FormItem>
                </Col>
                <Col sm={12}>
                  <FormItem
                    { ...formItemLayout }
                    label="订单日期"
                    hasFeedback
                    help={isFieldValidating('orderDate') ? '校验中...' : (getFieldError('orderDate') || []).join(', ')}
                    >
                    <DatePicker {...getFieldProps('orderDate', {
                      initialValue: currentOrder.orderDate,
                      rules: [
                        { required: true, message: '订单日期必须填写' }
                      ]
                    }) } onChange={(date, dateString) => {
                      form.setFieldsValue({
                        orderDate: dateString,
                      })
                    } } style={{ width: '80%' }} size="default" disabled={orders.submiting} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>


                  <CustomerSelect
                    layout={formItemLayout}
                    label={"客户姓名"}
                    form={form}
                    style={{ width: '80%' }}
                    elementProps={getFieldProps('customerId', {
                      initialValue: currentOrder.customerId,
                      rules: [
                        { required: true, min: 1, message: '客户姓名不能小于1个字符' }
                      ]
                    })}
                    dispatch={dispatch}
                    onSelect={(item) => {
                      form.setFieldsValue({
                        company: item.organization || '',
                        phone: item.phone || ''
                      })
                      return true;
                    } }
                    >
                  </CustomerSelect>
                </Col>
                <Col sm={12}>
                  <FormItem
                    { ...formItemLayout }
                    label="客户单位名称"
                    >
                    <Input {...getFieldProps('company', {
                      initialValue: currentOrder.company,
                      rules: [
                        { required: false }
                      ],
                    }) } size="default" style={{ width: '80%' }} disabled={orders.submiting} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <FormItem
                    { ...formItemLayout }
                    label="客户电话"
                    >
                    <Input {...getFieldProps('phone', {
                      initialValue: currentOrder.phone,
                      rules: [
                        { required: false }
                      ],
                    }) } size="default" style={{ width: '80%' }} disabled={orders.submiting} />
                  </FormItem>
                </Col>
                <Col sm={12}>
                  <FormItem
                    { ...formItemLayout }
                    label="第二联系人电话"
                    hasFeedback
                    help={isFieldValidating('phoneSec') ? '校验中...' : (getFieldError('phoneSec') || []).join(', ')}
                    >
                    <Input {...getFieldProps('phoneSec', {
                      initialValue: currentOrder.phoneSec,
                      rules: [
                        { pattern: new RegExp(/^1[0-9]{10}$/), message: '请填写正确的第二联系人号码' },
                      ],
                    }) } size="default" style={{ width: '80%' }} disabled={orders.submiting} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <FormItem
                    { ...formItemLayout }
                    label="跟单人"
                    >
                    <ClerkSelectModalInput
                      idProps={getFieldProps('orderResponsibleId', {
                        initialValue: currentOrder.orderResponsibleId,
                        rule: [
                          { required: false, message: '请选择跟单人' }
                        ]
                      })}
                      nameProps={getFieldProps('orderResponsibleName', {
                        initialValue: currentOrder.orderResponsibleName,
                        rules: [
                          { required: false, message: '请选择跟单人' },
                        ],
                      })}
                      style={{ width: '80%' }}
                      dispatch={dispatch}
                      onOk={(value) => {
                        form.setFieldsValue({
                          orderResponsibleId: value.id,
                          orderResponsibleName: value.name
                        })
                      } }
                      >
                    </ClerkSelectModalInput>
                  </FormItem>
                </Col>
                <Col sm={12}>

                  <CodewordSelect
                    layout={formItemLayout}
                    label={"订单来源"}
                    form={form}
                    style={{ width: '80%' }}
                    elementProps={getFieldProps('orderSource', {
                      initialValue: currentOrder.orderSource,
                      rules: [
                        { required: true, message: '请选择订单来源' }
                      ],
                    })}
                    type={"ORDER_SOURCE"}
                    dispatch={dispatch}
                    >
                  </CodewordSelect>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <FormItem
                    { ...formItemLayout }
                    label="送货地址"
                    hasFeedback
                    help={isFieldValidating('address') ? '校验中...' : (getFieldError('address') || []).join(', ')}
                    >
                    <Input {...getFieldProps('address', {
                      initialValue: currentOrder.address,
                      rules: [
                        { required: true, min: 1, message: '送货地址至少 1 个字符' }
                      ],
                    }) } size="default" style={{ width: '100%' }} disabled={orders.submiting} />
                  </FormItem>
                </Col>
              </Row>
              <h3>安装配送</h3>
              <br />
              <Row>
                <Col sm={12} offset={2}>
                  <FormItem
                    { ...formItemLayout }
                    >
                    <Checkbox { ...getFieldProps('isNeedInstall') } defaultChecked onChange={(e) => {
                      form.setFieldsValue({
                        isNeedInstall: e.target.checked,
                      })
                    } } >需要安装</Checkbox>
                    <Checkbox { ...getFieldProps('isNeedDelivery') } defaultChecked onChange={(e) => {
                      form.setFieldsValue({
                        isNeedDelivery: e.target.checked,
                      })
                    } } >送货上门</Checkbox>
                  </FormItem>
                </Col>
              </Row>
              <h3>报价审核</h3>
              <br />
              <Row>
                <Col sm={12} offset={2}>
                  <FormItem
                    { ...formItemLayout }
                    >
                    <Checkbox { ...getFieldProps('isNeedAudit') } defaultChecked onChange={(e) => {
                      form.setFieldsValue({
                        isNeedAudit: e.target.checked,
                      })
                    } } >需要审核</Checkbox>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={18} offset={1}>
                  <FormItem
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 10 }}
                    label="客户备注"
                    >
                    <Input { ...getFieldProps('customerRemark') } size="default" style={{ width: '100%' }} disabled={orders.submiting} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col sm={18} offset={1}>
                  <FormItem
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 10 }}
                    label="内部备注"
                    >
                    <Input { ...getFieldProps('privateRemark') } size="default" style={{ width: '100%' }} disabled={orders.submiting} />
                  </FormItem>
                </Col>
              </Row>
            </Box>
            <TableVariable
              ref={(ref) => {
                this.table = ref;
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
                  title: '位置',
                  dataIndex: 'initPosition',
                  key: 'initPosition',
                },
                {
                  title: '单位',
                  dataIndex: 'unitText',
                  key: 'unitText',

                },
                {
                  title: '数量',
                  dataIndex: 'orderGoodsNum',
                  key: 'orderGoodsNum',
                },
                {
                  title: '原价',
                  dataIndex: 'price',
                  key: 'price',
                },
                {
                  title: '折扣率',
                  dataIndex: 'discountRate',
                  key: 'discountRate',
                  render: (text, record, index) => {
                    return <p className="ant-form-text">{isNaN((record.strikeUnitPrice / record.goodPrice).toFixed(2)) ? `1.00` : `${(record.strikeUnitPrice / record.goodPrice).toFixed(2)}`}</p>
                  }
                },
                {
                  title: '折后单价',
                  dataIndex: 'strikeUnitPrice',
                  key: 'strikeUnitPrice',
                },
                {
                  title: '小计',
                  dataIndex: 'follower',
                  key: 'follower',
                  render: (text, record, index) => {
                    return <p className="ant-form-text">{isNaN(record.orderGoodsNum * record.strikeUnitPrice) ? `0.00` : `${(record.orderGoodsNum * record.strikeUnitPrice)}`}</p>
                  }
                },
                {
                  title: '当前库存',
                  dataIndex: 'storeNow',
                  key: 'storeNow',
                },
                {
                  title: '预留库存',
                  dataIndex: 'reservedGoods',
                  key: 'reservedGoods',
                },
                {
                  title: '预留时间',
                  dataIndex: 'reservedDate',
                  key: 'reservedDate',
                },
                {
                  title: '备注',
                  dataIndex: 'remark',
                  key: 'remark',
                },
                {
                  title: '操作',
                  key: 'operation',
                }]
              }
              type={type}
              isAddable={true}
              goodList={goodList}
              goodsEditing={true}
              form={form}
              dispatch={dispatch}
              />
            <br />
            <Row>
              <Col sm={24} offset={19}>
                <FormItem { ...formItemLayout } style={{ marginTop: 24 }}>
                  <Button type="primary" htmlType="submit" loading={orders.submiting} onClick={(e) => onSubmit(e, form, this.getOrderGoodsData())}>确定</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button type="ghost" onClick={() => dispatch(routerRedux.goBack())}>返回</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Container>
    )
  }
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
    return {

    }
  }
})(Detail);

import React, { PropTypes, Component } from 'react';
import { Form, Input, Select, TreeSelect, Checkbox, Button, Cascader, Spin, Row, Col, DatePicker, Table, Icon, Popconfirm, InputNumber} from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';
import classNames from 'classnames';

import Container from '../Container';
import Box from '../Box';
import TreeBox from '../TreeBox';
import TableVariable from './TableVariable'

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
    const { orders, form, type, onSubmit,codewordTypes, moreProps, dispatch, ...rest } = this.props;
    const { loading, queryCustomers,currentOrder={} ,fuzzyCustomerList = [], goodList=[],customerList=[]} = orders;
    const { getFieldProps, getFieldError, isFieldValidating,setFields } = form;
    const orderSources = codewordTypes['ORDER_SOURCE'] || [];

    const orderNoProps = getFieldProps('orderNo', {
        rules: [
            { required: true, min: 1, message: '订单号必须填写'}
        ]
    });

    const orderDateProps = getFieldProps('orderDate', {
        rules: [
            { required: true, message: '订单日期必须填写'}
        ]
    });

    const nameProps = getFieldProps('name', {
       rules: [
            { required: true, min: 1, message: '客户姓名不能小于1个字符'}
       ]
    });

    const phoneSecProps = getFieldProps('phoneSec', {
        rules: [
            { pattern: new RegExp(/^1[0-9]{10}$/), message: '请填写正确的第二联系人号码' },
        ],
    });

    const orderResponsibleProps = getFieldProps('orderResponsibleId', {
        rules: [
            { pattern: new RegExp(/^[0-9]+$/), message: '请填写正确的QQ' },
        ],
    });

    const orderSourceProps = getFieldProps('orderSource', {
        rules: [
            { required: false, message: '请选择订单来源'}
        ],
    });

    const addressProps = getFieldProps('address', {
        rules: [
            { required: true, min: 1, message: '送货地址至少 1 个字符'}
        ],
    });

     const companyProps = getFieldProps('company', {
        rules: [
            { required: false}
        ],
    });

     const phoneProps = getFieldProps('phone', {
        rules: [
            { required: false}
        ],
    });

    const orderResponsibleIdProps = getFieldProps('orderResponsibleId', {
  		rule: [
  			{ required: false}
  		]
  	})

    const customerIdProps = getFieldProps('customerId', {
      type: 'hidden',
  		rule: [
  			{ required: false}
  		]
  	})
    
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };

    const treeData = [
      { name: '杭州', id: '1' },
      { name: '台州', id: '2' },
      { name: '湖州', id: '3' },
      { name: '张伟刚', id: '4', pId: '1' },
      { name: '许照亮', id: '5', pId: '2' },
      { name: '其味无穷', id: '6', pId: '5' },
    ]

    const customers = [{
      id : '1',
      name : '33'
    }]

    return (
      <Container
        {...rest}
      >
      <Spin spinning={ loading }>
        
          <Form horizontal >
              <Box>
                <h3>基本资料</h3>
                <br/>
                <Row>
                  <Col sm={ 12 }>
                      <FormItem
                          { ...formItemLayout }
                          label = "订单号"
                          hasFeedback
                          help={isFieldValidating('orderNo') ? '校验中...' : (getFieldError('orderNo') || []).join(', ')}
                      >
                          <Input {...orderNoProps} size="default" style={ { width: '80%'} } disabled={ orders.submiting } />
                      </FormItem>
                  </Col>
                  <Col sm={ 12 }>
                      <FormItem
                          { ...formItemLayout }
                          label = "订单日期"
                          hasFeedback
                          help={isFieldValidating('orderDate') ? '校验中...' : (getFieldError('orderDate') || []).join(', ')}
                      >
                          <DatePicker {...orderDateProps} onChange={ (date, dateString) => {
                            form.setFieldsValue({
                              orderDate: dateString,
                            })
                          } } style={ { width: '80%'} } size="default" disabled={ orders.submiting }/>
                      </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col sm={ 12 }>
                      <FormItem
                          { ...formItemLayout }
                          label = "客户姓名"
                          help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
                      >
                          <Input {...customerIdProps} type="hidden" size="default" style={ { width: '80%'} } disabled={ orders.submiting } />
                        
                          <Select {...nameProps} onBlur={ (value) => {
                            console.log(value)
                            form.setFieldsValue({
                              name: value,
                            })
                          }} onSelect={ (value, option) => {

                            customerList.map(item => {
                              if(item.id === value){
                                 form.setFieldsValue({
                                  company: item.organization || '',
                                  phone : item.phone || '',
                                  customerId : item.id || ''
                                })
                              }
                            })
                           
                            return true;
                          }} style={ { width: '80%'} } size="default" disabled={ orders.submiting }>
                           {
                            customerList.map(item => {
                              return <Option key={item.id} value={item.id}>{item.name}</Option>
                            })
                          }
                          </Select>
                      </FormItem>
                  </Col>
                  <Col sm={ 12 }>
                      <FormItem
                          { ...formItemLayout }
                          label = "客户单位名称"
                      >
                          <Input {...companyProps} size="default" style={ { width: '80%'} } disabled={ orders.submiting } />
                      </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col sm={ 12 }>
                      <FormItem
                          { ...formItemLayout }
                          label = "客户电话"   
                      >
                          <Input {...phoneProps} size="default" style={ { width: '80%'} } disabled={ orders.submiting } />
                      </FormItem>
                  </Col>
                  <Col sm={ 12 }>
                      <FormItem
                          { ...formItemLayout }
                          label = "第二联系人电话"
                          hasFeedback
                          help={isFieldValidating('phoneSec') ? '校验中...' : (getFieldError('phoneSec') || []).join(', ')}
                      >
                          <Input {...phoneSecProps} size="default" style={ { width: '80%'} } disabled={ orders.submiting } />
                      </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col sm={ 12 }>
                      <FormItem
                          { ...formItemLayout }
                          label = "跟单人"
                          hasFeedback
                          help={isFieldValidating('orderResponsibleId') ? '校验中...' : (getFieldError('orderResponsibleId') || []).join(', ')}
                      >
                          <TreeBox 
                                treeData={treeData}
                                multiple={ false }
                                checkable={ false }
                                changeable={ true }
                                treeProps={ orderResponsibleIdProps }
                                onOk={(value) => {
                                  const { setFieldsValue } = form
                                  setFieldsValue({
                                    orderResponsibleId: value
                                  })
                                }}
                              /> 
                      </FormItem>
                  </Col>
                  <Col sm={ 12 }>
                      <FormItem
                          { ...formItemLayout }
                          label = "订单来源"
                          hasFeedback
                          help={isFieldValidating('orderType') ? '校验中...' : (getFieldError('orderType') || []).join(', ')}
                      >
                          <Select {...orderSourceProps} style={ { width: '80%'} } size="default" disabled={ orders.submiting }>
                           {
                            orderSources.map(item => {
                              return <Option key={item.code} value={item.code}>{item.value}</Option>
                            })
                          }
                          </Select>
                      </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col sm={ 12 }>
                      <FormItem
                          { ...formItemLayout }
                          label = "送货地址"
                          hasFeedback
                          help={isFieldValidating('address') ? '校验中...' : (getFieldError('address') || []).join(', ')}
                      >
                          <Input {...addressProps} size="default" style={ { width: '80%'} } disabled={ orders.submiting } />
                      </FormItem>
                  </Col>
                </Row>
                <h3>安装配送</h3>
                <br/>
                <Row>
                  <Col sm={ 12 } offset={ 2 }>
                    <FormItem
                        { ...formItemLayout } 
                    >
                        <Checkbox { ...getFieldProps('isNeedInstall') } defaultChecked onChange={ (e) => {
                          form.setFieldsValue({
                            isNeedInstall: e.target.checked,
                          })
                        }} >需要安装</Checkbox>
                        <Checkbox { ...getFieldProps('isNeedDelivery') } defaultChecked onChange={ (e) => {
                          form.setFieldsValue({
                            isNeedDelivery: e.target.checked,
                          })
                        }} >送货上门</Checkbox>
                    </FormItem>
                  </Col>
                </Row>
                <h3>报价审核</h3>
                <br/>
                <Row>
                  <Col sm={ 12 } offset={ 2 }>
                    <FormItem
                        { ...formItemLayout } 
                    >
                      <Checkbox { ...getFieldProps('isNeedAudit') } defaultChecked onChange={ (e) => {
                        form.setFieldsValue({
                            isNeedAudit: e.target.checked,
                          })
                      }} >需要审核</Checkbox>   
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col sm={ 18 } offset={ 1 }>
                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 10 }}
                        label="客户备注"
                    >
                        <Input { ...getFieldProps('customerRemark') } size="default" style={ { width: '100%'} } disabled={ orders.submiting } />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col sm={ 18 } offset={ 1 }>
                    <FormItem
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 10 }} 
                        label="内部备注"
                    >
                        <Input { ...getFieldProps('privateRemark') } size="default" style={ { width: '100%'} } disabled={ orders.submiting } />
                    </FormItem>
                  </Col>
                </Row> 
            </Box>
            <TableVariable
                ref={ (ref) => {
                  this.table = ref;
                }}
                columns={
                  [{
                    title: '序号',
                    dataIndex: 'Number',
                    key: 'Number',
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
                    width: '120px',
                  },
                  {
                    title: '位置',
                    dataIndex: 'initPosition',
                    key: 'initPosition',
                  },
                  {
                    title: '单位',
                    dataIndex: 'goodUnitName',
                    key: 'goodUnitName',
                    
                  },
                  {
                    title: '数量',
                    dataIndex: 'orderGoodsNum',
                    key: 'orderGoodsNum',
                  },
                  {
                    title: '原价',
                    dataIndex: 'goodPrice',
                    key: 'goodPrice',
                  },
                  {
                    title: '折扣率',
                    dataIndex: 'discountRate',
                    key: 'discountRate',
                    render: (text, record, index) => {
                      return <p className="ant-form-text">{ isNaN((record.strikeUnitPrice/record.goodPrice).toFixed(2)) ? `1.00` : `${(record.strikeUnitPrice/record.goodPrice).toFixed(2)}`}</p>
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
                      return <p className="ant-form-text">{ isNaN(record.orderGoodsNum*record.strikeUnitPrice) ? `0.00` : `${(record.orderGoodsNum*record.strikeUnitPrice)}`}</p>
                    }
                  },
                  {
                    title: '当前库存',
                    dataIndex: 'goodStoreNow',
                    key: 'goodStoreNow',
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
                type={ type }
                isAddable={ true }
                goodList = {goodList}
                goodsEditing = {true}
                form = {form}
              />
            <br/>
            <Row>
              <Col sm={ 24 } offset={ 19 }>
                <FormItem { ...formItemLayout } style={{ marginTop: 24 }}>
                  <Button type="primary" htmlType="submit" loading={ orders.submiting } onClick={ (e) => onSubmit(e, form, this.getOrderGoodsData()) }>确定</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button type="ghost" onClick={ () => dispatch(routerRedux.goBack()) }>返回</Button>
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
  onSubmit: () => {},
  moreProps: () => ({}),
  mapPropsToFields: () => ({}),
}

export default Form.create({
  mapPropsToFields: (props) => {
    const order = props.orders.currentOrder;
    return {
      id: {
        value: order.id
      },
      createDate: {
        value: order.createDate
      },
      modifyDate: {
        value: order.modifyDate
      },
      orderResponsibleId: {
        value: order.orderResponsibleId
      },
      customerId: {
        value: order.customerId
      },
      businessId: {
        value: order.businessId
      },
      type: {
        value: order.type
      },
      orderNo: {
        value: order.orderNo
      },
      orderDate: {
        value: order.orderDate
      },
      phoneSec: {
        value: order.phoneSec
      },
      orderSource: {
        value: order.orderSource
      },
      address: {
        value: order.address
      },
      customerRemark: {
        value: order.customerRemark
      },
      privateRemark: {
        value: order.privateRemark
      },
      priceBeforeDiscount: {
        value: order.priceBeforeDiscount
      },
      priceAfterDiscount: {
        value: order.priceAfterDiscount
      },
      strikePrice: {
        value: order.strikePrice
      },
      receiptPrice: {
        value: order.receiptPrice
      },
      isNeedDelivery: {
        value: order.isNeedDelivery
      },
      isNeedInstall: {
        value: order.isNeedInstall
      },
      isNeedMeasure: {
        value: order.isNeedMeasure
      },
      isNeedDesign: {
        value: order.isNeedDesign
      },
      isDel: {
        value: order.isDel
      },
      orderGoods : {
        value : order.orderGoods
      },
      ...props.mapPropsToFields(order),
    }
  }
})(Detail);

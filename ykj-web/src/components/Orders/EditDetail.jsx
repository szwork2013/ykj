import React, { PropTypes, Component } from 'react';
import { Form, Input, Select, TreeSelect, Checkbox, Button, Cascader, Spin, Row, Col, DatePicker, Table, Icon, Popconfirm  } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';
import classNames from 'classnames';

import Container from '../Container';
import Box from '../Box';
import TreeBox from '../TreeBox'; 
import AuditModal from './AuditModal';
import TableVariable from './TableVariable';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const InputGroup = Input.Group;

class EditDetail extends Component {

  constructor(props) {
    super();
    this.state = {
      currentCustOrg: undefined,
      currentCustPhone: undefined,
      currentCustFollower: undefined,
    }
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
    const price = {a:17645.00, b:15733.00, c:1912.00}

    return (
      <Container
        {...rest}
      >
      <Spin spinning={ false }>
        
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
                          <Input {...customerIdProps} type="text" size="default" style={ { width: '80%'} } disabled={ orders.submiting } />
                        
                          
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
                <Row>
                  <Col sm={ 24 } offset={ 19 }>
                    <FormItem { ...formItemLayout } style={{ marginTop: 24 }}>
                      <Button type="primary" htmlType="submit" loading={ orders.submiting } onClick={ (e) => onSubmit(e, form) }>确定</Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button type="ghost" onClick={ () => dispatch(routerRedux.goBack()) }>返回</Button>
                    </FormItem>
                  </Col>
                </Row>
            </Box>
              <TableVariable
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
                    dataIndex: 'unit',
                    key: 'unit',
                    
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
                      return <p className="ant-form-text">{ isNaN((record.strikeUnitPrice/record.price).toFixed(2)) ? `1.00` : `${(record.strikeUnitPrice/record.price).toFixed(2)}`}</p>
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
                  type = {"edit"}
                  goodList = {orders.goodList}
                  isAddable = {true}
                  goodsEditing={true}
                  dataSource = {currentOrder.orderGoods}
                  dispatch={dispatch}
                  orderId = {currentOrder.id}
                  onOk={ (orderGoods) => {
                    this.setState({
                      orderGoods: orderGoods,
                    })
                  }}
                />
                <Row>
                    <Col sm={ 24 } offset={ 19 }>
                    <FormItem { ...formItemLayout } style={{ marginTop: 24 }}>
                        <Button type="primary" htmlType="submit" loading={ orders.submiting } onClick={ (e) => onSubmit(e, form) }>确定</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={ () => dispatch(routerRedux.goBack()) }>返回</Button>
                    </FormItem>
                    </Col>
                </Row>
            <Box>
              <h3>收款/退款记录</h3>
              <br/>
              <Table
                  columns={
                    [{
                      title: '序号',
                      dataIndex: 'id',
                      key: 'id',
                      render: (text, record, index) => {
                        return `${index + 1}`;
                      }
                    },
                    {
                      title: '类目',
                      dataIndex: 'categoryName',
                      key: 'categoryName',
                    },
                    {
                      title: '金额',
                      dataIndex: 'payment',
                      key: 'payment',
                    },
                    {
                      title: '付款方式',
                      dataIndex: 'payWayName',
                      key: 'payWayName',
                    },
                    {
                      title: '摘要',
                      dataIndex: 'remark',
                      key: 'remark',
                    },
                    {
                      title: '记录人',
                      dataIndex: 'recorderName',
                      key: 'recorderName',
                    },
                    {
                      title: '日期',
                      dataIndex: 'recorderDate',
                      key: 'recorderDate',
                    }]
                  }
                  dataSource = {currentOrder.orderRevenueAndRefunds}
                  style={ { width: '85%', marginLeft: '90px'} }
                />
                <Row>
                  <Col sm={ 24 } offset={ 14 }>
                    <FormItem { ...formItemLayout } style={{ marginTop: 24 }}>
                      <p className="ant-form-text" >{ `成交价格（${price.a}）- 已收款（${price.b}）= 未收款（${price.c}）（单位：元）` }</p>
                    </FormItem>
                  </Col>
                </Row>
            </Box>
            <Box>
              <h3>测量设计信息</h3>
              <br/>
              <Table
                  columns={
                    [{
                      title: '序号',
                      dataIndex: 'id',
                      key: 'id',
                      render: (text, record, index) => {
                        return `${index + 1}`;
                      }
                    },
                    {
                      title: '文件名',
                      dataIndex: 'attachmentFilename',
                      key: 'attachmentFilename',
                      render: (text, record) => {
                        return <a href="javascript:void(0)" onClick={ () => {
                          dispatch({

                          });
                        }} >{ `${text}` }</a>
                      }
                    },
                    {
                      title: '文件大小',
                      dataIndex: 'attachmentSize',
                      key: 'attachmentSize',
                    },
                    {
                      title: '上传者',
                      dataIndex: 'uploadPersonName',
                      key: 'uploadPersonName',
                    },
                    {
                      title: '上传日期',
                      dataIndex: 'uploadDate',
                      key: 'uploadDate',
                    },
                    {
                      title: '备注',
                      dataIndex: 'remark',
                      key: 'remark',
                    },
                    {
                      title: '操作',
                      key: 'operation',
                      render: (text, record, index) =>{
                        <span>
                          <Popconfirm title="确定要删除这个选项吗？" onConfirm={ () => {
                            
                            dispatch({
                              type: 'orders/deleteOne',
                              payload: record.id,
                            })

                          } } onCancel={() => {} }>
                            <a href="#"><Icon type="delete" />删除</a>
                          </Popconfirm>
                        </span>
                      }
                    }]
                  }
                  style={ { width: '85%', marginLeft: '90px'} }
                />
            </Box>
            <Box>
              <h3>退补货信息</h3>
              <br/>
              <Table
                  columns={
                    [{
                      title: '序号',
                      dataIndex: 'id',
                      key: 'id',
                      render: (text, record, index) => {
                        return `${index + 1}`;
                      }
                    },
                    {
                      title: '商品名称',
                      dataIndex: 'goodsName',
                      key: 'goodsName',
                    },
                    {
                      title: '品牌',
                      dataIndex: 'supplierName',
                      key: 'supplierName',
                    },
                    {
                      title: '商品型号',
                      dataIndex: 'model',
                      key: 'model',
                    },
                    {
                      title: '单位',
                      dataIndex: 'unit',
                      key: 'unit',
                    },
                    {
                      title: '退货数量',
                      dataIndex: 'rarNums',
                      key: 'rarNums',
                    },
                    {
                      title: '补货数量',
                      dataIndex: 'rarsNums',
                      key: 'rarsNums',
                    },
                    {
                      title: '成交单价',
                      dataIndex: 'strikeUnitPrice',
                      key: 'strikeUnitPrice',
                    },
                    {
                      title: '金额',
                      dataIndex: 'money',
                      key: 'money',
                    },
                    {
                      title: '操作',
                      key: 'operation',
                      render: (text, record, index) =>{
                        <span>
                          <Popconfirm title="确定要删除这个选项吗？" onConfirm={ () => {
                            
                            dispatch({
                              type: 'orders/deleteOne',
                              payload: record.id,
                            })

                          } } onCancel={() => {} }>
                            <a href="#"><Icon type="delete" />删除</a>
                          </Popconfirm>
                        </span>
                      }
                    }]
                  }
                  style={ { width: '85%', marginLeft: '90px'} }
                />
            </Box>
          </Form>
      </Spin>
      <AuditModal
        visible={ orders.AuditModalShow }
        dispatch={ dispatch }
        orders={ orders }
        onOk={ () => {
          dispatch({
            type: 'orders/audit',
            payload: {},
          });
        }}
      >
      </AuditModal>
      </Container>
    )
  }
}

EditDetail.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  moreProps: PropTypes.func.isRequired,
  mapPropsToFields: PropTypes.func.isRequired,
}

EditDetail.defaultProps = {
  onSubmit: () => {},
  moreProps: () => ({}),
  mapPropsToFields: () => ({}),
}

export default Form.create({
  mapPropsToFields: (props) => {
    const order = props.orders.currentOrder;
    console.log(order)
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
      name: {
        value: order.customerId
      },                        
      company : {
         value: order.organization
      },
      phone : {
         value: order.customerPhone
      },
      phoneSec : {
         value: order.phoneSec
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
        value: `${order.orderSource}`
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
})(EditDetail);

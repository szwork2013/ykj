import React, { PropTypes, Component } from 'react';
import { Form, Input, Select, TreeSelect, Checkbox, Button, Cascader, Spin, Row, Col, DatePicker, Table, Icon, Popconfirm } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';
import classNames from 'classnames';

import Container from '../Container';
import Box from '../Box';
import TreeBox from '../TreeBox';
import AuditModal from './AuditModal';
import TableVariable from './TableVariable';
import CustomerSelect from '../Common/CustomerComponent';
import CodewordSelect from '../Common/CodewordComponent';
import { ClerkSelectModalInput } from '../Common/ClerkComponent'

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
    const { orders, form, type, onSubmit, codewordTypes, moreProps, dispatch, ...rest } = this.props;
    const { loading, queryCustomers, currentOrder = {}, fuzzyCustomerList = [], goodList = [], customerList = []} = orders;
    const { getFieldProps, getFieldError, isFieldValidating, setFields } = form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };

    const {orderGoods} = currentOrder;

    const getGoodDataSource = () => {
      var goods = []
      orderGoods.map((item) =>{
        goods.push(item.good)
      })

      return goods
    }

    return (
      <Container
        {...rest}
        >
        <Spin spinning={false}>

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
                      initialValue: currentOrder.orderNo,
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
                      console.log(item)
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
                      initialValue: (currentOrder.customer?currentOrder.customer.organization:''),
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
                      initialValue: currentOrder.customer?currentOrder.customer.phone:'',
                      rules: [
                        {required:false },
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
                        initialValue: currentOrder.orderResponsibleClerk?currentOrder.orderResponsibleClerk.id:'',
                        rule: [
                          { required: false, message: '请选择跟单人' }
                        ]
                      })}
                      nameProps={getFieldProps('orderResponsibleName', {
                        initialValue: currentOrder.orderResponsibleClerk?currentOrder.orderResponsibleClerk.name:'',
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
                      initialValue: `${currentOrder.orderSource}`,
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
                    <Input { ...getFieldProps('customerRemark',{
                      initialValue: currentOrder.customerRemark,
                    }) } size="default" style={{ width: '100%' }} disabled={orders.submiting} />
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
                    <Input { ...getFieldProps('privateRemark',{
                      initialValue: currentOrder.customerRemark,
                    }) } size="default" style={{ width: '100%' }} disabled={orders.submiting} />
                  </FormItem>
                </Col>
              </Row>
            </Box>
            {
              currentOrder.orderGoods?
              <TableVariable
              ref={(ref) => {
                this.table = ref;
              } }
              dataSource={currentOrder.orderGoods}
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
                  render : (text,record) => {
                    if(text){
                      return text;
                    }
                    if(record.good){
                      return record.good.name||'';
                    }else{
                      return '';
                    }
                  }
                },
                {
                  title: '商品型号',
                  dataIndex: 'model',
                  key: 'model',
                  width: '120px',
                  getText : (record) => {
                    if(record.good){
                      return record.good.model||'';
                    }else{
                      return '';
                    }
                  }
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
                  render : (text,record) => {
                    if(text){
                      return text;
                    }
                    if(record.good){
                      return record.good.unitText||'';
                    }else{
                      return '';
                    }
                  }

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
                   render : (text,record) => {
                     if(text){
                      return text;
                    }
                    if(record.good){
                      return record.good.price||'';
                    }else{
                      return '';
                    }
                  }
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
                   render : (text,record) => {
                     if(text){
                      return text;
                    }
                    if(record.good && record.good.storageGoodStatus){
                      return record.good.storageGoodStatus.storeNow||'';
                    }else{
                      return '';
                    }
                  }
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
                  title: '已出库数',
                  dataIndex: '',
                  key: '',
                },
                {
                  title: '操作',
                  key: 'operation',
                  dataIndex : 'id'
                }]
              }
              type={type}
              isAddable={true}
              form={form}
              dispatch={dispatch}
              />
              : ''
            }
            
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
            <Box>
              <h3>收款/退款记录</h3>
              <br />
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
                dataSource={currentOrder.orderRevenueAndRefunds}
                style={{ width: '85%', marginLeft: '90px' }}
                />
              <Row>
                <Col sm={24} offset={14}>
                  <FormItem { ...formItemLayout } style={{ marginTop: 24 }}>
                    <p className="ant-form-text" >{`成交价格（）- 已收款（）= 未收款（）（单位：元）`}</p>
                  </FormItem>
                </Col>
              </Row>
            </Box>
            <Box>
              <h3>测量设计信息</h3>
              <br />
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
                      return <a href="javascript:void(0)" onClick={() => {
                        dispatch({

                        });
                      } } >{`${text}`}</a>
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
                    render: (text, record, index) => {
                      <span>
                        <Popconfirm title="确定要删除这个选项吗？" onConfirm={() => {

                          dispatch({
                            type: 'orders/deleteOne',
                            payload: record.id,
                          })

                        } } onCancel={() => { } }>
                          <a href="#"><Icon type="delete" />删除</a>
                        </Popconfirm>
                      </span>
                    }
                  }]
                }
                dataSource={currentOrder.orderServiceAttachments}
                style={{ width: '85%', marginLeft: '90px' }}
                />
            </Box>
            <Box>
              <h3>退补货信息</h3>
              <br />
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
                    render: (text, record, index) => {
                      <span>
                        <Popconfirm title="确定要删除这个选项吗？" onConfirm={() => {

                          dispatch({
                            type: 'orders/deleteOne',
                            payload: record.id,
                          })

                        } } onCancel={() => { } }>
                          <a href="#"><Icon type="delete" />删除</a>
                        </Popconfirm>
                      </span>
                    }
                  }]
                }
                style={{ width: '85%', marginLeft: '90px' }}
                />
            </Box>
          </Form>
        </Spin>
        <AuditModal
          visible={orders.AuditModalShow}
          dispatch={dispatch}
          orders={orders}
          onOk={() => {
            dispatch({
              type: 'orders/audit',
              payload: {},
            });
          } }
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
  onSubmit: () => { },
  moreProps: () => ({}),
  mapPropsToFields: () => ({}),
}

export default Form.create({
  mapPropsToFields: (props) => {
    console.log(props.orders.currentOrder)
    return {
      
    }
  }
})(EditDetail);

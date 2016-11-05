import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Button, Icon, Tabs, Form, Input, Popconfirm, Row, Col, Modal, Select, DatePicker } from 'antd';

import Container from '../Container';
import Box from '../Box';
import BoxTable from '../BoxTable';
import BoxTabs from '../BoxTabs';
import OperationBox from '../OperationBox';
import FinishModal from './FinishModal';
import AuditModal from './AuditModal';
import PayModal from './PayModal';
import UploadModal from './UploadModal';
import FollowModal from './FollowModal';
import Search from './Search';

import styles from './index.less';

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const { confirm } = Modal;
const List = (props) => {
  const { items, orders, form, children, dispatch, codewordTypes, ...rest } = props;
  const { getFieldProps } = form;



  const onTableChange = (pagination, filters, sorter) => {
    dispatch({
      type: 'orders/setQuery',
      payload: {
        page: pagination.current,
        sort: sorter.field ? `${sorter.field},${sorter.order}` : undefined,
      },
    });
  }



  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };
  return (
    <Container
      { ...rest }
      >
      <Search  {...props} />
      <BoxTable
        noPadding

        columns={
          [
            {
              title: '序号',
              dataIndex: 'id',
              key: 'id',
              render: (text, record, index) => {
                return `${index + 1}`
              }
            },
            {
              title: '订单号',
              dataIndex: 'orderNo',
              key: 'orderNo',
            },
            {
              title: '状态',
              dataIndex: 'type',
              key: 'type',
              render: (text, record, index) => {
                return text == 0 ? `预订单` : (
                  text == 1 ? `进行中` : (
                    text == 2 ? `已完成` : (
                      text == 3 ? `退单` : `暂无`
                    )
                  )
                )
              }
            },
            {
              title: '付款状态',
              dataIndex: 'payStatus',
              key: 'payStatus',

            },
            {
              title: '下单时间',
              dataIndex: 'orderDate',
              key: 'orderDate',
            },
            {
              title: '送货地址',
              dataIndex: 'address',
              key: 'address',
            },
            {
              title: '订单来源',
              dataIndex: 'orderSourceText',
              key: 'orderSourceText',
            },
            {
              title: '跟单人',
              dataIndex: 'orderResponsibleName',
              key: 'orderResponsibleName',
              render : (text,record) =>{
                if(record.orderResponsibleClerk){
                  return record.orderResponsibleClerk.name||''
                }else{
                  return ''
                }
              }
            },
            {
              title: '操作',
              key: 'operation',
              width: 680,
              render: (text, record) => (
                <span>
                  <Link to={`/order/orders/${record.id}/deliverys`}><Icon type="shopping-cart" />送货</Link>
                  <span className="ant-divider"></span>
                  <Link to={`/order/orders/${record.id}/installations`}><Icon type="download" />安装</Link>
                  <span className="ant-divider"></span>
                  <Link to={`/order/orders/print/${record.id}`}><Icon type="file" />打印</Link>
                  <span className="ant-divider"></span>
                            <Link to={`/order/orders/edit/${record.id}`}><Icon type="edit" />编辑</Link>
                            <span className="ant-divider"></span>
                        <Popconfirm title="确定要删除这个订单吗？" onConfirm={() => {
                    dispatch({
                      type: 'orders/deleteOne',
                      payload: record.id,
                    })

                  } } onCancel={() => { } }>
                    <a href="#"><Icon type="delete" />删除</a>
                  </Popconfirm>
                  <span className="ant-divider"></span>
                  <a href="javascript:void(0)" onClick={() => {
                    dispatch({
                      type: 'orders/toFinishOrder',
                      payload: {
                        id: record.id
                      }
                    });
                  } } ><Icon type="check-circle-o" />完成</a>
                  <span className="ant-divider"></span>
                  <a href="javascript:void(0)" onClick={() => {
                    dispatch({
                      type: 'orders/toFollow',
                      payload: {
                        currentOrderId: record.id,
                      }
                    });
                  } } ><Icon type="eye-o" />跟踪</a>
                  <span className="ant-divider"></span>

                  <a href="javascript:void(0)" onClick={() => {
                    dispatch({
                      type: 'orders/toUpload',
                      payload: {
                        currentOrder: {
                          id: record.id
                        }
                      }
                    });
                  } } ><Icon type="upload" />订单上传</a>
                  <span className="ant-divider"></span>
                  <Link to={`/order/orders/${record.id}/measures`}><Icon type="calculator" />测量</Link>
                  <span className="ant-divider"></span>
                  <Link to={`/order/orders/${record.id}/designs`}><Icon type="picture" />设计</Link>
                  <span className="ant-divider"></span>
                  <a href="javascript:void(0)" onClick={() => {
                    dispatch({
                      type: 'orders/toAudit',
                      payload: {
                        currentOrder: {
                          id: record.id
                        }
                      }
                    });
                  } } ><Icon type="clock-circle-o" />审核</a>
                  <span className="ant-divider"></span>
                  <a href="javascript:void(0)" onClick={() => {
                    dispatch({
                      type: 'orders/toRevenueOrder',
                      payload: {
                        currentOrder: {
                          id: record.id
                        }
                      },
                    });
                  } } ><Icon type="pay-circle-o" />付款</a>
                  <span className="ant-divider"></span>
                  <Popconfirm title="确定要针对当前订单退单吗？" onConfirm={() => {
                    dispatch({
                      type: 'orders/cancelOrder',
                      payload: record.id,
                    })

                  } } onCancel={() => { } }>
                    <a href="#"><Icon type="logout" />退单</a>
                  </Popconfirm>
                  <span className="ant-divider"></span>

                </span>
              ),
            }]
        }
        rowKey={record => record.id}
        dataSource={orders.orders}
        pagination={orders.pagination}
        loading={orders.loading}
        onChange={onTableChange}
        />
      <FollowModal
        visible={orders.FollowModalShow}
        dispatch={dispatch}

        >
      </FollowModal>
      <UploadModal
        visible={orders.UploadModalShow}
        dispatch={dispatch}
        orders={orders}
        submiting={orders.submiting}
        >
      </UploadModal>
      <PayModal
        visible={orders.payModalShow}
        dispatch={dispatch}
        currnetOrder={orders.currentOrder}
        submiting={orders.submiting}
        codewordTypes={codewordTypes}
        >
      </PayModal>
      <FinishModal
        visible={orders.finishModalShow}
        dispatch={dispatch}
        currnetOrder={orders.currentOrder}
        submiting={orders.submiting}
        >
      </FinishModal>
      <AuditModal
        visible={orders.AuditModalShow}
        dispatch={dispatch}
        orders={orders}
        >
      </AuditModal>
    </Container>
  )
}

List.propTypes = {

}

export default Form.create({
  mapPropsToFields: (props) => {
    const query = props.orders.query;
    return {
      createDate: {
        value: query.createDate
      },
      orderResponsibleId: {
        value: query.orderResponsibleId
      },
      orderNo: {
        value: query.orderNo
      },
    }
  }
})(List);

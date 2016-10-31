import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Button, Icon, Tabs, Form, Input, Popconfirm, Row, Col, Modal, Checkbox } from 'antd';

import Container from '../Container';
import Box from '../Box';
import BoxTable from '../BoxTable';
import BoxTabs from '../BoxTabs';

import OrderCustomerInfo from '../OrderService/OrderCustomerInfo'
import PositionModal from '../OrderService/PositionModal';
import OperationBox from '../OperationBox';
import { OrderServiceAttachmentTable } from '../Common/OrderServiceAttachmentComponent'

import styles from './index.less';

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { confirm } = Modal;
const List = ({ form, measures, orderServiceAttachment, orderService, dispatch, ...rest }) => {
  const { getFieldProps } = form;
  const currentOrder = measures.currentOrder;
  const onTableChange = (pagination, filters, sorter) => {
    dispatch({
      type: 'measures/setQuery',
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
      <h3>订单客户资料</h3>
      <br />
      <OrderCustomerInfo
        dispatch={dispatch}
        currentOrder={measures.currentOrder}
        />
      <Row>
        <Col span={12}><h3>测量历史</h3></Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button type="primary" size="large">
            <Link to={`/order/orders/${rest.params.id}/measures/add`}>创建测量安排</Link>
          </Button>
        </Col>
      </Row>
      <BoxTable
        noPadding
        scroll={{ x: 1000 }}
        columns={
          [
            {
              title: '序号',
              dataIndex: 'index',
              key: 'index',
              render: (text, record, index) => index + 1
            },
            {
              title: '测量名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '状态',
              dataIndex: 'status',
              key: 'status'
            },
            {
              title: '服务位置',
              dataIndex: 'servicePosition',
              key: 'servicePosition',
              render: (text, record, index) => {
                return <a href="javascript:void(0)" onClick={() => {
                  dispatch({
                    type: 'measures/merge',
                    payload: {
                      positionModalShow: true,
                      currentItem: {
                        servicePosition: text
                      }
                    },
                  });

                } }>
                  <Icon type="environment" />
                </a>
              }
            },
            {
              title: '服务时间',
              dataIndex: 'serviceTime',
              key: 'serviceTime',
            },
            {
              title: '服务人员',
              dataIndex: 'clerkName',
              key: 'clerkName',
            },
            {
              title: '附件',
              dataIndex: 'id',
              key: 'id',
              render: (text, record, index) => {
                return <a href="javascript:void(0)" onClick={() => {
                  dispatch({
                    type: 'measures/merge',
                    payload: {
                      attachmentModalShow: true,
                      currentItem: {
                        id: text
                      }
                    },
                  })
                  dispatch({
                    type: 'orderServiceAttachment/loadOrderServiceAttachment',
                    payload: text
                  })

                } }>
                  <Icon type="file" />
                </a>
              }

            },
            {
              title: '服务评价星级',
              dataIndex: 'starLevel',
              key: 'starLevel',
            },
            {
              title: '费用',
              dataIndex: 'cost',
              key: 'cost',
            },
            {
              title: '结算标志',
              dataIndex: 'isClear',
              key: 'isClear',
              render: (text, record, index) => {
                return (
                  text
                    ?
                    <Popconfirm title="确定要取消结算标识吗？" onConfirm={() => {
                      dispatch({
                        type: 'measures/cancelStatement',
                        payload: record.id,
                      })

                    } } onCancel={() => { } }>
                      <Checkbox checked={text}></Checkbox>
                    </Popconfirm>
                    :
                    <Popconfirm title="确定要确认结算标识吗？" onConfirm={() => {
                      dispatch({
                        type: 'measures/statement',
                        payload: record.id,
                      })

                    } } onCancel={() => { } }>
                      <Checkbox checked={text}></Checkbox>
                    </Popconfirm>
                )
              }
            },
            {
              title: '摘要',
              dataIndex: 'remark',
              key: 'remark',
            },
            {
              title: '操作',
              key: 'operation',
              render: (text, record) => (
                <span>
                  <Link to={`/order/orders/${rest.params.id}/measures/edit/${record.id}`}><Icon type="edit" />编辑</Link>
                  <span className="ant-divider"></span>
                  <Popconfirm title="确定要删除这个测量安排吗？" onConfirm={() => {

                    dispatch({
                      type: 'measures/deleteOne',
                      payload: record.id,
                    })

                  } } onCancel={() => { } }>
                    <a href="#"><Icon type="delete" />删除</a>
                  </Popconfirm>
                </span>
              ),
            }]
        }
        rowKey={record => record.id}
        dataSource={measures.list}
        pagination={measures.pagination}
        loading={measures.loading}
        onChange={onTableChange}
        />
      <PositionModal
        data={measures.currentItem.servicePosition}
        visible={measures.positionModalShow}
        dispatch={dispatch}
        onOk={() => {
          dispatch({
            type: 'measures/merge',
            payload: {
              positionModalShow: false
            },
          });
        } }
        onCancle={() => {
          dispatch({
            type: 'measures/merge',
            payload: {
              positionModalShow: false
            },
          });
        } }
        >
      </PositionModal>
      <Modal
        visible={measures.attachmentModalShow}
        dispatch={dispatch}
        onCancel={() => {
          dispatch({
            type: 'measures/merge',
            payload: {
              attachmentModalShow: false
            },
          });
        } }
        onOk={() => {
          dispatch({
            type: 'measures/merge',
            payload: {
              attachmentModalShow: false
            },
          });
        } }
        >
        <OrderServiceAttachmentTable
          dataSource={orderServiceAttachment.attachments}
          dispatch={dispatch}
          uploadable = {false}
          orderServiceId={measures.currentItem.id}
          >
        </OrderServiceAttachmentTable>
      </Modal>
    </Container>
  )
}

List.propTypes = {

}

export default Form.create({
  mapPropsToFields: (props) => {
  }
})(List);

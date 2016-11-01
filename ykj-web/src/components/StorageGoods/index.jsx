import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Button, Icon, Tabs, Form, Input, Popconfirm, Row, Col, Modal, Checkbox } from 'antd';

import Container from '../Container';
import Box from '../Box';
import BoxTable from '../BoxTable';
import BoxTabs from '../BoxTabs';
import OperationBox from '../OperationBox';
import styles from './index.less';

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { confirm } = Modal;
const List = ({ form, storageGoods, componentDataSource, dispatch, ...rest }) => {
  const { getFieldProps } = form;

  const onTableChange = (pagination, filters, sorter) => {
    dispatch({
      type: 'storageGoods/setQuery',
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

  const options = {
    operation: [
      {
        label: "新增商品",
        url: '',
      },
      {
        label: "入库操作",
        url: '',
      },
      {
        label: "出库操作",
        url: '',
      },
      {
        label: "库存导入",
        url: '',
      },
      {
        label: "库存导出",
        url: '',
      },
      {
        label: "入库历史",
        url: '/storage/storageIns',
      },
      {
        label: "出库历史",
        url: '/storage/storageOuts',
      },
      {
        label: "库存盘点",
        url: '',
      },
      {
        label: "采购",
        url: '',
      },
      {
        label: "未发货订单列表",
        url: '',
      }
    ]
  }

  return (
    <Container
      { ...rest }
      >
      <BoxTabs>
        <Form
          horizontal
          >
          <Tabs defaultActiveKey="1" tabBarExtraContent={

            <ButtonGroup>
              <Button type="primary" onClick={() => {

                const formData = form.getFieldsValue();
                console.log(formData);
              } } >查询</Button>
              <Button type="ghost" onClick={() => {
                form.resetFieldsValue();
              } } >重置</Button>
            </ButtonGroup>

          } >
            <TabPane tab="快捷搜索" key="1">

              <Row gutter={1} >
                <Col sm={6}>
                  <FormItem
                    { ...formItemLayout }
                    >
                    <Input
                      placeholder="请输入商品名称"
                      style={{ width: 250 }}
                      >
                    </Input>
                  </FormItem>
                </Col>
                <Col sm={4}>
                  <FormItem
                    { ...formItemLayout }
                    >
                    <Input
                      placeholder="请输入关键字"
                      style={{ width: 250 }}
                      >
                    </Input>
                  </FormItem>
                </Col>
              </Row>
              <OperationBox options={options} />
            </TabPane>
          </Tabs>
        </Form>
      </BoxTabs>
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
              title: '商品名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '商品型号',
              dataIndex: 'status',
              key: 'status'
            },
            {
              title: '原价',
              dataIndex: 'servicePosition',
              key: 'servicePosition'
            },
            {
              title: '库存数量',
              dataIndex: 'serviceTime',
              key: 'serviceTime',
            },
            {
              title: '预留库存数',
              dataIndex: 'clerkName',
              key: 'clerkName',
            },
            {
              title: '未发货商品数',
              dataIndex: 'id',
              key: 'id'
            },
            {
              title: '已出库商品数',
              dataIndex: 'starLevel',
              key: 'starLevel',
            },
            {
              title: '当前可用库存',
              dataIndex: 'cost',
              key: 'cost',
            },
            {
              title: '需补充库存数',
              dataIndex: 'isClear',
              key: 'isClear'
            },
            {
              title: '状态',
              dataIndex: 'remark',
              key: 'remark',
            },
            {
              title: '更新时间',
              dataIndex: 'remark2',
              key: 'remark2',
            },
            {
              title: '操作',
              key: 'operation',
              render: (text, record) => (
                <span>
                  <Link to={`/order/orders/${rest.params.id}/measures/edit/${record.id}`}><Icon type="edit" />编辑</Link>
                  <span className="ant-divider"></span>
                  <Popconfirm title="确定要删除这个商品信息吗？" onConfirm={() => {

                  } } onCancel={() => { } }>
                    <a href="#"><Icon type="delete" />删除</a>
                  </Popconfirm>
                  <span className="ant-divider"></span>
                  <Link ><Icon type="edit" />商品属性</Link>
                  <span className="ant-divider"></span>
                  <Link to={`/storage/storageGoods/storageIns/${record.id}`}><Icon type="edit" />入库历史</Link>
                  <span className="ant-divider"></span>
                  <Link to={`/storage/storageGoods/storageOuts/${record.id}`}><Icon type="edit" />出库历史</Link>
                  <span className="ant-divider"></span>
                  <Link to={`/storage/storageGoods/batchDetail/${record.id}`}><Icon type="edit" />批次明细</Link>
                </span>
              ),
            }]
        }
        rowKey={record => record.id}
        dataSource={storageGoods.list}
        pagination={storageGoods.pagination}
        loading={storageGoods.loading}
        onChange={onTableChange}
        />
    </Container>
  )
}

List.propTypes = {

}

export default Form.create({
  mapPropsToFields: (props) => {
  }
})(List);

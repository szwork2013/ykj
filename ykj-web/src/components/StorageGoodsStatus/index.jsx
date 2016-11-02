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
const List = ({ form, storageGoodsStatus, componentDataSource, dispatch, ...rest }) => {
  const { getFieldProps } = form;

  const onTableChange = (pagination, filters, sorter) => {
    dispatch({
      type: 'storageGoodsStatus/setQuery',
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
                 dispatch({
                        type: 'storageGoodsStatus/setQuery',
                        payload: formData
                    });
                
              } } >查询</Button>
              <Button type="ghost" onClick={() => {
                form.resetFields();
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
                      {...getFieldProps('fuzzyName')}
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
              dataIndex: 'goodName',
              key: 'goodName',
              render: (text, record) => {
                if(record.good){
                 return record.good.name || ''
                }else {
                  return ''
                }
              }
            },
            {
              title: '商品型号',
              dataIndex: 'goodModel',
              key: 'goodModel',
              render: (text, record) => {
                if(record.good){
                 return record.good.model || ''
                }else {
                  return ''
                }
              }
            },
            {
              title: '原价',
              dataIndex: 'goodPrice',
              key: 'goodPrice',
              render: (text, record) => {
                if(record.good){
                 return record.good.price || ''
                }else {
                  return ''
                }
              }
            },
            {
              title: '库存数量',
              dataIndex: 'goodStoreNow',
              key: 'goodStoreNow',
              render: (text, record) => {
                if(record.good){
                 return record.good.storeNow || ''
                }else {
                  return ''
                }
              }
            },
            {
              title: '预留库存数',
              dataIndex: 'reservedTotalNum',
              key: 'reservedTotalNum',
            },
            {
              title: '未发货商品数',
              dataIndex: 'needDeliverTotalNum',
              key: 'needDeliverTotalNum'
            },
            {
              title: '已出库商品数',
              dataIndex: 'storageOutTotalNum',
              key: 'storageOutTotalNum',
            },
            {
              title: '当前可用库存',
              dataIndex: 'usableNum',
              key: 'usableNum',
              render: (text, record) => {
                if(record.good){
                 return  record.good.storeNow - record.reservedTotalNum
                }else {
                  return ''
                }
              }
            },
            {
              title: '需补充库存数',
              dataIndex: 'needAddNum',
              key: 'needAddNum',
              render: (text, record) => {
                if(record.good){
                 return  record.needDeliverTotalNum - record.good.storeNow
                }else {
                  return ''
                }
              }
            },
            {
              title: '状态',
              dataIndex: 'goodOnsaleStatusText',
              key: 'goodOnsaleStatusText',
              render: (text, record) => {
                if(record.good){
                 return  record.good.onsaleStatusText
                }else {
                  return ''
                }
              }
            },
            {
              title: '更新时间',
              dataIndex: 'goodModifyDate',
              key: 'goodModifyDate',
              render: (text, record) => {
                if(record.good){
                 return  record.good.modifyDate
                }else {
                  return ''
                }
              }
            },
            {
              title: '操作',
              key: 'operation',
              render: (text, record) => (
                <span>
                  <Link ><Icon type="edit" />商品属性</Link>
                  <span className="ant-divider"></span>
                  <Link to={`/storage/storageIns/good/${record.good?record.good.id:''}`}><Icon type="edit" />入库历史</Link>
                  <span className="ant-divider"></span>
                  <Link to={`/storage/storageGoodsStatus/storageOuts/${record.id}`}><Icon type="edit" />出库历史</Link>
                  <span className="ant-divider"></span>
                  <Link to={`/storage/storageGoodsStatus/batchDetail/${record.id}`}><Icon type="edit" />批次明细</Link>
                </span>
              ),
            }]
        }
        rowKey={record => record.id}
        dataSource={storageGoodsStatus.list}
        pagination={storageGoodsStatus.pagination}
        loading={storageGoodsStatus.loading}
        onChange={onTableChange}
        />
    </Container>
  )
}

List.propTypes = {

}

export default Form.create({
  mapPropsToFields: (props) => {
    const query = props.storageGoodsStatus.query;
    return {
      fuzzyName: {
        value: query.fuzzyName
      }
    }
  }
})(List);

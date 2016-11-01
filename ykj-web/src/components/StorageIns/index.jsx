import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Button, Icon, Tabs, Form, Input, Popconfirm, Row, Col, Modal, Checkbox,DatePicker } from 'antd';

import CodewordSelect from '../Common/CodewordComponent';
import Container from '../Container';
import Box from '../Box';
import BoxTable from '../BoxTable';
import BoxTabs from '../BoxTabs';
import styles from './index.less';

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const { confirm } = Modal;
const List = ({ form, storageIns, componentDataSource, dispatch, ...rest }) => {
  const { getFieldProps } = form;

  const onTableChange = (pagination, filters, sorter) => {
    dispatch({
      type: 'storageIns/setQuery',
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
                    label="来源"
                    >
                    <CodewordSelect
                      {...getFieldProps('type', {
                        initialValue: storageIns.query.type || [],
                        rules: [
                          { required: false }
                        ]
                      })}
                      type={'STORAGE_IN_SOURCE'}
                      dispatch = {dispatch}
                      componentDataSource = {componentDataSource}
                      >
                    </CodewordSelect>
                  </FormItem>
                </Col>
                <Col sm={6}>
                  <FormItem
                    { ...formItemLayout }
                    label="入库日期"
                    >
                    <RangePicker
                      style={{ width: 200 }}
                      onChange={() => {

                      } }
                      {...getFieldProps('date', {
                        initialValue: storageIns.query.date || [],
                        rules: [
                          { required: false }
                        ]
                      })}
                      />
                  </FormItem>
                </Col>
                <Col sm={6}>
                  <FormItem
                    { ...formItemLayout }
                    label="批次号"
                    >
                    <Input
                      style={{ width: 200 }}
                      {...getFieldProps('batchNumber', {
                        initialValue: storageIns.query.date || [],
                        rules: [
                          { required: false }
                        ]
                      })}
                      />
                  </FormItem>
                </Col>
              </Row>
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
            title: '来源',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '入库单号',
            dataIndex: 'status',
            key: 'status'
          },
          {
            title: '入库日期',
            dataIndex: 'servicePosition',
            key: 'servicePosition'
          },
          {
            title: '操作人',
            dataIndex: 'serviceTime',
            key: 'serviceTime',
          },
          {
            title: '入库数量',
            dataIndex: 'clerkName',
            key: 'clerkName',
          },
          {
            title: '备注',
            dataIndex: 'id',
            key: 'id'
          },
          {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
              <span>
                <Link to={`/storage/storageIns/detail/${record.id}`}><Icon type="edit" />明细</Link>
              </span>
            ),
          }]
      }
      rowKey={record => record.id}
      dataSource={storageIns.list}
      pagination={storageIns.pagination}
      loading={storageIns.loading}
      onChange={onTableChange}
      />
    </Container >
  )
}

List.propTypes = {

}

export default Form.create({
  mapPropsToFields: (props) => {
  }
})(List);

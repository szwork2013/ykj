import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Button, Icon, Tabs, Form, Input, Popconfirm, Row, Col, Modal, Select } from 'antd';

import Container from '../Container';
import Box from '../Box';
import BoxTable from '../BoxTable';
import BoxTabs from '../BoxTabs';

import styles from './index.less';

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const { confirm } = Modal;
const List = ({ indents, form, children, dispatch, ...rest }) => {
  const { getFieldProps } = form;

  const onTableChange = (pagination, filters, sorter) => {
    dispatch({
      type: 'indents/setQuery',
      payload: {
        page: pagination.current,
        sort: sorter.field ? `${sorter.field},${sorter.order}` : undefined,
      },
    });
  }
  
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const selectBefore = function() {
    return (
        <Select defaultValue="supplierName" style={{ width: 120 }}
          {...getFieldProps('type')}
        >
            <Option value="supplierName">供应商</Option>
        </Select>
    )
  }
  return (
    <Container
      toolbar={ () => {
        return (
          <div>
            <Button type="primary" size="large">
              <Link to="/indents/indents/add123">采购</Link>
            </Button>
            <Button type="ghost" size="large" onClick={ () => {

              const formData = form.getFieldsValue();
              dispatch({
                type: 'indents/setQuery',
                payload: {},
              });

            } }><Icon type="reload"></Icon>刷新</Button>
          </div>
        )
      } }
      { ...rest }
    >
      <BoxTabs>
        <Form
          horizontal
        >
          <Tabs defaultActiveKey="1" tabBarExtraContent={ 

            <ButtonGroup>
              <Button type="primary" onClick={ () => {

                const formData = form.getFieldsValue();
                dispatch({
                  type: 'indents/setQuery',
                  payload: formData,
                });

              } } >搜索</Button>
              <Button type="ghost" onClick={() => {
                form.resetFields(['value'])
              }}>重置</Button>
            </ButtonGroup>

          } >
            <TabPane tab="快捷搜索" key="1">
            
              <Row gutter={ 2 }>
                <Col sm={ 12 }>
                  <FormItem
                    { ...formItemLayout }
                  >
                    <Input addonBefore={selectBefore()} {...getFieldProps('value')}/>
                  </FormItem>
                </Col>
              </Row>
            
            </TabPane>
          </Tabs>
        </Form>
      </BoxTabs>
      <BoxTable
        noPadding
        
        columns={
          [
          {
            title: '序号',
            dataIndex: 'index',
            key: 'id',
            render: (text, record, index) => index + 1
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
          },
          {
            title: '采购单号',
            dataIndex: 'indentNo',
            key: 'indentNo',
          },
          {
            title: '采购时间',
            dataIndex: 'indentDate',
            key: 'indentDate',
          },
          {
            title: '供货商',
            dataIndex: 'supplierId',
            key: 'supplierId',
          },
          {
            title: '采购总价（元）',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
          },
          {
            title: '应付金额（元）',
            dataIndex: 'payable',
            key: 'payable',
          },
          {
            title: '实付总金额（元）',
            dataIndex: 'paid',
            key: 'paid',
          },
          {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
          },
          {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
              <span>
                <Link to={ `/indents/indents/edit123/${record.id}` }><Icon type="edit" />编辑</Link>
                <span className="ant-divider"></span>
                <Popconfirm title="确定要删除这个纪录吗？" onConfirm={ () => {
                  
                  dispatch({
                    type: 'indents/deleteOne',
                    payload: record.id,
                  })

                } } onCancel={() => {} }>
                  <a href="#"><Icon type="delete" />删除</a>
                </Popconfirm>
              </span>
            ),
          }]
        }
        rowKey={ record => record.id }
        dataSource={ indents.indents }
        pagination={ indents.pagination }
        loading={ indents.loading }
        onChange={ onTableChange }
      />
    </Container>
  )
}

List.propTypes = {

}

export default Form.create({
  mapPropsToFields: (props) => {
    const query = props.indents.query;
    return {
      value: {
        value: query.value
      },
      type: {
        value: query.type || 'supplierName'
      },
    }
  }
})(List);

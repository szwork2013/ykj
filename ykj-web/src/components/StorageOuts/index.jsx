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
const List = ({ form, storageOuts, componentDataSource, dispatch, ...rest }) => {
  const { getFieldProps } = form;

  const onTableChange = (pagination, filters, sorter) => {
    dispatch({
      type: 'storageOuts/setQuery',
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

  const formatDate = (date, format) => {
    const o = {
      "M+": date.getMonth() + 1, //month 
      "d+": date.getDate(), //day 
      "h+": date.getHours(), //hour 
      "m+": date.getMinutes(), //minute 
      "s+": date.getSeconds(), //second 
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter 
      "S": date.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (let k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
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
                const newFormData = {};
                newFormData.type = formData.type;
                newFormData.fuzzyBatchNumber = formData.fuzzyBatchNumber;
                if (formData.date) {
                  newFormData.storageOutStartDate = formatDate(formData.date[0],'yyyy-MM-dd'),
                  newFormData.storageOutEndDate = formatDate(formData.date[1],'yyyy-MM-dd')
                }
                 dispatch({
                   type: 'storageOuts/setQuery',
                   payload: newFormData
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
                    label="来源"
                    >
                    <CodewordSelect
                      elementProps = {getFieldProps('type')}
                      type={'STORAGE_OUT_SOURCE'}
                      dispatch = {dispatch}
                      componentDataSource = {componentDataSource}
                      >
                    </CodewordSelect>
                  </FormItem>
                </Col>
                <Col sm={6}>
                  <FormItem
                    { ...formItemLayout }
                    label="出库日期"
                    >
                    <RangePicker
                      style={{ width: 200 }}
                      onChange={() => {

                      } }
                      {...getFieldProps('date')}
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
                      {...getFieldProps('fuzzyBatchNumber')}
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
              dataIndex: 'typeName',
              key: 'typeName',
            },
            {
              title: '批次号',
              dataIndex: 'batchNumber',
              key: 'batchNumber'
            },
          {
            title: '出库日期',
            dataIndex: 'changeDate',
            key: 'changeDate'
          },
          {
            title: '操作人',
            dataIndex: 'clerkName',
              key: 'clerkName',
              render: (text, record, index) => {
                if (record.clerk) {
                  return record.clerk.name || ''
                } else {
                  return '';
                }
              }
          },
          {
            title: '出库数量',
            dataIndex: 'outTotalNum',
              key: 'outTotalNum',
          },
          {
            title: '备注',
            dataIndex: 'remark',
              key: 'remark'
          },
          {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
              <span>
                <Link to={`/storage/storageOuts/detail/${record.id}`}><Icon type="edit" />明细</Link>
              </span>
            ),
          }]
      }
      rowKey={record => record.id}
      dataSource={storageOuts.list}
      pagination={storageOuts.pagination}
      loading={storageOuts.loading}
      onChange={onTableChange}
      />
    </Container >
  )
}

List.propTypes = {

}

export default Form.create({
  mapPropsToFields: (props) => {
    const query = props.storageOuts.query;
    return {
      type: {
        value: query.type
      },
      fuzzyBatchNumber: {
        value: query.fuzzyBatchNumber
      },
      date: {
        value : query.date
      }
    }
  }
})(List);

import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Button, Icon, Tabs, Form, Input, Popconfirm, Row, Col, Modal, Checkbox } from 'antd';

import Container from '../Container';
import Box from '../Box';
import BoxTable from '../BoxTable';
import BoxTabs from '../BoxTabs';
import styles from './index.less';

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { confirm } = Modal;
const Detail = ({ form, storageOuts, componentDataSource, dispatch, ...rest }) => {
  const { getFieldProps } = form;

  const { currentItem: storageOutDetail} = storageOuts;

  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  return (
    <Container
      { ...rest }
      >
      <Box>
        <Row>
          <Col span="12">
            <FormItem
              {...formItemLayout}
              label="出库单号"
              >
              <p>{storageOutDetail.batchNumber}</p>
            </FormItem>
          </Col>
        </Row>
      </Box>
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
              title: '型号',
              dataIndex: 'model',
              key: 'model'
            },
            {
              title: '品牌',
              dataIndex: 'servicePosition',
              key: 'servicePosition'
            },
            {
              title: '类别',
              dataIndex: 'serviceTime',
              key: 'serviceTime',
            },
            {
              title: '状态',
              dataIndex: 'clerkName',
              key: 'clerkName',
            },
            {
              title: '入库数量',
              dataIndex: 'id',
              key: 'id'
            }]
        }
        rowKey={record => record.id}
        dataSource={storageOuts.detailList}
        pagination={false}
        loading={storageOuts.loading}
        />
    </Container >
  )
}

Detail.propTypes = {

}

export default Form.create({
  mapPropsToFields: (props) => {
  }
})(Detail);

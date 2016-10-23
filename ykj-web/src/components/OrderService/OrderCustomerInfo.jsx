import React, { PropTypes } from 'react';
import { Form, Row, Col, Input } from 'antd';
import Box from '../Box';

const FormItem = Form.Item;
const OrderCustomerInfo = (props) => {
  const { dispatch, currentOrder } = props;

	const rowItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  }
	const fullRowLayout = {
		labelCol: { span: 2 },
    wrapperCol: { span: 20 },
	}
  return (
	<Box>	
	  <Row>
			<Col span="8">
				<FormItem
					{...rowItemLayout}
					label="关键字"
				>
					<p>{currentOrder.orderNo}</p>
				</FormItem>
			</Col>
			<Col span="8">
				<FormItem
					{...rowItemLayout}
					label="客户姓名"
				>
					<p>{currentOrder.customerName}</p>
				</FormItem>
			</Col>
			<Col span="8">
				<FormItem
					{...rowItemLayout}
					label="客户电话"
				>
				  <p>{currentOrder.customerName}</p>
				</FormItem>
			</Col>
	  </Row>
		<Row>
			<Col span="24">
				<FormItem
					{...fullRowLayout}
					label="送货地址"
				>
					<p>{currentOrder.address}</p>
				</FormItem>
			</Col>
	  </Row>
	</Box>
  )
}

export default OrderCustomerInfo;

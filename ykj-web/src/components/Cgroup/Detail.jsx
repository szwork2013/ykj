import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { Form, Input, Select, DatePicker, TreeSelect, Checkbox, Button, Tag, Col, Row } from 'antd';

import Container from '../Container';
import Box from '../Box';

const FormItem = Form.Item;
const Option = Select.Option;

const Detail = ({ cgroup, form, dispatch, type, onSubmit, ...rest }) => {

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
    }

    const { getFieldProps, getFieldValue, getFieldError, isFieldValidating } = form;
  
  const paymentProps = getFieldProps('payment', {
    rules: [
      { required: true, message: '请输入订金' },
    ]
  });
   const groupbuyIdProps = getFieldProps('groupbuyId', {
    rules: [
      { required: true, message: '请填写团购名称' },
    ]
  })


    const usernameProps = getFieldProps('username', {
  })
    const mobileProps = getFieldProps('mobile', {
  })
    const addressProps = getFieldProps('address', {
  })
  

  return (
    <Container
            {...rest}
        >
            <Box>
                <Form horizontal>
          <h3>团购信息</h3>
          <br/>
<Row>
              <Col span="12">
                <FormItem
                  {...formItemLayout}
                  label="客户姓名"
                  hasFeedback
                  help={isFieldValidating('username') ? '校验中...' : (getFieldError('username') || []).join(', ')}
                >
                  <Input {...usernameProps} disabled={ cgroup.loading }/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem
                  {...formItemLayout}
                  label="手机号码"
                  hasFeedback
                  help={isFieldValidating('mobile') ? '校验中...' : (getFieldError('mobile') || []).join(', ')}
                >
                  <Input {...mobileProps} disabled={ cgroup.loading }/>
                </FormItem>
              </Col>
            </Row>


<Row>
              <Col span="12">
          <FormItem
            {...formItemLayout}
            label="团购名称"
            hasFeedback
            help={isFieldValidating('groupbuyId') ? '校验中...' : (getFieldError('groupbuyId') || []).join(', ')}
          >
            <Input {...groupbuyIdProps} disabled={ cgroup.submiting } />
          </FormItem>
</Col>

<Col span="12">
          <FormItem
            {...formItemLayout}
            label="订金"
            hasFeedback
            help={isFieldValidating('payment') ? '校验中...' : (getFieldError('payment') || []).join(', ')}
          >
            <Input {...paymentProps} disabled={ cgroup.submiting } />
          </FormItem>
</Col>
             
            </Row>

<Row>
<Col span="24">
          <FormItem
            {...formItemLayout}
            label="联系地址"
            hasFeedback
            help={isFieldValidating('address') ? '校验中...' : (getFieldError('address') || []).join(', ')}
          >
            <Input {...addressProps} disabled={ cgroup.loading } />
          </FormItem>

           </Col>
             
            </Row>

         <Row>
           <Col span="12">

          <FormItem wrapperCol={{ span: 20, offset: 4 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit"  loading={ cgroup.submiting } onClick={ (e) => onSubmit(e, form) }>确定</Button>
            
             &nbsp;&nbsp;
            <Button type="ghost" onClick={ () => dispatch(routerRedux.goBack()) }>返回</Button>
          </FormItem>
          </Col>
           <Col span="12">
           </Col>
         </Row>

        </Form>
            </Box>
        </Container>
  )
}
export default Form.create({
  mapPropsToFields: (props) => {
    const id = props.params.id;
    if (!id) {
      return {};
    }
    
    const cgroup = props.cgroup.current;
console.info(2222222)
    console.info(cgroup)
    return {
      groupbuyId: {
        value: cgroup.groupbuyId ? `${cgroup.groupbuyId}` : undefined
      },
      payment: {
        value: cgroup.payment ? `${cgroup.payment}` : undefined
      },
      username: {
        value: cgroup.username
      },
      mobile: {
        value: cgroup.mobile
      },
      address: {
        value: cgroup.address
      },
     
      
      
    }
  }
})(Detail);
import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { Form, Input, Select, DatePicker, TreeSelect, Checkbox, Button, Tag, Col, Row } from 'antd';

import Container from '../Container';
import Box from '../Box';

const FormItem = Form.Item;
const Option = Select.Option;

const Detail = ({ group, form, dispatch, type, onSubmit, ...rest }) => {

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
    }

    const { getFieldProps, getFieldValue, getFieldError, isFieldValidating } = form;
  
  const nameProps = getFieldProps('name', {
    rules: [
      { required: true, message: '请输入团购名称' },
    ]
  });
   const goodIdProps = getFieldProps('goodId', {
    rules: [
      { required: true, message: '请填写产品名称' },
    ]
  })

  const photoProps = getFieldProps('photo', {
    rules: [
      { required: true, message: '请填写产品规格' },
    ]
  })

const idProps = getFieldProps('id', {
    rules: [
      { required: false, message: '请填写市场价格' },
    ]
  })

  const contentProps = getFieldProps('content', {
    rules: [
      { required: true, message: '请填写产品描述' },
    ]
  })

  const groupPriceProps = getFieldProps('groupPrice', {
    rules: [
      { required: false, message: '请填写团购价格' },
    ]
  })

  const groupLimitProps = getFieldProps('groupLimit', {
    rules: [
      { required: false, message: '请填写团购限额' },
    ]
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
                  label="团购名称"
                  hasFeedback
                  help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
                >
                  <Input {...nameProps} disabled={ group.submiting }/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem
                  {...formItemLayout}
                  label="产品名称"
                  hasFeedback
                  help={isFieldValidating('goodId') ? '校验中...' : (getFieldError('goodId') || []).join(', ')}
                >
                  <Input {...goodIdProps} disabled={ group.submiting }/>
                </FormItem>
              </Col>
            </Row>


<Row>
              <Col span="12">
          <FormItem
            {...formItemLayout}
            label="产品规格"
            hasFeedback
            help={isFieldValidating('photo') ? '校验中...' : (getFieldError('photo') || []).join(', ')}
          >
            <Input {...photoProps} disabled={ group.submiting } />
          </FormItem>
</Col>

<Col span="12">
          <FormItem
            {...formItemLayout}
            label="产品描述"
            hasFeedback
            help={isFieldValidating('content') ? '校验中...' : (getFieldError('content') || []).join(', ')}
          >
            <Input {...contentProps} disabled={ group.submiting } />
          </FormItem>
</Col>
             
            </Row>

<Row>
<Col span="12">
          <FormItem
            {...formItemLayout}
            label="市场价格"
            hasFeedback
            help={isFieldValidating('id') ? '校验中...' : (getFieldError('id') || []).join(', ')}
          >
            <Input {...idProps} disabled={ group.submiting } />
          </FormItem>
</Col>

<Col span="12">
          <FormItem
            {...formItemLayout}
            label="团购价格"
            hasFeedback
            help={isFieldValidating('groupPrice') ? '校验中...' : (getFieldError('groupPrice') || []).join(', ')}
          >
            <Input {...groupPriceProps} disabled={ group.submiting } />
          </FormItem>
</Col>
             
            </Row>
 <Row>
           <Col span="12">

          <FormItem
            {...formItemLayout}
            label="团购限额"
            hasFeedback
            help={isFieldValidating('groupLimit') ? '校验中...' : (getFieldError('groupLimit') || []).join(', ')}
          >
            <Input {...groupLimitProps} disabled={ group.submiting } />
          </FormItem>
          </Col>
           <Col span="12">
           </Col>
         </Row>


         <Row>
           <Col span="12">

          <FormItem wrapperCol={{ span: 20, offset: 4 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit"  loading={ group.submiting } onClick={ (e) => onSubmit(e, form) }>确定</Button>
            
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
    
    const group = props.group.current;
    return {
      name: {
        value: group.name
      },
      goodId: {
        value: group.goodId
      },
      photo: {
        value: group.photo
      },
      content: {
        value: group.content
      },
      id: {
        value: group.id
      },
      groupPrice: {
        value: `${group.groupPrice}`
      },
      groupLimit: {
        value: `${group.groupLimit}`
      },
      
    }
  }
})(Detail);
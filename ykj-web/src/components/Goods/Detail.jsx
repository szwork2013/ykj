import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { Form, Input, Select, DatePicker, TreeSelect, Checkbox, Button, Tag, Col, Row } from 'antd';

import Container from '../Container';
import Box from '../Box';

const FormItem = Form.Item;
const Option = Select.Option;

const Detail = ({ goods, form, dispatch, type, onSubmit, ...rest }) => {

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
   const modelProps = getFieldProps('model', {
    rules: [
      { required: true, message: '请填写型号' },
    ]
  })

  const supplierIdProps = getFieldProps('supplierId', {
    rules: [
      { required: false, message: '请填写。。。' },
    ]
  })

const typeProps = getFieldProps('type', {
    rules: [
      { required: false, message: '请填写。。。' },
    ]
  })

  const colorProps = getFieldProps('color', {
    rules: [
      { required: false, message: '请填写。。。' },
    ]
  })

  const specificationProps = getFieldProps('specification', {
    rules: [
      { required: false, message: '请填写。。。' },
    ]
  })

  const statusTypeProps = getFieldProps('statusType', {
    rules: [
      { required: false, message: '请填写。。。' },
    ]
  })

const unitProps = getFieldProps('unit', {
    rules: [
      { required: false, message: '请填写。。。' },
    ]
  })

  const atomUnitProps = getFieldProps('atomUnit', {
    rules: [
      { required: false, message: '请填写。。。' },
    ]
  })

  const priceProps = getFieldProps('price', {
    rules: [
      { required: false, message: '请填写。。。' },
    ]
  })

 const lengthProps = getFieldProps('length', {
    rules: [
      { required: false, message: '请填写。。。' },
    ]
  })


const widthProps = getFieldProps('width', {
    rules: [
      { required: false, message: '请填写。。。' },
    ]
  })

  const heightProps = getFieldProps('height', {
    rules: [
      { required: false, message: '请填写。。。' },
    ]
  })

  const weightProps = getFieldProps('weight', {
    rules: [
      { required: false, message: '请填写。。。' },
    ]
  })
 
  return (
    <Container
            {...rest}
        >
            <Box>
                <Form horizontal>
          <h3>商品基本信息</h3>
          <br/>
<Row>
              <Col span="12">
                <FormItem
                  {...formItemLayout}
                  label="商品名称"
                  hasFeedback
                  help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
                >
                  <Input {...nameProps} disabled={ goods.submiting }/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem
                  {...formItemLayout}
                  label="型号"
                  hasFeedback
                  help={isFieldValidating('model') ? '校验中...' : (getFieldError('model') || []).join(', ')}
                >
                  <Input {...modelProps} disabled={ goods.submiting }/>
                </FormItem>
              </Col>
            </Row>


<Row>
              <Col span="12">
          <FormItem
            {...formItemLayout}
            label="品牌/供应商"
            hasFeedback
            help={isFieldValidating('supplierId') ? '校验中...' : (getFieldError('supplierId') || []).join(', ')}
          >
            <Input {...supplierIdProps} disabled={ goods.submiting } />
          </FormItem>
</Col>

<Col span="12">
          <FormItem
            {...formItemLayout}
            label="类别"
            hasFeedback
            help={isFieldValidating('type') ? '校验中...' : (getFieldError('type') || []).join(', ')}
          >
            <Input {...typeProps} disabled={ goods.submiting } />
          </FormItem>
</Col>
             
            </Row>

<Row>
<Col span="12">
          <FormItem
            {...formItemLayout}
            label="颜色"
            hasFeedback
            help={isFieldValidating('color') ? '校验中...' : (getFieldError('color') || []).join(', ')}
          >
            <Input {...colorProps} disabled={ goods.submiting } />
          </FormItem>
</Col>

<Col span="12">
          <FormItem
            {...formItemLayout}
            label="规格"
            hasFeedback
            help={isFieldValidating('specification') ? '校验中...' : (getFieldError('specification') || []).join(', ')}
          >
            <Input {...specificationProps} disabled={ goods.submiting } />
          </FormItem>
</Col>
             
            </Row>
 <Row>
           <Col span="12">

          <FormItem
            {...formItemLayout}
            label="状态类型"
            hasFeedback
            help={isFieldValidating('statusType') ? '校验中...' : (getFieldError('statusType') || []).join(', ')}
          >
            <Input {...statusTypeProps} disabled={ goods.submiting } />
          </FormItem>
          </Col>
           <Col span="12">
           </Col>
         </Row>



 <h3>单位和价格</h3>
          <br/>
<Row>
              <Col span="12">
                <FormItem
                  {...formItemLayout}
                  label="库存和计价单位"
                  hasFeedback
                  help={isFieldValidating('unit') ? '校验中...' : (getFieldError('unit') || []).join(', ')}
                >
                  <Input {...unitProps} disabled={ goods.submiting }/>
                </FormItem>
              </Col>
              <Col span="12">
                
              </Col>
            </Row>


<Row>
              <Col span="12">
          <FormItem
            {...formItemLayout}
            label="商品最小单元"
            hasFeedback
            help={isFieldValidating('atomUnit') ? '校验中...' : (getFieldError('atomUnit') || []).join(', ')}
          >
            <Input {...atomUnitProps} disabled={ goods.submiting } />
          </FormItem>
</Col>

<Col span="12">
          
</Col>
             
            </Row>
<Row>
              <Col span="12">
          <FormItem
            {...formItemLayout}
            label="原价"
            hasFeedback
            help={isFieldValidating('price') ? '校验中...' : (getFieldError('price') || []).join(', ')}
          >
            <Input {...priceProps} disabled={ goods.submiting } addonAfter="元/件"/>
          </FormItem>
          
</Col>

<Col span="12">
          
</Col>
             
            </Row>



 <h3>尺寸和重量（每件）</h3>
          <br/>
<Row>
              <Col span="12">
                <FormItem
                  {...formItemLayout}
                  label="长"
                  hasFeedback
                  help={isFieldValidating('length') ? '校验中...' : (getFieldError('length') || []).join(', ')}
                >
                  <Input {...lengthProps} disabled={ goods.submiting } addonAfter="毫米mm"/>
                </FormItem>
              </Col>
              <Col span="12">
                
              </Col>
            </Row>


<Row>
              <Col span="12">
          <FormItem
            {...formItemLayout}
            label="宽"
            hasFeedback
            help={isFieldValidating('width') ? '校验中...' : (getFieldError('width') || []).join(', ')}
          >
            <Input {...widthProps} disabled={ goods.submiting } addonAfter="毫米mm"/>
          </FormItem>
</Col>

<Col span="12">
          
</Col>
             
            </Row>
<Row>
              <Col span="12">
          <FormItem
            {...formItemLayout}
            label="高／厚"
            hasFeedback
            help={isFieldValidating('height') ? '校验中...' : (getFieldError('height') || []).join(', ')}
          >
            <Input {...heightProps} disabled={ goods.submiting } addonAfter="毫米mm"/>
          </FormItem>
</Col>

<Col span="12">
          
</Col>
             
            </Row>

<Row>
              <Col span="12">
          <FormItem
            {...formItemLayout}
            label="重"
            hasFeedback
            help={isFieldValidating('weight') ? '校验中...' : (getFieldError('weight') || []).join(', ')}
          >
            <Input {...weightProps} disabled={ goods.submiting } addonAfter="公斤kg"/>
          </FormItem>
</Col>

<Col span="12">
          
</Col>
             
            </Row>


         <Row>
           <Col span="12">

          <FormItem wrapperCol={{ span: 20, offset: 4 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit"  loading={ goods.submiting } onClick={ (e) => onSubmit(e, form) }>确定</Button>
            
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
    
    const goods = props.goods.current;
    return {
      name: {
        value: goods.name
      },
      model: {
        value: goods.model
      },
      supplierId: {
        value: goods.supplierId
      },
      type: {
        value: goods.type
      },
      color: {
        value: goods.color
      },
      specification: {
        value: `${goods.specification}`
      },
      statusType: {
        value: `${goods.statusType}`
      },
      unit: {
        value: `${goods.unit}`
      },
      atomUnit: {
        value: `${goods.atomUnit}`
      },
      price: {
        value: `${goods.price}`
      },
      length: {
        value: `${goods.length}`
      },
      width: {
        value: `${goods.width}`
      },
      height: {
        value: `${goods.height}`
      },
      weight: {
        value: `${goods.weight}`
      },
    }
  }
})(Detail);
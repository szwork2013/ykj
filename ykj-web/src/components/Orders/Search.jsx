import React, { PropTypes } from 'react';
import BoxTabs from '../BoxTabs';
import { Button, Icon, Tabs, Form, Input, Popconfirm, Row, Col, Modal, Select, DatePicker } from 'antd';
import OperationBox from '../OperationBox';

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const { confirm } = Modal;
const Search = ({  orders, form, dispatch, ...rest }) => {
  const {getFieldProps} = form;
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  const customUserField = [{
    key : '',
    value : '全部'
  },{
    key : 'orderResponsibleId',
    value : '跟单人'
  },{
    key : 'orderCreatorId',
    value : '下单人'
  },{
    key : 'customerId',
    value : '服务人员'
  }];

  const customDateFiled =  [{
    key : '',
    value : '全部'
  },{
    key : 'createDate',
    value : '下单时间'
  },{
    key : 'finishDate',
    value : '完成时间'
  }];

  const customUserFieldProps = getFieldProps('customUserField', {
        initialValue : orders.query.customUserField || '',
        rules: [
            { required: false}
        ]
    });

    const customDateFiledProps = getFieldProps('customDateFiled', {
        initialValue : orders.query.customDateFiled || '',
        rules: [
            { required: false}
        ]
    });

    const dateProps = getFieldProps('date', {
        initialValue : orders.query.date || [],
        rules: [
            { required: false}
        ]
    });

    const textProps = getFieldProps('fuzzyText', {
         initialValue : orders.query.fuzzyText || '',
        rules: [
            { required: false}
        ]
    });

     const options = {
      operation: [
        {
            label: "新增订单",
            url: '/order/orders/add',
        },
        {
            label: "订单导入",
            url: '',
        },
        {
            label: "订单导出",
            url: '',
        },
        {
            label: "刷新",
            url: '',
        },
      ],
      filter: orders.stateStatisticalResult
    }

    const formatDate = (date,format) => { 
      const o = { 
      "M+" : date.getMonth()+1, //month 
      "d+" : date.getDate(), //day 
      "h+" : date.getHours(), //hour 
      "m+" : date.getMinutes(), //minute 
      "s+" : date.getSeconds(), //second 
      "q+" : Math.floor((date.getMonth()+3)/3), //quarter 
      "S" : date.getMilliseconds() //millisecond 
      } 

      if(/(y+)/.test(format)) { 
        format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
      } 

      for(let k in o) { 
        if(new RegExp("("+ k +")").test(format)) { 
          format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
        } 
      } 
      return format; 
} 
  
  return (
    <BoxTabs>
        <Form
          horizontal
        >
          <Tabs defaultActiveKey="1" tabBarExtraContent={ 

            <ButtonGroup>
              <Button type="primary" onClick={ () => {

                const formData = form.getFieldsValue();
                
                if(formData.date && formData.date.length == 2){
                  formData.customDateStart = formatDate(formData.date[0],'yyyy-MM-dd');
                  formData.customDateEnd = formatDate(formData.date[1],'yyyy-MM-dd');
                 // delete formData.date
                }
                
                dispatch({
                  type: 'orders/setQuery',
                  payload: formData,
                });

              } } >查询</Button>
              <Button type="ghost" >重置</Button>
            </ButtonGroup>

          } >
            <TabPane tab="快捷搜索" key="1">
          
              <Row gutter={ 1 } >
                <Col sm={ 6 }>
                  <FormItem
                    { ...formItemLayout }
                  >
                    <Select
                      showSearch
                      placeholder = "跟单人、下单人、服务人员、全部"
                      notFoundContent = "无对应项"
                      style = { { width:250 } }
                      onChange = { () => {

                      }}
                      {...customUserFieldProps}
                    >
                      {
                      customUserField.map(item => {
                        return <Option key={item.key} value={item.key}>{item.value}</Option>
                      })
                    }
                    </Select>
                  </FormItem>
                  
                </Col>
                <Col sm={ 4 }>
                  <FormItem
                    { ...formItemLayout }
                  >
                    <Select
                      showSearch
                      placeholder = "下单时间、完成时间"
                      notFoundContent = "无对应项"
                      style = { { width:150 } }
                      onChange = { () => {

                      }}
                      {...customDateFiledProps}
                    >
                     {
                      customDateFiled.map(item => {
                        return <Option key={item.key} value={item.key}>{item.value}</Option>
                      })
                    }
                    </Select>
                  </FormItem>
                </Col>
                <Col sm={ 4 }>
                  <FormItem
                    { ...formItemLayout }
                    label="时间"
                  >
                    <RangePicker
                      style={{ width: 200 }} 
                      onChange={ () => {

                      }}

                      {...dateProps}
                    >
                    </RangePicker>
                  </FormItem>
                </Col>
                <Col sm={ 7 } offset={ 3 }>
                  <FormItem
                    { ...formItemLayout }
                  >
                    <Input  placeholder = "请输入关键字" size="default" {...textProps}/>
                  </FormItem>
                </Col>
              </Row>
              <OperationBox options={options} />
            </TabPane>
          </Tabs>
        </Form>
      </BoxTabs>
  )
}

export default Search;

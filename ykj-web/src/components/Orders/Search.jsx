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

  const userTypes = [{
    key : '',
    value : '全部'
  },{
    key : '1',
    value : '跟单人'
  },{
    key : '2',
    value : '下单人'
  },{
    key : '3',
    value : '服务人员'
  }];

  const timeType =  [{
    key : '',
    value : '全部'
  },{
    key : '1',
    value : '下单时间'
  },{
    key : '2',
    value : '完成时间'
  }];

  const userTypeProps = getFieldProps('userType', {
        rules: [
            { required: false}
        ]
    });

    const timeTypeProps = getFieldProps('timeType', {
        rules: [
            { required: false}
        ]
    });

    const dateProps = getFieldProps('date', {
        rules: [
            { required: false}
        ]
    });

    const textProps = getFieldProps('text', {
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
  
  return (
    <BoxTabs>
        <Form
          horizontal
        >
          <Tabs defaultActiveKey="1" tabBarExtraContent={ 

            <ButtonGroup>
              <Button type="primary" onClick={ () => {

                const formData = form.getFieldsValue();
                console.log(formData);

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
                      {...userTypeProps}
                    >
                      {
                      userTypes.map(item => {
                        return <Option key={item.key} value={item.value}>{item.value}</Option>
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
                      {...timeTypeProps}
                    >
                     {
                      timeType.map(item => {
                        return <Option key={item.key} value={item.value}>{item.value}</Option>
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

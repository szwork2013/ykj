import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { Button, Icon, Tabs, Form, Input, Popconfirm, Row, Col, Select, DatePicker } from 'antd';

import Container from '../Container';
import Box from '../Box';
import BoxTable from '../BoxTable';
import BoxTabs from '../BoxTabs';

import styles from './index.less';

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const SelectOption = Select.Option;
const RangePicker = DatePicker.RangePicker;
const GroupList = ({ form, cgroup, children, dispatch, ...rest }) => {
  const { getFieldProps } = form;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Container
      toolbar={ () => {
        return (
          <div>
            <Button type="ghost" size="large"><Icon type="reload"></Icon>刷新</Button>
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
                  type: 'cgroup/query',
                  payload: formData,
                });

              } } >查询</Button>
              <Button type="ghost" >重置</Button>
            </ButtonGroup>

          } >
            <TabPane tab="快捷搜索" key="1">
            
              <Row gutter={ 2 } >
                <Col sm={ 8}>
                  <FormItem
                    { ...formItemLayout }
                    label="名称"
                  >
                    <Input  type="text"  {...getFieldProps('name')} size="default" />
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
                            render: (text, record, index) => index+1,
                        },
                        {
                            title: '姓名',
                            dataIndex: 'username',
                            key: 'username',
                            sorter: false,
                        },
                        {
                            title: '手机号码',
                            dataIndex: 'mobile',
                            key: 'mobile',
                            sorter: false,
                        },
                        {
                            title: '团购名称',
                            dataIndex: 'groupname',
                            key: 'groupname',
                            sorter: false,
                        },
                        {
                            title: '团购价',
                            dataIndex: 'groupprice',
                            key: 'groupprice',
                            sorter: false,
                        },
                        {
                            title: '订金（元）',
                            dataIndex: 'payment',
                            key: 'payment',
                            sorter: false,
                        },
                        
                        {
                            title: '操作',
                            key: 'operation',
                            width: 150,
                            render: (text, record) => (
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><Link to={`/customers/groupon/edit/${record.id}`}><Icon type="edit" />编辑</Link></td>
                                            <td><Link to={`/customers/groupon/${record.id}/tracks`}><Icon type="edit1" />下订单</Link></td>
                                        </tr>
                                    </tbody>
                                </table>
                            ),
                        }
                    ]
                }
                rowKey={ record => record.id }
                dataSource={ cgroup.cgroup }
                pagination={ cgroup.pagination }
                loading={ cgroup.loading }
      />
    </Container>
  )
}

GroupList.propTypes = {

}

export default Form.create({
    mapPropsToFields: (props) => {
        const query = props.cgroup.query;
        return {
            
        }
    }
})(GroupList);

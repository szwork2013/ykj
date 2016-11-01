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
const GoodsList = ({ form, goods, children, dispatch, ...rest }) => {
  const { getFieldProps } = form;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
const onDelete = function(id) {
        dispatch({
            type: 'goods/delete',
            payload: id,
        })
    }
  return (
    <Container
      toolbar={ () => {
        return (
          <div>
            <Button type="primary" size="large">
              <Link to="/stock/goods/add">新增</Link>
            </Button>
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
                  type: 'goods/query',
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
                            title: '品牌',
                            dataIndex: 'supplierId',
                            key: 'supplierId',
                            sorter: false,
                        },
                        {
                            title: '商品名称',
                            dataIndex: 'name',
                            key: 'name',
                            sorter: false,
                        },
                        {
                            title: '型号',
                            dataIndex: 'model',
                            key: 'model',
                            sorter: false,
                        },
                        {
                            title: '规格',
                            dataIndex: 'specification',
                            key: 'specification',
                            sorter: false,
                        },
                        {
                            title: '状态',
                            dataIndex: 'onsaleStatus',
                            key: 'onsaleStatus',
                            sorter: false,
                        },
                        {
                            title: '类型',
                            dataIndex: 'statusType',
                            key: 'statusType',
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
                                            <td><Link to={`/stock/goods/edit/${record.id}`}><Icon type="edit" />编辑</Link></td>
                                            <td>
                                             <Popconfirm title="确定要删除这个商品吗？" onConfirm={ () => onDelete(record.id) } onCancel={() => { } }>
                                                <a href="#"><Icon type="delete" />删除</a>
                                                </Popconfirm>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ),
                        }
                    ]
                }
                rowKey={ record => record.id }
                dataSource={ goods.goods }
                pagination={ goods.pagination }
                loading={ goods.loading }
      />
    </Container>
  )
}

GoodsList.propTypes = {

}

export default Form.create({
    mapPropsToFields: (props) => {
        const query = props.goods.query;
        return {
            
        }
    }
})(GoodsList);

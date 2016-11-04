import React, { PropTypes } from 'react';
import { Link, routerRedux } from 'dva/router';
import { Button, Icon, Tabs, Form, Input, Popconfirm, Row, Col, Modal, Checkbox, InputNumber } from 'antd';

import Container from '../Container';
import Box from '../Box';
import BoxTable from '../BoxTable';
import BoxTabs from '../BoxTabs';

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { confirm } = Modal;

const InstallGoods = ({ customers, installations, installGoods, form, onSubmit, children, dispatch, ...rest }) => {
  const { getFieldProps } = form;

  const onTableChange = (pagination, filters, sorter) => {
    dispatch({
      type: 'installations/setQuery',
      payload: {
        page: pagination.current,
        sort: sorter.field ? `${sorter.field},${sorter.order}` : undefined,
      },
    });
  }
  
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  }

  const installGoodsTmp = [{
    name : '木板',
    model : '兔宝宝系列',
    deliverNum : 10,
    storageGoodsNum : 2,
    remark : '由于客厅不平整，等修复后再施工'
  },{
    name : '坐便器',
    model : 'TOTO',
    deliverNum : 2,
    storageGoodsNum : 0,
    remark : ''
  }]
  return (
    <div>
      <BoxTable
        noPadding
        
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
            key: 'needTime',
          },
          {
            title: '商品型号',
            dataIndex: 'model',
            key: 'model',
          },
          {
            title: '送货数量',
            dataIndex: 'deliverNum',
            key: 'deliverNum',
          },
          {
            title: '使用数量',
            dataIndex: 'installNum',
            key: 'installNum',
            render: (text, record) => {
              return <InputNumber defaultValue={text} onChange={(value) => {
                dispatch({
                  type: 'installGoods/setInstallNum',
                  payload: value
                })
              }}/>
            }
          },
          {
            title: '剩余数量',
            dataIndex: 'storageGoodsNum',
            key: 'storageGoodsNum',
          },
          {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
          }]
        }
        rowKey={ record => record.id }
        dataSource={ installGoodsTmp }
        pagination={ installGoods.pagination }
        loading={ installGoods.loading }
        onChange={ onTableChange }
      />
      <br/>
      <div style={{textAlign: 'right'}}>
        <Button type="primary" loading={ installGoods.submiting } onClick={ (e) => onSubmit(e) }>保存</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button type="ghost" onClick={ () => dispatch(routerRedux.goBack()) }>返回</Button>
      </div>
    </div>
  )
}

InstallGoods.propTypes = {

}

export default Form.create({
  mapPropsToFields: (props) => {
    const installGoods = props.installations.currentItem;
    return {
      needTime : {
        value : installGoods.needTime
      },
      clerkName : {
        value : installGoods.clerkName
      },
      clerkPhone : {
        value : installGoods.clerkPhone
      },
      orderGoodNum : {
        value : installGoods.orderGoodNum
      },
      serviceCost : {
        value : installGoods.serviceCost
      },
      remark : {
        value : installGoods.remark
      },
      status : {
        value : installGoods.status
      }
    }
  }
})(InstallGoods);

import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import Goods from '../components/Goods';
import Add from '../components/Goods/Add';
import Edit from '../components/Goods/Edit';

import selectors from '../models/Goods/selectors';

const GoodsPage = props => {
  return <Goods {...props} />
}

const List = connect(selectors)(GoodsPage)
const GoodsAdd = connect(selectors)(Add)
const GoodsEdit = connect(selectors)(Edit)
export {
  List as default,
  GoodsAdd,
  GoodsEdit,
}

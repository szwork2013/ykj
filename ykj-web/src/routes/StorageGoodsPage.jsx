import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import StorageGoods from '../components/StorageGoods';
import BatchDetail from '../components/StorageGoods/BatchDetail';

import selectors from '../models/storageGoods/selectors';

const StorageGoodsPage = props => {
  return <StorageGoods {...props} />
}

const List = connect(selectors)(StorageGoodsPage)
const StorageGoodsBatchDetail = connect(selectors)(BatchDetail);

export {
  List as default,
  StorageGoodsBatchDetail
}

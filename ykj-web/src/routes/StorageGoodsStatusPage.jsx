import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import StorageGoodsStatus from '../components/StorageGoodsStatus';
import BatchDetail from '../components/StorageGoodsStatus/BatchDetail';

import selectors from '../models/StorageGoodsStatus/selectors';

const StorageGoodsStatusPage = props => {
  return <StorageGoodsStatus {...props} />
}

const List = connect(selectors)(StorageGoodsStatusPage)
const StorageGoodsStatusBatchDetail = connect(selectors)(BatchDetail);

export {
  List as default,
  StorageGoodsStatusBatchDetail
}

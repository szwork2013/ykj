import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { LOutk } from 'dva/router';

import StorageOuts from '../components/StorageOuts';
import Detail from '../components/StorageOuts/Detail';

import selectors from '../models/storageOuts/selectors';

const StorageOutsPage = props => {
  return <StorageOuts {...props} />
}

const List = connect(selectors)(StorageOutsPage)
const StorageOutsDetail = connect(selectors)(Detail);

export {
  List as default,
  StorageOutsDetail
}

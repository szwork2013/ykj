import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import StorageIns from '../components/StorageIns';
import Detail from '../components/StorageIns/Detail';

import selectors from '../models/storageIns/selectors';

const StorageInsPage = props => {
  return <StorageIns {...props} />
}

const List = connect(selectors)(StorageInsPage)
const StorageInsDetail = connect(selectors)(Detail);

export {
  List as default,
  StorageInsDetail
}

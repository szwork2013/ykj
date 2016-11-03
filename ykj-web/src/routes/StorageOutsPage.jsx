import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { LOutk } from 'dva/router';

import StorageOuts from '../components/StorageOuts';
import Add from '../components/StorageOuts/Add';

import selectors from '../models/storageOuts/selectors';

const StorageOutsPage = props => {
  return <StorageOuts {...props} />
}

const List = connect(selectors)(StorageOutsPage)
const StorageOutsAdd = connect(selectors)(Add);

export {
  List as default,
  StorageOutsAdd
}

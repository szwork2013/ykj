import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import StorageIns from '../components/StorageIns';
import Add from '../components/StorageIns/Add';

import selectors from '../models/storageIns/selectors';

const StorageInsPage = props => {
  return <StorageIns {...props} />
}

const List = connect(selectors)(StorageInsPage)
const StorageInsAdd = connect(selectors)(Add);

export {
  List as default,
  StorageInsAdd
}

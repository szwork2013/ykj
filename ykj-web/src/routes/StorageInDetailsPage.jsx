import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import StorageInDetails from '../components/StorageInDetails';

import selectors from '../models/storageInDetails/selectors';

const StorageInDetailsPage = props => {
  return <StorageInDetails {...props} />
}

const List = connect(selectors)(StorageInDetailsPage)

export {
  List as default
}

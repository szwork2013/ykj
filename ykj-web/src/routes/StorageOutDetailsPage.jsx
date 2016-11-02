import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import StorageOutDetails from '../components/StorageOutDetails';

import selectors from '../models/StorageOutDetails/selectors';

const StorageOutDetailsPage = props => {
  return <StorageOutDetails {...props} />
}

const List = connect(selectors)(StorageOutDetailsPage)

export {
  List as default
}

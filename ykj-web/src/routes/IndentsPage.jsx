import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import Suppliers from '../components/Indents';
import Add from '../components/Indents/Add';
import Edit from '../components/Indents/Edit';

import selectors from '../models/indents/selectors';

const IndentsPage = props => {
  return <Suppliers {...props} />
}

const List = connect(selectors)(IndentsPage)
const IndentAdd = connect(selectors)(Add);
const IndentEdit = connect(selectors)(Edit);
export {
  List as default,
  IndentAdd,
  IndentEdit,
}

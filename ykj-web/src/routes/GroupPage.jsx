import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import Group from '../components/Group';
import Add from '../components/Group/Add';
import Edit from '../components/Group/Edit';

import selectors from '../models/group/selectors';

const GroupPage = props => {
  return <Group {...props} />
}

const List = connect(selectors)(GroupPage)
const GroupAdd = connect(selectors)(Add)
const GroupEdit = connect(selectors)(Edit)
export {
  List as default,
  GroupAdd,
  GroupEdit,
}

import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import Group from '../components/Cgroup';
import Add from '../components/Cgroup/Add';
import Edit from '../components/Cgroup/Edit';

import selectors from '../models/cgroup/selectors';

const GroupPage = props => {
  return <Group {...props} />
}

const List = connect(selectors)(GroupPage)
const CgroupAdd = connect(selectors)(Add)
const CgroupEdit = connect(selectors)(Edit)
export {
  List as default,
  CgroupAdd,
  CgroupEdit,
}

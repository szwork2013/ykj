import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import CustomerGroup from '../components/CustomerGroup';
import Add from '../components/CustomerGroup/Add';
import Edit from '../components/CustomerGroup/Edit';
import Houses from '../components/Houses';
import Tracks from '../components/Tracks';

import selectors from '../models/customerGroup/selectors';

const CustomerGroupPage = props => {
  return <CustomerGroup {...props} />
}

const List = connect(selectors)(CustomerGroupPage)
const CustomerGroupAdd = connect(selectors)(Add)
const CustomerGroupEdit = connect(selectors)(Edit)
const CustomerGroupHouses = connect(selectors)(Houses)
const CustomerGroupTracks = connect(selectors)(Tracks)
export {
  List as default,
  CustomerGroupAdd,
  CustomerGroupEdit,
  CustomerGroupHouses,
  CustomerGroupTracks,
}

import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import MeasureIndex from '../components/OrderService/MeasureIndex';
import MeasureAdd from '../components/OrderService/MeasureAdd';
import MeasureEdit from '../components/OrderService/MeasureEdit';

import selectors from '../models/orderService/selectors';

const orderServicePage = props => {
  
}

const MeasureIndexComponent = connect(selectors)(MeasureIndex)
const MeasureAddComponent = connect(selectors)(MeasureAdd);
const MeasureEditComponent = connect(selectors)(MeasureEdit);
export {
  MeasureIndexComponent, 
  MeasureAddComponent,
  MeasureEditComponent,
}

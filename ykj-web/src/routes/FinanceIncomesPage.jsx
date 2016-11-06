import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import FinanceIncomes from '../components/FinanceIncomes';

import selectors from '../models/financeIncomes/selectors';

const FinanceIncomesPage = props => {
  return <FinanceIncomes {...props} />
}

const List = connect(selectors)(FinanceIncomesPage)
export {
  List as default
}

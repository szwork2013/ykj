import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import FinanceExpenses from '../components/FinanceExpenses';

import selectors from '../models/financeExpenses/selectors';

const FinanceExpensesPage = props => {
  return <FinanceExpenses {...props} />
}

const List = connect(selectors)(FinanceExpensesPage)
export {
  List as default
}

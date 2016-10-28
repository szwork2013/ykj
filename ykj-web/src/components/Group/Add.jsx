import React, { PropTypes } from 'react';
import { Form, Input, Select, TreeSelect, Checkbox, Radio, Button, Row, Col, Modal } from 'antd';
import { routerRedux } from 'dva/router';

import Container from '../Container';
import Box from '../Box';
import TagBox from '../TagBox';
import TreeBox from '../TreeBox';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Add = {
	
}

function mapPropsToFields(props) {
  const group = props.group.current;

  return {
    typeId: {
      value: group.typeId || '1'
    },
	
  }
}

export default Form.create({mapPropsToFields})(Add);

import React, { PropTypes } from 'react';

import Detail from './Detail';

const Add = (props) => {
  const { deliverys,dispatch } = props;

  const initFormData = (formData) => {
    let newFormData = {
      serviceGoods: []
    }
    var exp = new RegExp("serviceGoods");
    for (let name in formData) {
      if (typeof (formData[name]) === 'object' && exp.test(name)) {
        //如果是供货商品信息，则将他存入数组
        newFormData.serviceGoods.push(formData[name]);
      } else {
        newFormData[name] = formData[name];
      }
    }

    return newFormData;
  }

  return (
    <Detail
      {...props}

      type="add"
      moreProps={(getFieldProps) => {
        return {}
      } }
      uploadAttachmentAble={false}
      mapPropsToFields={(delivery) => ({})}
      onSubmit={(e, form) => {
        e.preventDefault();

        form.validateFieldsAndScroll((errors, values) => {
          if (!!errors) {
            return;
          }

          const formData = form.getFieldsValue();
          formData.orderId = deliverys.currentOrder.id;

          dispatch({
            type: 'deliverys/add',
            payload: initFormData(formData),
          })

        });

      } }
      />
  )
}

export default Add;

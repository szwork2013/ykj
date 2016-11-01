import React, { PropTypes } from 'react';

import Detail from './Detail';

const Edit = (props) => {
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

      type="edit"
      moreProps={(getFieldProps) => {
        return {}
      } }
      uploadAttachmentAble={true}
      mapPropsToFields={(delivery) => ({})}
      onSubmit={(e, form) => {
        e.preventDefault();

        form.validateFieldsAndScroll((errors, values) => {
          if (!!errors) {
            return;
          }

          let formDate = form.getFieldsValue();
          formData.orderId = deliverys.currentOrder.id;
          dispatch({
            type: 'deliverys/edit',
            payload: formDate
          })

        });

      } }
      />
  )
}

export default Edit;

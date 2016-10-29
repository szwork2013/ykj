import React, { PropTypes } from 'react';

import Detail from './Detail';

const Add = (props) => {
  const { dispatch } = props;
  return (
    <Detail 
      {...props}

      type="add"

      onSubmit={ (e, form) => {
          e.preventDefault();

          form.validateFields((errors, values) => {
              if (errors) {
                  return;
              }

              const formData = form.getFieldsValue();
              console.log(formData);
              dispatch({
                  type: "group/add",
                  payload: formData,
              });
          })
      }}

    />
  )
}

export default Add;

import React, { PropTypes } from 'react';

import Detail from './Detail';

const Edit = (props) => {
  const { dispatch,measures } = props;
  return (
    <Detail
      {...props}

      type="edit"
      moreProps={ (getFieldProps) => {
        return {        }
      } }
      mapPropsToFields={ (measure) => ({}) }
      onSubmit={ (e, form , fileList) => {
        e.preventDefault();
        
        form.validateFieldsAndScroll((errors, values) => {
          if (!!errors) {
            return;
          }
          let formData = form.getFieldsValue();
          formData.fileList = fileList;
          formData.orderId = measures.currentOrder.id;
          dispatch({
            type: 'measures/edit',
            payload: formData,
          })
		  
		    });

      } }
    />
  )
}

export default Edit;

import React, { PropTypes } from 'react';

import Detail from './Detail';

const Add = (props) => {
  const { dispatch,measures } = props;
  return (
    <Detail
      {...props}

      type="add"
      moreProps={ (getFieldProps) => {
        return {        }
      } }
      mapPropsToFields={ (measure) => ({}) }
      onSubmit={ (e, form,fileList) => {
        e.preventDefault();
        
        form.validateFieldsAndScroll((errors, values) => {
          if (!!errors) {
            return;
          }
          
          const formData = form.getFieldsValue();
          formData.fileList = fileList;
          formData.orderId = measures.currentOrder.id;
          dispatch({
            type: 'measures/add',
            payload: formData,
          })
		  
        });
		
      } }
    />
  )
}

export default Add;

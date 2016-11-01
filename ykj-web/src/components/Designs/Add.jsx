import React, { PropTypes } from 'react';

import Detail from './Detail';

const Add = (props) => {
  const { dispatch,designs } = props;
  return (
    <Detail
      {...props}

      type="add"
      moreProps={ (getFieldProps) => {
        return {        }
      } }
      uploadAttachmentAble = {false}
      mapPropsToFields={ (measure) => ({}) }
      onSubmit={ (e, form,fileList) => {
        e.preventDefault();
        
        form.validateFieldsAndScroll((errors, values) => {
          if (!!errors) {
            return;
          }
          
          const formData = form.getFieldsValue();
          formData.orderId = designs.currentOrder.id;
          dispatch({
            type: 'designs/add',
            payload: formData,
          })
		  
        });
		
      } }
    />
  )
}

export default Add;

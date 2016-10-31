import React, { PropTypes } from 'react';

import Detail from './Detail';

const Edit = (props) => {
  const { dispatch,designs } = props;
  return (
    <Detail
      {...props}

      type="edit"
      uploadAttachmentAble = {true}
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
          formData.orderId = designs.currentOrder.id;
          dispatch({
            type: 'designs/edit',
            payload: formData,
          })
		  
		    });

      } }
    />
  )
}

export default Edit;

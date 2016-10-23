import React, { PropTypes } from 'react';

import MeasureDetail from './MeasureDetail';

const MeasureAdd = (props) => {
  const { dispatch } = props;
  return (
    <MeasureDetail
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
          form.fileList = fileList;
          console.log(formData);
		  
        });
		
      } }
    />
  )
}

export default MeasureAdd;

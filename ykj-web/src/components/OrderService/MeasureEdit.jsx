import React, { PropTypes } from 'react';

import MeasureDetail from './MeasureDetail';

const MeasureEdit = (props) => {
  const { dispatch,orderService } = props;
  const {currentItem : measure} = orderService;
  return (
    <MeasureDetail
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
          formData.id = measure.id;
          console.log(formData);
		  
		    });

      } }
    />
  )
}

export default MeasureEdit;

import React, { PropTypes } from 'react';

import Detail from './Detail';

const Add = (props) => {
  const { dispatch } = props;
  return (
    <Detail
      {...props}

      type="add"
      moreProps={ (getFieldProps) => {
        return {        }
      } }
      mapPropsToFields={ (order) => ({}) }
      onSubmit={ (e, form, orderGoods) => {
        e.preventDefault();
        orderGoods.map((item)=>{
          item.discountRate =  isNaN((item.strikeUnitPrice/item.price).toFixed(2)) ? `1.00` : `${(item.strikeUnitPrice/item.price).toFixed(2)}`;
        })
      
        form.validateFieldsAndScroll((errors, values) => {
          // if (!!errors) {
          //   return;
          // }
		  
          const formData = form.getFieldsValue();
		      formData.orderGoods = orderGoods;
          console.log(formData)
          // dispatch({
          //   type: 'orders/add',
          //   payload: formData,
          // })
        });
		
      } }
    />
  )
}

export default Add;

import React, { PropTypes } from 'react';
import { Modal, Form, Cascader, InputNumber, Row, Col, Input, DatePicker } from 'antd';

const FormItem = Form.Item;

const PositionModal = ({ form, onOk,onCancle,dispatch, data, ...rest }) => {
    const { getFieldProps, getFieldError, isFieldValidating } = form;

    const formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 15 },
    };

    return (
        <Modal
            { ...rest }
            onOk= { () => {
               onOk()
            }}
            onCancel= { () => {
                onCancle()  
            }}
        >
            <div style={ { marginTop: '12px', marginLeft: '100px'} }>
                {data}
            </div>
        </Modal>
    )

}

PositionModal.propTypes = {
    form: PropTypes.object.isRequired,
}

export default Form.create({})(PositionModal)
import React, { PropTypes } from 'react';
import { Modal, Form, Cascader, InputNumber, Row, Col, Input, DatePicker, Select } from 'antd';
import CodewordSelect from '../Common/CodewordComponent';

const FormItem = Form.Item;
const Option = Select.Option;

const PayModal = ({ form, dispatch, submiting, onOk, onCancel, financeExpense, ...rest }) => {
    const { getFieldProps, getFieldError, isFieldValidating } = form;

    const formItemLayout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 },
    };
    return (
        <Modal
            title="收款"
            { ...rest }
            onOk={() => {
                form.validateFields((error) => {
                    if (error) {
                        return false;
                    }
                    const formData = form.getFieldsValue();
                    onOk(formData);
                });
            } }
            onCancel={() => {
                form.resetFields();
                dispatch({
                    type: 'financeIncomes/merge',
                    payload:{
                        currentItem : {}
                    }
                });
                dispatch({
                    type: 'financeIncomes/hidePayModal'
                });
            }}
            >
    <Form horizontal>
        <div style={{ marginTop: '20px' }}>
            <Row>
                <Col sm={10} >
                    <Input type='hidden' {...getFieldProps('id', {
                            initialValue: financeExpense.id
                        })}>
                    </Input>
                    <CodewordSelect
                        layout={formItemLayout}
                        label={"类目"}
                        form={form}
                        elementProps={getFieldProps('type', {
                            initialValue: `${financeExpense.type||''}`,
                            rules: [
                                { required: true, message: '请选择类目' }
                            ],
                        })}
                        type={"PAY_CATEGORY"}
                        dispatch={dispatch}
                        >
                    </CodewordSelect>
                </Col>
                <Col sm={10} offset={2}>
                    <CodewordSelect
                        layout={formItemLayout}
                        label={"收款方式"}
                        form={form}
                        elementProps={getFieldProps('way', {
                            initialValue: `${financeExpense.way||''}`,
                            rules: [
                                { required: true, message: '请选择付款方式' }
                            ],
                        })}
                        type={"PAY_WAY"}
                        dispatch={dispatch}
                        >
                    </CodewordSelect>
                </Col>
            </Row>
            <Row>
                <Col sm={10} >
                    <FormItem
                        { ...formItemLayout }
                        label="金额"
                        hasFeedback
                        help={isFieldValidating('money') ? '校验中...' : (getFieldError('payment') || []).join(', ')}
                        >
                        <Input {...getFieldProps('money', {
                            initialValue: financeExpense.money,
                            rules: [
                                { required: true,  message: '请输入金额' }
                            ]
                        }) } min={1} defaultValue={1} disabled={submiting} size="default" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col sm={22} >
                    <FormItem
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        label="摘要"
                        hasFeedback
                        help={isFieldValidating('remark') ? '校验中...' : (getFieldError('remark') || []).join(', ')}
                        >
                        <Input {...getFieldProps('remark', {
                            initialValue: financeExpense.remark,
                        }) } disabled={submiting} size="default" />
                    </FormItem>
                </Col>
            </Row>
        </div>
    </Form>
        </Modal >
    )

}

PayModal.propTypes = {
    form: PropTypes.object.isRequired,
}

export default Form.create({})(PayModal)
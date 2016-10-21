import React, { PropTypes, Component } from 'react';
import { Modal, Form, Cascader, InputNumber, Row, Col, Input, Upload, Icon, Button, message } from 'antd';

const FormItem = Form.Item;

class UploadModal extends Component {

    constructor(props) {
        super();
        this.state = {
            orderPicture: undefined,
        }
    }

    render() {
        const { orders, form, dispatch, submiting, onOk, ...rest } = this.props;

        const { getFieldProps, getFieldError, isFieldValidating } = form;

        const orderPictureProps = getFieldProps('orderPicture', {
            rules: [
                { required: true, type: 'object', message: '请选择纸质订单图片进行上传'}
            ]
        })

        const url=  "/api/orders/"+orders.currentOrder.id+"/upload";
        console.log(url)
        const formItemLayout = {
            labelCol: { span: 9 },
            wrapperCol: { span: 15 },
        };

        return (
            <Modal
                title= "上传纸质订单"
                okText="上传"
                { ...rest }
                onOk= { () => {
                    form.validateFields( (error) => {
                        if(error) {
                            return false;
                        }
                        const formData = form.getFieldsValue();
                        console.log(formData);
                        form.submiting();
                        form.resetFields();
                    });
                }}
                onCancel= { () => {
                    form.resetFields();
                     dispatch({
                        type: 'orders/toggleUploadModal',
                        payload: {
                            currentOrder : {},
                            UploadModalShow: false,
                        },
                    })   
                    
                    this.setState({
                        orderPicture: undefined,
                        orderSrc: undefined,
                    });
                }}    
                width={ 800 }
            >
                <Form horizontal>
                    
                        <Row>
                            <Col sm={10} offset={5}>
                                <FormItem
                                    { ...formItemLayout }
                                >
                                    <Icon type="search" />&nbsp;&nbsp;&nbsp;&nbsp;<p className="ant-form-text" >请选择上传文件</p>
                                </FormItem>
                            </Col>
                            <Col sm={8} >
                                <FormItem
                                    { ...formItemLayout }
                                    help={isFieldValidating('orderPicture') ? '校验中...' : (getFieldError('orderPicture') || []).join(', ')}
                                >
                                    <Upload
                                        name= "orderUpload"
                                        action = "/api/orders/upload"
                                        data={orders.currentOrder}
                                        showUploadList={ false }
                                        disabled={ submiting }
                                        beforeUpload={ file => {
                                            const isImage = file.type.startsWith('image/');
                                            if (isImage) {
                                                const fileReader = new FileReader();
                                                fileReader.readAsDataURL(file);
                                                fileReader.onload = (e) => {
                                                    form.setFieldsValue({
                                                        'orderPicture': file
                                                    })

                                                    this.setState({
                                                        orderPicture: file,
                                                        orderSrc: e.target.result,
                                                    })
                                                }

                                                return false;
                                            }

                                            message.error('纸质订单图片格式有误');
                                            return false;
                                        }}
                                    >
                                        <Button type="primary" size="small" >预览</Button>
                                    </Upload>
                                </FormItem>
                            </Col>
                        </Row>
                        {
                            this.state.orderSrc ?
                            <div style={ { marginLeft: '30px', width: '700px', height: '350px', borderStyle:'solid'} } >
                                <img src={ this.state.orderSrc || orders.orderPicture } style={ {width:'100%', height: '100%'} } />
                            </div>
                            :
                            undefined
                        }
                        <FormItem wrapperCol={{ span: 16, offset: 8 }} style={{ marginTop: 24 }}>
                            <Button  htmlType="submit">取消</Button>
                            <Button type="primary" htmlType="submit">上传</Button>
                        </FormItem>
                     
                </Form>
            </Modal>
        )
    }
    
}

UploadModal.propTypes = {
    form: PropTypes.object.isRequired,
}

export default Form.create({})(UploadModal)
import React, { PropTypes, Component } from 'react';
import { Modal, Form, Cascader, InputNumber, Row, Col, Input, Upload, Icon, Button, message } from 'antd';

const FormItem = Form.Item;

class UploadModal extends Component {

    constructor(props) {
        super();
        this.state = {
            file: undefined,
        }
    }

    render() {
        const {  form } = this.props;

        const { getFieldProps, getFieldError, isFieldValidating } = form;

        const fileProps = getFieldProps('file', {
            rules: [
                { required: true, type: 'object', message: '请选择文件进行上传' }
            ]
        })

        const formItemLayout = {
            labelCol: { span: 9 },
            wrapperCol: { span: 15 },
        };

        return (
            <Modal
                title="上传文件"
                okText="上传"
                onOk={() => {
                    form.validateFields((error) => {
                        if (error) {
                            return false;
                        }
                        const formData = form.getFieldsValue();
                        console.log("form获取值");
                        console.log(formData)
                    });
                } }
                onCancel={() => {
                    form.resetFields();

                } }
                width={800}
                visible={this.props.visible}
                >
                <Form horizontal>

                    <Row>
                        <Col sm={8} >
                            <FormItem
                                { ...formItemLayout }
                                help={isFieldValidating('file') ? '校验中...' : (getFieldError('file') || []).join(', ')}
                                >
                                <Upload
                                    showUploadList={false}
                                
                                    beforeUpload={file => {
                                        const fileReader = new FileReader();
                                        fileReader.readAsDataURL(file);
                                        fileReader.onload = (e) => {
                                            form.setFieldsValue({
                                                'file': file
                                            })
                                        }
                                        
                                        return false;
                                    } }
                                    >
                                    <Button type="ghost">
                                        <Icon type="upload" /> 选择文件
                                    </Button>
                                </Upload>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }

}

UploadModal.propTypes = {
    form: PropTypes.object.isRequired,
}

export default Form.create({})(UploadModal)
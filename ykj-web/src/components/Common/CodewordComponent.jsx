import React, { PropTypes, Component } from 'react';
import { Form,Select, Input } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';

const FormItem = Form.Item;
/**
 * 数据字典下拉框组件
 */
class CodewordSelect extends Component {

    constructor(props) {
        super(props);
        this.componentDataSourceName = "codewords";
        this.state = {
            type: this.props.type,
            dataSource: []
        }
    }


    componentDidUpdate() {

        //this.props.onOk(this.state.dataSource);

    }

    componentWillMount() {
        this.props.dispatch({
            type: 'componentDataSource/loadCodewordsData',
            payload: {
                typeValue: this.state.type,
                callback: (data) => {
                    this.setState({
                        dataSource: data._embedded && data._embedded.codewords || []
                    })
                }
            }

        });
    }

    componentWillUpdate() {
    }


    handleSelect(onSelect, value, option) {
        if (onSelect) {
            console.dir(this.state.dataSource)
            dataSource.map(item => {
                if (item.id === value) {
                    return onSelect(item);
                }
            })
        } else {
            return true;
        }

    }

    render() {
        const {elementProps, layout, label, form} = this.props;
        const {isFieldValidating, getFieldError} = form;
        return (
            <FormItem
                { ...layout }
                label={label}
                >
                <Select showSearch
                    {...this.props.elementProps}
                    style={this.props.style}
                    onSelect={(value, option) => {
                        this.handleSelect(this.props.onSelect, value, option)
                        return true;
                    } }
                    optionFilterProp={"children"}
                    defaultActiveFirstOption={false}
                    disabled={this.props.disabled}
                    >
                    {
                        this.state.dataSource.map(item => {
                            return <Select.Option key={item.code} value={item.code}>{item.value}</Select.Option>
                        })
                    }
                </Select >
            </FormItem>
        )
    }
}

CodewordSelect.propTypes = {
}

export default CodewordSelect;
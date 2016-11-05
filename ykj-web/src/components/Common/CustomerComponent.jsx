import React, { PropTypes, Component } from 'react';
import { Form, Select, Input } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';

const FormItem = Form.Item;

/**
 * 客户下拉框组件
 */
class CustomerSelect extends Component {

    constructor(props) {
        super(props);
        this.componentDataSourceName = "customers";
        this.state = {
            dataSource: []
        }
    }


    componentDidUpdate() {

        //this.props.onOk(this.state.dataSource);

    }

    componentWillMount() {
        this.props.dispatch({
            type: 'componentDataSource/loadCustomersData',
            payload: {
                callback: (data) => {
                    this.setState({
                        dataSource: data._embedded && data._embedded.customers || []
                    })
                }
            }
        });

    }

    componentWillUpdate() {
    }


    handleSelect(onSelect, value, option) {
        if (onSelect) {
            const dataSource = this.state.dataSource || [];

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
        const {elementProps,layout,label,form} = this.props;
        const {isFieldValidating,getFieldError} = form;
        return (
            <FormItem
                { ...layout }
                label={label}
                >
                <Select showSearch
                    {...elementProps}
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
                            return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        })
                    }
                </Select >
            </FormItem>
        )
    }
}

CustomerSelect.propTypes = {
}

export default CustomerSelect;
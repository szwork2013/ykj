import React, { PropTypes, Component } from 'react';
import { Select, Input } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';

/**
 * 客户下拉框组件
 */
class CustomerSelect extends Component {

    constructor(props) {
        super(props);
        this.componentDataSourceName = "customers";
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
            const dataSource = this.props.componentDataSource[this.componentDataSourceName] || [];

            dataSource.map(item => {
                if (item.id === value) {
                    return onSelect(item);
                }
            })
        } else {
            return true;
        }

    }
    test(){
        console.log(this)
    }

    render() {
        const dataSource = this.props.componentDataSource[this.componentDataSourceName] || [];
        return (
            <Select showSearch
                {...this.props.elementProps}
                style={this.props.style}
                onSelect={(value, option) => {
                    this.handleSelect(this.props.onSelect, value, option)
                    return true;
                } }
                optionFilterProp = {"children"}
                defaultActiveFirstOption = {false}
                disabled = {this.props.disabled}
                >
                {
                    dataSource.map(item => {
                        return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    })
                }
            </Select >
        )
    }
}

CustomerSelect.propTypes = {
}

export default CustomerSelect;
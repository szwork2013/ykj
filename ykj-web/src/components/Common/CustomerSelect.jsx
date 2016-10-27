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
    }


    componentDidUpdate() {

        //this.props.onOk(this.state.dataSource);

    }

    componentWillMount() {
        this.props.dispatch({
            type: 'componentDataSource/loadCustomersData',
            payload: "ALL",
        });
        console.log("数据加载完成")

    }

    componentWillUpdate() {
        console.log("componentWillUpdate")
    }


    handleSelect(onSelect, value, option) {
        if (this.props.onSelect) {
            const dataSource = this.props.componentDataSource["CUSTOMERS"] || [];

            dataSource.map(item => {
                if (item.id === value) {
                    return this.props.onSelect(item);
                }
            })
        } else {
            return true;
        }

    }

    handleChange(onChange, value, option) {
        if (this.props.onChange) {
            const dataSource = this.props.componentDataSource["CUSTOMERS"] || [];

            dataSource.map(item => {
                if (item.id === value) {
                    return this.props.onChange(item);
                }
            })

            return this.props.onChange(value);
        } else {
            return true;
        }

    }

    render() {
        const dataSource = this.props.componentDataSource["CUSTOMERS"] || [];
        return (
            <Select
                {...this.props.elementProps}
                style={this.props.style}
                onSelect={(value, option) => {
                    this.handleSelect(this.props.onSelect, value, option)
                    return true;
                } }
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
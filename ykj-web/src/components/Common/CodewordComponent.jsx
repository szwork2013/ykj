import React, { PropTypes, Component } from 'react';
import { Select, Input } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';

/**
 * 数据字典下拉框组件
 */
class CodewordSelect extends Component {

    constructor(props) {
        super(props);
        this.componentDataSourceName = "codewords";
        this.state = {
            type : this.props.type
        }
    }


    componentDidUpdate() {

        //this.props.onOk(this.state.dataSource);

    }

    componentWillMount() {
        this.props.dispatch({
            type: 'componentDataSource/loadCodewordsData',
            payload: this.state.type,
        });
    }

    componentWillUpdate() {
    }


    handleSelect(onSelect, value, option) {
        if (this.props.onSelect) {
            const dataSource = this.props.componentDataSource[this.componentDataSourceName][this.state.type] || [];
            console.dir(dataSource)
            dataSource.map(item => {
                if (item.id === value) {
                    return this.props.onSelect(item);
                }
            })
        } else {
            return true;
        }

    }
    
    render() {
        const dataSource =  this.props.componentDataSource[this.componentDataSourceName][this.state.type] || [];
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
                        return <Select.Option key={item.code} value={item.code}>{item.value}</Select.Option>
                    })
                }
            </Select >
        )
    }
}

CodewordSelect.propTypes = {
}

export default CodewordSelect;
import React, { PropTypes, Component } from 'react';
import { Select, Input } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';

/**
 * 商品下拉框组件
 */
class GoodSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }


    componentDidUpdate() {

        //this.props.onOk(this.state.dataSource);

    }

    componentWillMount() {
        this.props.dispatch({
            type: 'componentDataSource/loadGoodsData',
            payload: {

                callback: (data) => {
                    this.setState({
                        dataSource: data._embedded && data._embedded.goods || []
                    })
                }
            }
            
        });

    }

    componentWillUpdate() {
        console.log("123")
    }


    handleSelect(onSelect, value, option) {
        if (onSelect) {
            this.state.dataSource.map(item => {
                if (item.id === value) {
                    return onSelect(item);
                }
            })
        } else {
            return true;
        }

    }

    render() {

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
                    this.state.dataSource.map(item => {
                        return <Select.Option key={item.id} value={item.id}>{item.model}</Select.Option>
                    })
                }
            </Select >
        )
    }
}

GoodSelect.propTypes = {
}

export default GoodSelect;
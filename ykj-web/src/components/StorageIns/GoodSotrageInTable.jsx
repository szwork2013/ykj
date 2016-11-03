import React, { PropTypes, Component } from 'react';
import { Form, Input, InputNumber, Select, TreeSelect, Checkbox, Button, Cascader, Spin, Row, Col, DatePicker, Table, Icon, message } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';
import moment from 'moment';
import Box from '../Box';
import GoodSelect from '../Common/GoodComponent';


//组件已经完成，但是封装性不够，该组件内的字段还不是正式字段，需要后续开发人员校验下

class GoodSotrageInTable extends Component {

    constructor(props) {
        super(props);
        var dataSource = props.dataSource || [];
        dataSource.push({Number:dataSource.length});
        this.state = {
            dataSource: dataSource
        };
        // this.defaultData ={};
        // props.columns.map((column, index) => {
        //     this.defaultData[column.dataIndex] = undefined;
        // })
        // console.log(this.defaultData);
        // this.dafaultData

        
    }


    componentDidUpdate() {

        //this.props.onOk(this.state.dataSource);

    }

    /**
     * 新增记录行
     */
    addRow(columns, dataSource) {
        if (dataSource[dataSource.length - 1].name != undefined) {
            const newRow = {};
            columns.map((column, index) => {
                if (column.dataIndex && column.dataIndex == 'Number') {
                    newRow[column.dataIndex] = dataSource.length + 1;
                }
            })
            dataSource.push(newRow);
            return dataSource;
        } else {
            message.error(`请先添加改行`)
            return dataSource;
        }

    }

    /**
     * 删除记录行
     */
    removeRow(columns, dataSource, rowIndex) {
        if (dataSource.length == 1) {
            const newDataSource = dataSource.map((item, index) => {
                const copyItem = { Number: index + 1 }
                return copyItem;
            })
            message.error(`不能删除最后一行`)
            return newDataSource
        } else {
            const temp = dataSource.filter((item, index) => {
                return index != rowIndex;
            });

            return temp.map((item, index) => {
                item.Number = index + 1;
                return item;
            })
        }
    }

    /**
     * 动态根据表格的字段进行渲染设置
     */
    getEditColumns(columns, dataSource, type) {
        const { form , readOnly = false} = this.props;
        columns.map((column, index) => {
            const columnName = column.dataIndex;

            if (column.dataIndex == 'Number') {
                column.render = (text, record, index) => {
                    if (index + 1 == dataSource.length) {
                        return (<a href="javascript:void(0)" onClick={() => {
                            const newDataSource = this.addRow(columns, dataSource);
                            this.setState({
                                dataSource: newDataSource,
                            })

                        } }><Icon type="plus-circle" /></a>)
                    } else {
                        return index + 1;
                    }
                }
            };
            if (column.key == 'operation') {
                column.render = (text, record, index) => {
                    return (
                        <span>
                            <a href="javascript:void(0)" onClick={() => {

                                const newDataSource = this.removeRow(columns, dataSource, index)
                                console.log(newDataSource);
                                this.setState({
                                    dataSource: newDataSource,
                                })
                            } } ><Icon type="delete" />删除</a>
                        </span>
                    )

                }
            }
            if (column.dataIndex == 'num') {
                column.render = (text, record, index) => {
                    if (readOnly) {
                        return text;
                    } else {
                        return (
                            <InputNumber 
                                value={text} 
                                onChange={(value) => {
                                    this.changeValue(value, columnName, index);
                                } } 
                                style={{ width: '60px' }} 
                            >
                            </InputNumber>
                        )
                    }
                }
            }
            if (column.dataIndex == 'cost') {
                column.render = (text, record, index) => {
                    if (readOnly) {
                        return text;
                    } else {
                        return (
                            <InputNumber 
                                value={text} 
                                onChange={(value) => {
                                    this.changeValue(value, columnName, index);
                                } } 
                                style={{ width: '60px' }} 
                            >
                            </InputNumber>
                        )
                    }
                }
            }
            if (column.dataIndex == 'model') {
                column.render = (text, record, index) => {
                    if (readOnly) {
                        return text;
                    } else {
                        return (
                            <GoodSelect
                                {...this.props}
                                onSelect = {(value) => {
                                    this.changeValue(value.name, 'name', index);
                                    this.changeValue(value.type, 'type', index);
                                    this.changeValue(value.price, 'cost', index);
                                    this.changeValue(value.onsaleStatusText, 'onsaleStatusText', index);
                                    this.changeValue(value.id, 'storageGoodsId', index);
                                    return true;
                                }}
                                >
                            </GoodSelect>
                        )
                    }
                }
            }
        });
        return columns;
    }

    /**
     * 改变当前表格的值
     */
    changeValue(targetValue, columnName, index) {
        const newDataSource = this.state.dataSource.map((item, rowId) => {
            if (index == rowId) {
                item[columnName] = targetValue;
            }
            return item;
        })
        this.setState({
            dataSource: newDataSource,
        })
        
    }

    /**
     * 获取最新数据源
     */
    getDataSource() {
        return this.state.dataSource;
    }


    renderTable(props) {
        const { isAddable, goodsEditing, dispatch, type, columns, ...rest } = props;
        return (

                <Table
                    columns={
                        this.getEditColumns(columns, this.state.dataSource, type)
                    }
                    dataSource={
                            this.state.dataSource
                    }
                    pagination = {false}
                    >
                </Table>
        )
    }

    render() {
        return this.renderTable(this.props)
    }
}

GoodSotrageInTable.propTypes = {
    editEnableColumns: PropTypes.array,
    isAddable: PropTypes.bool,
}

export default GoodSotrageInTable;
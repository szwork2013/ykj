import React, { PropTypes, Component } from 'react';
import { Form, Input, InputNumber, Select, TreeSelect, Checkbox, Button, Cascader, Spin, Row, Col, DatePicker, Table, Icon, message } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';
import moment from 'moment';
import Box from '../Box';

//组件已经完成，但是封装性不够，该组件内的字段还不是正式字段，需要后续开发人员校验下

class TableVariable extends Component {

    constructor(props) {
        super(props);
        var dataSource = props.dataSource || [];
        dataSource.push({ Number: dataSource.length });
        this.state = {
            dataSource: dataSource
        };
    }


    componentDidUpdate() {
    }

    addRow(columns, dataSource) {
        if (dataSource[dataSource.length - 1].storageGoodsId != undefined) {
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

    getEditColumns(columns, dataSource, type) {
        const { goodList = [], form} = this.props;
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
                            {
                                type == 'edit' ?
                                    (
                                        <span>
                                            <Link to={`/order/orders/${record.id}/enterOut/${record.id}`}><Icon type="edit" />退补货</Link>
                                            <span className="ant-divider"></span>
                                        </span>
                                    )
                                    :
                                    undefined
                            }
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
            if (column.dataIndex == 'goodModel') {
                column.render = (text, record, index) => {
                    if (text) {
                        return text;
                    } else {
                        return (
                            <GoodSelect
                                onSelect={(value) => {
                                    this.changeValue(value.name, 'name', index);
                                    this.changeValue(value.type, 'type', index);
                                    this.changeValue(value.price, 'price', index);
                                    this.changeValue(value.onsaleStatusText, 'onsaleStatusText', index);
                                    this.changeValue(value.id, 'storageGoodsId', index);
                                    return true;
                                } }
                                >
                            </GoodSelect>
                        )
                    }
                }
            }
            if (column.dataIndex == 'initPosition') {
                column.render = (text, record, index) => {
                    return (
                        <Input value={text} onChange={(e) => {
                            this.changeValue(e.target.value, columnName, index);
                        } } style={{ width: '60px' }}></Input>
                    )
                }
            }
            if (column.dataIndex == 'orderGoodsNum') {
                column.render = (text, record, index) => {
                    return (
                        <InputNumber value={text} onChange={(value) => {
                            this.changeValue(value, columnName, index);
                        } } style={{ width: '60px' }}></InputNumber>
                    )
                }
            }
            if (column.dataIndex == 'strikeUnitPrice') {
                column.render = (text, record, index) => {
                    return (
                        <InputNumber value={text} onChange={(value) => {
                            this.changeValue(value, columnName, index);
                        } } style={{ width: '60px' }}></InputNumber>
                    )
                }
            }
            if (column.dataIndex == 'reservedGoods') {
                column.render = (text, record, index) => {
                    return (
                        <InputNumber value={text} onChange={(value) => {
                            this.changeValue(value, columnName, index);
                        } } style={{ width: '60px' }}></InputNumber>
                    )
                }
            }
            if (column.dataIndex == 'reservedDate') {
                column.render = (text, record, index) => {
                    return (
                        text ?
                            (
                                <DatePicker value={moment(`${text}`, "YYYYMMDD").format()} onChange={(date, dateString) => {
                                    this.changeValue(dateString, columnName, index);
                                } } style={{ width: '80px' }} />
                            )
                            :
                            (
                                <DatePicker onChange={(date, dateString) => {
                                    this.changeValue(dateString, columnName, index);
                                } } style={{ width: '80px' }} />
                            )
                    )
                }
            }
            if (column.dataIndex == 'remark') {
                column.render = (text, record, index) => {
                    return (
                        <Input value={text} onChange={(e) => {
                            this.changeValue(e.target.value, columnName, index);
                        } } style={{ width: '60px' }}></Input>
                    )
                }
            }
        });
        return columns;
    }

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

    getDataSource() {
        return this.state.dataSource;
    }

    getBeforePrice(dataSource) {
        let beforePrice = 0;
        for (let i = 0; i < dataSource.length; i++) {
            beforePrice = beforePrice + dataSource[i].price * dataSource[i].orderGoodsNum
        }
        return beforePrice;
    }

    getAfterPrice(dataSource) {
        let afterPrice = 0;
        for (let i = 0; i < dataSource.length; i++) {
            afterPrice = afterPrice + dataSource[i].strikeUnitPrice * dataSource[i].orderGoodsNum
        }
        return afterPrice;
    }


    renderTable(props) {
        const {  dispatch, type, columns, ...rest } = props;
        return (

            <Box>
                <Row>
                    <Col sm={3} >
                        <h3>订单商品明细</h3><br />
                    </Col>
                    {
                        type == 'edit' ?
                      (
                                <Col sm={2} >
                                    <Button type="primary" onClick={() => {
                                        dispatch({
                                            type: 'orders/toggleAuditModal',
                                            payload: {
                                                currentOrderId: this.props.orderId,
                                                AuditModalShow: true,
                                            }
                                        });
                                    } } size="default" >审核商品</Button>
                                </Col>
                                <Col sm={1} >
                                    <Button type="primary" size="default" >
                                        采购
                                    </Button>
                                </Col>
                        ) 
                        : ''
                    }

                </Row>
                {
                    <div>
                        <Table
                            columns={
                                this.getEditColumns(columns, this.state.dataSource, type)
                            }
                            dataSource={
                                this.state.dataSource
                            }
                            pagination={false}
                            >
                        </Table>
                        <Row>
                            <Col sm={24} offset={14}>
                                <p className="ant-form-text" >{`折前总价：${this.getBeforePrice(this.state.dataSource)}`}&nbsp;&nbsp;&nbsp;&nbsp;{`折后总价：${this.getAfterPrice(this.state.dataSource)}`}&nbsp;&nbsp;&nbsp;&nbsp;{`成交价：（单位：元）`}</p>
                            </Col>
                        </Row>
                    </div>
                }

            </Box>

        )
    }

    render() {
        return this.renderTable(this.props)
    }
}

TableVariable.propTypes = {
    editEnableColumns: PropTypes.array,
    isAddable: PropTypes.bool,
}

export default TableVariable;
import React, { PropTypes, Component } from 'react';
import { Tree, Input, Modal, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';


/**
 * 员工树组件
 */
export class ClerkTree extends Component {

    constructor(props) {
        super(props);
        this.componentDataSourceName = "officeClerks";
        this.state = {
            value: []
        }
    }


    componentDidUpdate() {

    }

    componentWillMount() {
        this.props.dispatch({
            type: 'componentDataSource/loadOfficesAndClerksDataForTree',
            payload: 'ALL'
        });
    }

    componentWillUpdate() {
    }


    handleSelect(onSelect, selectedKeys, e) {
        if (onSelect) {
            onSelect(e.node.props.nodeData);
        }
        this.setState({
            value: selectedKeys
        })
    }

    handleCheck(onCheck, checkedKeys, e) {
        if (onCheck) {
            onCheck(checkedKeys, e);
        }
        this.setState({
            value: checkedKeys
        })
    }

    render() {

        const treeData = this.props.componentDataSource[this.componentDataSourceName] || [];
        const loop = data => data.map((item) => {
            if (item.children) {
                return <Tree.TreeNode nodeData={item.data} title={item.name} key={item.key} disableCheckbox={true}>{loop(item.children)}</Tree.TreeNode>;
            }
            return <Tree.TreeNode nodeData={item.data} title={item.name} key={item.key} isLeaf={item.leaf} disableCheckbox={item.leaf === false} />;
        });
        const treeNodes = loop(treeData);
        return (
            <Tree
                {...this.props.elementProps}
                checkable={false}
                multiple={false}
                style={this.props.style}
                onSelect={(selectedKeys, e) => {
                    this.handleSelect(this.props.onSelect, selectedKeys, e)
                    return true;
                } }
                onCheck={(checkededKeys, e) => {
                    this.handleCheck(this.props.onCheck, checkededKeys, e)
                    return true;
                } }
                loadData={this.onLoadData}

                >
                {treeNodes}
            </Tree>
        )
    }
}

/**
 * 员工选择输入框弹窗
 */
export class ClerkSelectModalInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            value: null
        }
    }

    showModal() {
        this.setState({
            showModal: true
        })
    }

    hideModal() {
        this.setState({
            showModal: false,
            value: null
        })
    }

    onSelect(nodeData) {
        this.setState({
            value: nodeData
        })
    }


    render() {
        const { dispatch, componentDataSource } = this.props;
        return (
            <div>
                <Input type='hidden' {...this.props.idProps} />
                <Input {...this.props.nameProps} addonAfter={<a href="javascript:;"><Icon type="edit" onClick={() => {
                    this.showModal();
                } } /></a>} />
                <Modal
                    title="选择人员"
                    visible={this.state.showModal}
                    onCancel={() => {
                         this.hideModal();
                    } }
                    onOk={() => { this.props.onOk(this.state.value);this.hideModal(); } }
                    >
                    <div style={{ padding: '20px' }}>
                        <ClerkTree
                            checkable={true}
                            dispatch={dispatch}
                            componentDataSource={componentDataSource}
                            onSelect={(data) => {
                                this.onSelect(data);
                            } }
                            >
                        </ClerkTree>
                    </div>
                </Modal>
            </div>
        )
    }
}
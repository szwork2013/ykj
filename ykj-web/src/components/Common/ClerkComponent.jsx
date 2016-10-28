import React, { PropTypes, Component } from 'react';
import { Tree, Input } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';

/**
 * 员工树组件
 */
export class ClerkTree extends Component {

    constructor(props) {
        super(props);
        this.componentDataSourceName = "CLERKS";
    }


    componentDidUpdate() {

        //this.props.onOk(this.state.dataSource);

    }

    componentWillMount() {
        this.props.dispatch({
            type: 'componentDataSource/loadClerksData',
            payload: "ALL",
        });
        console.log("数据加载完成")
    }

    componentWillUpdate() {
        console.log("componentWillUpdate")
    }


    handleSelect(onSelect, value, option) {
        if (this.props.onSelect) {
            const dataSource = this.props.componentDataSource[this.componentDataSourceName] || [];

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
        const treeData = this.props.componentDataSource[this.componentDataSourceName] || [];
        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;
        });
        const treeNodes = loop(treeData);
        return (
            <Tree
                {...this.props.elementProps}
                style={this.props.style}
                treeData={}
                >
                {treeNodes}
            </Tree>
        )
    }
}

ClerkTreeBox.propTypes = {
}

export default ClerkTreeBox;
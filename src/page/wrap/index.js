import React from 'react';
import '../../style/index.less';
import Tab from '../../components/tab/Tab.js';
import {Button} from 'antd';
import 'antd/dist/antd.css'
export default class Wrap extends React.Component {
    render() {
        return <div className="app-container">
            <div className="app-content">
                {this.props.children}
            </div>
            <Tab />
        </div>
    }
}
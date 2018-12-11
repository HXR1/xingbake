import React from 'react';
import {NavLink} from 'dva/router';
import './Tab.less';
import {Icon} from 'antd';
export default class Tab extends React.Component{
    render(){
        return <div className="footer">
        <ul className="footer-menu-list">
           <li>
               <NavLink to="/home">
              <i className="iconfont icon-shouye"></i>
               <span>主页</span>
               </NavLink>
           </li>
           <li>
               <NavLink to="/shop">
               <i className="iconfont icon-caidan"></i>
               <span>门店</span>
               </NavLink>
           </li>
           <li>
               <NavLink to="/account">
               <i className="iconfont icon-zhanghao"></i>
               <span>我的账号</span>
               </NavLink>
           </li>
           <li>
               <NavLink to="/menu">
               <i className="iconfont icon-mendian"></i>
               <span>菜单</span>
               </NavLink>
           </li>
           <li>
               <NavLink to="/more">
               <i className="iconfont icon-gengduo"></i>
               <span>更多</span>
               </NavLink>
           </li>
           </ul>
        </div>
    }
}

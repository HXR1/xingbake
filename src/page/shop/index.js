import React from 'react';
import './index.less';
import ImgSrc from '../../assets/icon-search.svg';
import LocationFilter from './LocationFilter';
import { connect } from 'dva';
import Map from './map';
import { Spin } from 'antd';
import {Link} from 'dva/router'
class Shop extends React.Component {
    constructor(){
        super();
        this.state={isSelected:''}
    }
    changLocation = (current, curCity, curCounties) => {
        current = current === '不限' ? '' : current;
        curCity = curCity === '不限' || curCity === '北京' ? '' : ' ' + curCity;
        curCounties = curCounties === '不限' ? '' : ' ' + curCounties;
        this.props.dispatch({ type: 'shop/locationShow' });
        let val = current + curCity + curCounties;
        this.changeText(val)
    }
    changeText = (val) => {
        this.refs.locationText.innerHTML = val;
    }
    changeSelected=()=>{
        this.setState({isSelected:''})
    }
    render() {
        return <div className="shop">
            <div className="navBar">
                <div className="locationFilterSwitch">
                    <div className="locationFilter">
                        <button onClick={() => {
                            this.props.dispatch({ type: 'shop/locationShow' });
                            if (this.props.isShow) {
                                return;
                            } else {
                                this.props.dispatch({ type: 'shop/getLocationList' })
                            }
                        }}>
                            <span ref="locationText">北京 东城</span>
                        </button>
                        {this.props.isShow ? <LocationFilter locationList={this.props.locationList} changLocation={this.changLocation} /> : null}
                    </div>
                    <input type="text" placeholder="输入地址查找门店" />
                    <i></i>
                </div>
                <Link to="/shop/shopfilter">筛选</Link>
            </div>
            <Map changeSelected={this.changeSelected} filter={this.props.location.state}/>
            <div className="shopListBox">
            {!this.props.isLoading?<ul className="shopList">
                {this.props.shopList.length > 0 ? this.props.shopList.map((item, index) => {
                    let {name,address} = item;
                    let {city,streetAddressLine1,streetAddressLine2,streetAddressLine3} = address;
                    return <li className={this.state.isSelected===index?'selected':''} key={index} onClick={()=>{
                        this.setState({isSelected:index})
                    }}>
                        <div className="number">
                            <span>{index+1}</span>
                        </div>
                        <div>
                            <span className="title">{name}</span>
                            <p className="text">{city} {streetAddressLine1} {streetAddressLine2} {streetAddressLine3}</p>
                            <span className="distance">705 m</span>
                        </div>
                        <div className="shopInfo"></div>
                    </li>
                }) : <li className="notFound">
                    找不到门店
                </li>}
            </ul>:<Spin style={{position:'absolute',left:'45%',top:'45%',zIndex:"99"}}/>}
            </div>
        </div>
    }
}
export default connect((state) => {
    return {
        isShow: state.shop.isShow,
        locationList: state.shop.locationList,
        shopList: state.shop.shopList,
        isLoading:state.shop.isLoading
    }
})(Shop)
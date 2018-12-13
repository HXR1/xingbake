import React from 'react';
import mapSrc from '../../assets/timg.jpg';
import { connect } from 'dva';
class Map extends React.Component {
    componentDidMount() {
        this.x = this.ele.offsetLeft;
        this.y = this.ele.offsetTop;
        this.originalX = this.x;
        this.originalY = this.y;
        this.scale = 1;
        this.ele.addEventListener('touchstart', this.start, false);
        this.changeState();
    }
    start = (e) => {
        this.ele.mx = e.touches[0].pageX;
        this.ele.my = e.touches[0].pageY;
        this.ele.addEventListener('touchmove', this.move, false);
        this.ele.addEventListener('touchend', this.end, false);
    }
    move = (e) => {
        let moveX = e.touches[0].pageX - this.ele.mx + this.x;
        let moveY = e.touches[0].pageY - this.ele.my + this.y;
        let minL = -(this.ele.offsetWidth - this.ele.parentElement.clientWidth);
        let maxL = 0;
        let minT = -(this.ele.offsetHeight - this.ele.parentElement.clientHeight);
        let maxT = 0;
        if (moveX > maxL || moveX < minL || moveY > maxT || moveY < minT) return;
        this.ele.style.left = moveX + 'px';
        this.ele.style.top = moveY + 'px';
        // this.preTime = new Date();
        clearTimeout(this.timer1)
        this.timer1 = setTimeout(() => {
            // if (new Date() - this.preTime > 200) {
            //     this.preTime = new Date();
            //     this.changeState();
            //     clearInterval(this.timer1)
            // }
            this.changeState();
        }, 300)
        // if(!this.timer){
        //     this.changeState();
        // }  
    }
    end = () => {
        this.changeState();
        this.timer = null;//================================================
        this.props.changeSelected();
        this.x = this.ele.offsetLeft;
        this.y = this.ele.offsetTop;
        this.ele.removeEventListener('touchmove', this.move, false);
        this.ele.removeEventListener('touchend', this.end, false);
    }
    changeState = () => {
        let latVal = Math.round(Math.random() * 2 + 7);
        let lonVal = Math.round(Math.random() * 3 + 2);
        let lat = 39 + (latVal + Math.random() / 10) / 10;
        let lon = 116 + (lonVal + Math.random() / 10) / 10;
        this.props.dispatch({ type: 'shop/isLoading', payload: true });
        this.timer = setTimeout(() => {
            this.props.dispatch({ type: "shop/getShopList", payload: [lat, lon] });
        }, 1000)
    }
    render() {
        return <div className="map">
            <div className="features">
               {this.props.filter&&this.props.filter.length>0?this.props.filter.map((item,index)=>(
                   <span key={index}>{item}<i>X</i></span>
               )):null}
            </div>
            <img src={mapSrc} className="mapSrc" ref={x => this.ele = x} />
            <div className="map-geolocation">
                <div className="map-geo" onClick={() => {
                    this.ele.style.left = this.originalX + 'px';
                    this.ele.style.top = this.originalY + 'px';
                    this.ele.style.transform = "scale(1)";
                }}></div>
            </div>
            <div className="map-zoomcontrol">
                <div className="add" onClick={() => {
                    this.scale += 0.2;
                    if (this.scale >= 3) return;
                    this.ele.style.transform = `scale(${this.scale})`
                }}>+</div>
                <div className="line"></div>
                <div className="minus" onClick={() => {
                    this.scale -= 0.1;
                    if (this.scale <= 0.2) return;
                    this.ele.style.transform = `scale(${this.scale})`
                }}>-</div>
            </div>
            <a href="javascript:;">
                <img src="https://webapi.amap.com/theme/v1.3/logo@2x.png" />
            </a>
        </div>
    }
}
export default connect((state) => ({ shopList: state.shop.shopList }))(Map)
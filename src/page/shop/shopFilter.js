import React from 'react';
import './shopFilter.less';
import {Icon} from 'antd';
export default class ShopFilter extends React.Component{
    constructor(){
        super();
        this.state={selectAry:[],selectIndex:''}
    }
    select=(e)=>{
        let cur = e.target;
        let selectAry;
        let fn = (val)=>{
            selectAry = this.state.selectAry;
            if(selectAry.includes(val.dataset.type)){
                selectAry=selectAry.filter(item=>item!==val.dataset.type);
            }else{
                selectAry.push(val.dataset.type);
            }
            this.setState({selectAry,selectIndex:val.dataset.type})
        }
        if(cur.nodeName==='LI'){
            fn(cur);
        }else{
            let p = cur.parentElement;
            while(p&&p.nodeName!=='LI'){
                p=p.parentElement;
            }
            if(p.nodeName==='LI'){
                fn(p);
            }
        } 
    }
    render(){
        let typeAry = ['星巴克臻选™','星巴克臻选™特调饮品','咖啡融合冰淇淋','气致™冷萃咖啡','手冲咖啡','专星送™']
        return <div className="shop-filter go" ref="shopFilter">
            <header className="filter-header">
            <Icon type="close" className="header-icon" onClick={()=>{
                this.refs.shopFilter.classList.remove('go');
                this.refs.shopFilter.classList.add('close');
                setTimeout(()=>{
                    this.props.history.push('/shop')
                },100) 
                }}/>
            </header>
            <section className="filter-box">
            <h2>筛选</h2>
            <p>点击筛选出含以下商品的门店 {this.state.selectAry.length>0?<button onClick={()=>this.setState({selectAry:[]})}>清除</button>:null}</p>
            </section>
            <section className="filter-main">
            {/* <ul onClick={(e)=>this.select(e)}>
                <li data-type="0">
                    <b></b>
                    <span>星巴克臻选™</span>
                </li>  
                <li data-type="1">
                    <b></b>
                    <span>星巴克臻选™特调饮品</span>
                </li>  
                <li data-type="2">
                    <b></b>
                    <span>咖啡融合冰淇淋</span>
                </li>  
                <li data-type="3">
                    <b></b>
                    <span>气致™冷萃咖啡</span>
                </li>  
                <li data-type="4">
                    <b></b>
                    <span>手冲咖啡</span>
                </li>  
                <li data-type="5">
                    <b></b>
                    <span>专星送™</span>
                </li>  
            </ul> */}
            <ul onClick={(e)=>{this.select(e)}}>
            {typeAry.map((item,index)=>(
                <li key={index} className={this.state.selectAry.includes(String(index))?'active':''} data-type={index} style={index===parseInt(this.state.selectIndex)?{background:'rgba(0, 0, 0, .05)'}:null}>
                <b></b>
                <span>{item}</span>
            </li>  
            ))}
              </ul>
            </section>
            {this.state.selectAry.length>0?<button className="sure" onClick={()=>{
                let ary = typeAry.filter((item,index)=>{
                    return this.state.selectAry.includes(String(index))
                });
                this.refs.shopFilter.classList.remove('go');
                this.refs.shopFilter.classList.add('close');
                setTimeout(()=>{
                    this.props.history.push({pathname:'/shop',state:ary})
                },100)
                }}>确定</button>:null}
        </div>
    }
}
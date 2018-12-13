import React from 'react';
export default class LocationFilter extends React.Component{
    constructor(){
        super();
        this.state = {curType:'province',current:'',curLetter:'',curCity:'不限',counties:'不限',historyAry:['province']}
    }
    changePro=(item,i)=>{
        let historyAry=this.state.historyAry;
        if(i==='北京'){
            if(!historyAry.includes('counties')){
                 historyAry = [...this.state.historyAry,'counties']
            }
            this.setState({curType:'counties',current:i,curLetter:item,curCity:i,historyAry});
            return;
        }
        if(!historyAry.includes('city')){
           historyAry = [...this.state.historyAry,'city']
        }
        this.setState({curType:'city',current:i,curLetter:item,historyAry})
    }
    changeCity=(item)=>{
        let historyAry=this.state.historyAry;
        if(!historyAry.includes('counties')){
            historyAry = [...this.state.historyAry,'counties']
        }
        this.setState({curType:'counties',curCity:item,historyAry})
    }
    changeCounties=(item)=>{
        this.setState({counties:item})
    }
    render(){
        let locationList=this.props.locationList;  
        return <div className="locationFilterPanel">
        <div className="locationCurrent">
            <span>当前定位：</span>
            <br/>
            <button>北京 东城</button>
        </div>
        <div className="locationFilterTab">
            <span>选择其他</span>
            <button className={this.state.curType==='province'?"locationFilterTab-active":null} onClick={()=>{
                this.setState({curType:'province'})
                }}>省份</button>
            >
            <button className={this.state.curType==='city'?"locationFilterTab-active":null} onClick={()=>{
                if(!this.state.historyAry.includes('city')) return;
                this.setState({curType:'city'})
                }}>城市</button>
            >
            <button className={this.state.curType==='counties'?"locationFilterTab-active":null} onClick={()=>{
                 if(!this.state.historyAry.includes('counties')) return;
                this.setState({curType:'counties'})
                }}>县区</button>
        </div>
        <div className="locationFilterLocations">
        {locationList&&this.state.curType==='province'?Object.keys(locationList).map((item,index)=>{
             return <div className="locationFilterGroup" key={index}>
             <div className="locationFilterGroupName">
             {item}
             </div>
             <div className="locationFilterGroupContent">
             {Object.keys(locationList[item]).map((i,n)=>(
                <button 
                className={this.state.current===i?'locationFilter-active':null}
                key={n} 
                onClick={()=>{
                    this.changePro(item,i)
                }
               }>{i}</button>
             ))}  
             </div>
     </div>
        }):null}
        {locationList&&this.state.curType==='city'?Object.keys(locationList[this.state.curLetter][this.state.current]).map((item,index)=>{
            return <button 
            className={this.state.curCity===item?'locationFilter-active':null}
            key={index}
            onClick={()=>{this.changeCity(item)}} 
           >{item}</button>
        }):null}
        {locationList&&this.state.curType==='counties'?locationList[this.state.curLetter][this.state.current][this.state.curCity].map((item,index)=>{
            return <button 
            className={this.state.counties===item?'locationFilter-active':null}
            key={index}
            onClick={()=>{
                this.changeCounties(item)
            }
            }
           >{item}</button>
        }):null}
        </div>
        <p className="location-footer">仅可搜索中国大陆地区门店 <button className={this.state.current?"primary active":'primary'} 
        onClick={()=>{
            let {current,curCity,counties}=this.state;
            this.props.changLocation(current,curCity,counties)
        }
        }>确认</button></p>
    </div>
    }
}
import axios from '../api';
import { dispatch } from 'rxjs/internal/observable/pairs';
export default{
    namespace:'shop',
    state:{
        isShow:false,
        locationList:null,
        shopList:[],
        isLoading:false
    },
    effects:{
        *getLocationList({payload},{call,put}){
            let getLocationList = ()=>{
                return axios.get('/getShopLocationList')
            }
            let res = yield call(getLocationList);
            yield put({type:'locationList',payload:res})
        },
        *getShopList({payload},{call,put}){
            let [lat,lon] = payload;
            let getShopList = (lat,lon)=>{
                return fetch(`https://www.starbucks.com.cn/api/stores/nearby?lat=${lat}&lon=${lon}&limit=30&locale=ZH&features=&radius=6006`).then(res=>{
                    try{
                        return res.json();
                    }catch(e){
                       console.log(e);
                    }
                })
            }
            let res = yield call(getShopList,lat,lon);
                yield put({type:'shopList',payload:res.data||[],isLoading:false})
        }
    },
    reducers:{
        locationShow(state,action){
            return {...state,isShow:!state.isShow}
        },
        locationList(state,action){
            return {...state,locationList:action.payload}
        },
        shopList(state,action){
            return {...state,shopList:action.payload,isLoading:action.isLoading}
        },
        isLoading(state,action){
            return {...state,isLoading:true}
        }
    }
}


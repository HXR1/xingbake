import axios from 'axios';
axios.defaults.baseURL = 'https://easy-mock.com/mock/5c1062ef9814fb5e48f954d1';
axios.interceptors.response.use((res)=>{
    return res.data;
},(err)=>{
    return Promise.reject(err)
})
export default axios;
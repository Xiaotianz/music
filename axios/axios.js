import axios  from  "axios"
import qs from "qs"

//配置默认请求
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://lxiaotian.top:4500';
//线上地址
// axios.defaults.baseURL = 'xxxxxxx';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//配置请求拦截
axios.interceptors.request.use(config => {
    //判断当前url是不是登录接口
   if(config.url !="/"){
       if(localStorage.getItem("token")){
           config.headers["token"] = localStorage.getItem("token");
       }
   }
    return config;
},error => {
    return Promise.reject(error);
});
//配置响应拦截
axios.interceptors.response.use(response => {
    if(response.data.token){
        localStorage.setItem("token",response.data.token);
    }else if(response.data.status == 401){
        //表示登录过期
        return '登录过期'
    }else if(response.data.status == 500){
        return '服务器错误'
    }else if(response.data.status == 404){
        return '获取数据失败'
    }else{
        return response;
    }
    return response;
},error => {
    if(error.response){
        switch(error.response.status){
            case 200 : return error;
            case 404 : return 404;
            case 500 : return 500;
        };
        if(error.message.includes('timeout')){
            console.log("网络超时,请检查网络连接是否正常");
            return Promise.reject(error);
        }
    }
});
//封装post请求
var post = ((url,body)=>{
    return new Promise ((resolve,reject)=>{
        axios.post(url,body)
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            console.error(err);
            reject(err);
        })
    })
});
//封装get请求 params是个对象
var get = ((url,params)=>{
    return new Promise ((resolve,reject)=>{
        axios.get(url,{params:params})
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            console.error(err); 
            reject(err);
        })
    })
})
export default {
    post,
    get,
}
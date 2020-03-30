import axios from "../../axios/axios"


var songsurl = (id=>{
    return new Promise ((resolve,reject)=>{
        axios.get("/check/music",{id}).then(res => {
            if(res == 404){
                reject("亲,暂无版权");
            }else if(res.data.message == 'ok'){
                axios.get("/song/url",{id}).then(res => {
                    resolve(res.data.data[0].url);
                }).catch(err => {
                    reject(err);
                })
            }else{
                reject(res.data.message);
            }
        }).catch(err => {
            reject("亲,请稍后重试");
        })
    })
});
var songsurlall= (id=>{
    return new Promise ((resolve,reject)=>{
        axios.get("/check/music",{id}).then(res => {
            if(res == 404){
                reject("亲,暂无版权");
            }else if(res.data.message == 'ok'){
                axios.get("/song/url",{id}).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            }else{
                reject(res.data.message);
            }
        }).catch(err => {
            reject("亲,请稍后重试");
        })
    })
})
export default {
    songsurl,
    songsurlall,
};
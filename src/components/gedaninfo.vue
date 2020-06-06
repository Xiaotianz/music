<template>
    <div class="allgedan">
        <div class="tuijian">
            我是推荐歌曲
        </div>
    </div>
</template>

<script>
import axios from "../../axios/axios"
import ver from '../function/ver'
export default {
    data(){
        return{
            getname:""
        }
    }, 
    created(){
        console.log(this.$route.params.name);
    },
    watch:{
        // 监听路由的params.name
        '$route.params.name'(val,old){
            this.getname = ver(val);
        },
        getname(val,old){
           if(val){
               //这里去请求数据
            // axios.get("/top/playlist/highquality",{
            //     limit:30,
            //     cat:val,
            // })
            // .then(res => {
            //     console.log(res)    
            // })
            // .catch(err => {
            //     console.error(err); 
            // })
            axios.get('/playlist/catlist',)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err); 
            })
           }
        }
    }
}
</script>

<style>

</style>
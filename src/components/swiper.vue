<template>
    <div>
        <!-- 轮播 -->
        <mu-carousel hide-controls>
            <mu-carousel-item v-for="item in swiper_data" :key="item.id">
                <img v-lazy="item.pic" @click.prevent="">
            </mu-carousel-item>
        </mu-carousel> 
    </div>
</template>

<script>
import axios from "../../axios/axios"
export default {
    data(){
        return {
            swiper_param:{
                type:2     //请求数据的参数 默认按照安卓获取 后期更改
            },
            swiper_data:[],
        }
    },
    created(){
        axios.get("/banner",this.swiper_param)
        .then(res => {
            if(res.data.code == 200){
                this.swiper_data = res.data.banners;
            }else{
                console.log("errror");
            }
        })
        .catch(err => {
            console.error(err); 
        })
    },
    methods:{

    }
}
</script>


<style>
.mu-carousel{
    border-radius: 24px !important;
    height: 390px;
}
.mu-carousel .mu-carousel-item img{
    width: 100%;
    height: 100%;
    border-radius: 24px;
}    

</style>
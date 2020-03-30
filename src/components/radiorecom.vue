<template>
<!-- 推荐电台 -->
        <div class="recomm-radio">
            <div class="radio" v-for="item in recommdata" :key="item.id">
                <img v-lazy="item.picUrl" alt="" class="img" @click.prevent="">
                <span class="test">{{item.name}}</span>
            </div>
        </div>
</template>

<script>
import axios from "../../axios/axios"
export default {
    data(){
        return{
            param:{
                limit:6
            },
            recommdata:[],
        }
    },
    created(){
        axios.get("/program/recommend")
        .then(res => {
            for(var i = 0;i<6;i++){
                this.recommdata.push(res.data.programs[i].radio);
            }
        })
        .catch(err => {
            console.error(err); 
        })
    }
}
</script>

<style>
.recomm-radio{
    width: 100%;
    overflow: auto;
    display: flex;
    margin-right:0;
}
.recomm-radio .img{
    width: 300px;
    height: 300px;
    border-radius: 24px;
}
.recomm-radio .radio{
    padding-left: 25px;
}
.recomm-radio .radio:first-child{
    padding-left: 0;
}
.recomm-radio .test{
    font-size: 28px;
}
</style>
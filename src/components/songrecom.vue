<template>
    <div class="song">
        <!-- 歌曲推荐 -->
        <div class="songrecom" v-for="item in songdata" :key="item.id" @click="songsurl(item.id,item.name)" >
            <div class="geimg">
                <img v-lazy="item.picUrl" alt="">
            </div>
            <div class="wenbeninfo">
                <div class="gemin">{{item.name}} </div>
            </div>
            <div class="icon">
                <img src="" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../../axios/axios"
import songurlfun from "../function/index"
export default {
    data(){
        return{
            songdata:[],
        }
    },
    created(){
        axios.get("/personalized/newsong")
        .then(res => {
            for(var i = 0;i<3;i++){
                this.songdata.push(res.data.result[i]);
            }
        })
        .catch(err => {
            console.error(err); 
        })
    },
    methods:{
        songsurl(id){
           songurlfun(id).then(res=>{
               this.$store.commit("songurl",res);
           }).catch(err=>{
               console.log(err);
           })
        }
    }
}   
</script>

<style>
 .songrecom{ 
    display: flex;
 }
 .geimg img{
     width: 160px;
     height: 160px;
     border-radius: 24px;
 }
 .wenbeninfo .gemin{
     padding-left: 55px;
     text-align: center;
     font-size: 25px;
 }
</style>
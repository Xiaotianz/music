<template>
<!-- 推荐歌单 -->
        <div class="recomm-songs">
            <div class="songs" v-for="item in recommdata" :key="item.id" @click="go_songslist(item.id);">
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
        axios.get("/personalized",this.param)
        .then(res => {
            this.recommdata = res.data.result
        })
        .catch(err => {
            console.error(err); 
        })
    },
    methods:{
        go_songslist(id){
            
            this.$router.push({
                name:"songs",
                params:{
                    "id":id
                }
            })
        },
    }
}
</script>

<style>
.recomm-songs{
    width: 100%;
    overflow: auto;
    display: flex;
    margin-right:0;
}
.recomm-songs .img{
    width: 300px;
    height: 300px;
    border-radius: 24px;
}
.recomm-songs .songs{
    padding-left: 25px;
}
.recomm-songs .songs:first-child{
    padding-left: 0;
}
.recomm-songs .test{
    font-size: 28px;
}
</style>
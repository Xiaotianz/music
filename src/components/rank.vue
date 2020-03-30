<template>
    <div class="ranks">
        <!-- 排行榜 --> 
        <div class="rank" v-for="item in rankdata" :key="item.id">
            <div class="rank-img">
                <img v-lazy="item.al.picUrl" alt="">  
            </div>

            <div class="rank-info">
                <div class="song-name">{{item.al.name}}</div>
                <div class="song-geshou">{{item.ar[0].name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../../axios/axios"
export default {
    data(){
        return {
            rankdata:[],
        }
    },
    created(){
        axios.get("/top/list",{idx:0})
        .then(res => {
            for(var i =0;i<5;i++){
                this.rankdata.push(res.data.playlist.tracks[i]);
            }
        })
        .catch(err => {
            console.error(err); 
        })
    }
}
</script>

<style>
.rank{
    display: flex;
    margin-bottom: 40px;
}
.rank-info{
    width: 100%;
    padding-left:15px;
    padding-top: 40px;
}
.rank-img img{
    width: 200px;
    height: 200px;
    border-radius: 24px;
}
.song-name{
    font-size: 35px;
    padding-bottom: 10px;
}
.song-geshou{
    font-size: 20px;
    color: #9c9c9c
}

</style>
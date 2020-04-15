<template>

  <!-- 推荐音乐-->
  <div class="dayrec"> 
        <div class="top">
            <div class="black">
                <img src="../assets/black.png" alt="" width="24" height="24">
            </div>
            <div class="riqi"><span class="ri">15</span><span class="yue">/04</span></div>
        </div>
        <div class="dayrecs">
            <div class="palyallss">
                <img src="../assets/play.png" alt="" width="20" height="20">
                <div>播放全部<span class="allsongs">(共{{122}}首)</span></div>
            </div>  
            <div class="lists">
                <div class="songlists"  v-for="(item) in data " :key="item.id">
                    <div class="touxiang">
                        <img :src="item.picUrl" alt="" width="30" height="30">
                    </div>
                    <div class="songinfo">
                        <div class="songsname">{{item.name}}</div>
                        <div class="geshou">{{item.song.album.artists[0].name}}-{{item.song.album.name}}</div>
                    </div>
                    <div class="icons">
                        <img src="../assets/palymusic.png" alt="" width="24" height="24" class="play-icon">
                    </div>
            </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from "../../axios/axios"
export default {
    data(){
        return{
            data:[],
        }
    },
    created(){
        axios.get("/personalized/newsong")
        .then(res => {
            this.data = res.data.result;
        })
        .catch(err => {
            console.error(err); 
        })
    }
}
</script>

<style>
    .dayrec{
        height: 100vh;  
        background: #ccc;

    }
    .dayrec .top{
        height: 20%;
        
    }
    .dayrec .black{
        height: 30%;
        width: 100%;
        padding:30px 0 0 30px;
    }
    .dayrec .day{
        height: 10%;
    }
    .dayrec .riqi{
        height: 70%;
        padding-left: 30px;
    }
    .dayrec .riqi::before{
        display: inline-block;
        content: "";
        height: 100%;
        vertical-align: middle;
    }
    .dayrec .ri{
        font-size: 80px;
    }
    .dayrec .yue{
        padding-left: 10px;
        font-size: 40px;
    }
    .dayrec .dayrecs{
        height: 80%;
        background: #ffffff;
        border-radius: 60px 60px 0 0 ;
    }
    .dayrec .dayrecs .palyallss{
        display: flex;
        height: 187px;
        padding: 60px 40px;
    }
    .dayrec .dayrecs .palyallss div{
        font-size: 40px;
        padding-left: 40px;
    }
    .dayrec .dayrecs .palyallss div .allsongs{
        font-size: 30px;
        color: #ccc
    }
    .dayrec .songlists{
        display: flex;
        padding-left: 40px
    }
    .dayrec .songlists .touxiang{
        line-height: 152px;
        text-align: center;
        border-radius: 60px;
        width: 10%;
    }
    .dayrec .songlists .touxiang img{
        border-radius: 10px;
        width: 100px;
        height: 100px;
    }
    .dayrec .songlists .songinfo{
        width: 70%;
        font-size:40px;
        padding-left: 30px;
    }
    .dayrec .songlists .icons{
        width: 20%;
        text-align: center;
    }
    .dayrec .songinfo .geshou{
        font-size:30px;
        color: #999;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis; 
    }
    .dayrecs .lists{
        margin-bottom: 150px;
    }
</style>
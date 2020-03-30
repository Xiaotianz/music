<template>
    <div class="albums">
        <!-- 最新专辑 -->
        <div class="album" v-for="item in albumdata" :key="item.id">
            <div class="album-img">
                <img v-lazy="item.picUrl" alt="" srcset="">
            </div>
            <div class="album-name">
                <div class="zhuanji-name">{{item.name}}</div>
                <div class="artist-name">{{item.artist.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axios/axios';
export default {
    data(){
        return{
            albumdata:[]
        }
    },
    created(){
    axios.get("/album/newest")
        .then(res => {
            for(var i = 0;i<3;i++){
                this.albumdata.push(res.data.albums[i]);
            }
        })
        .catch(err => {
            console.error(err); 
        })
    }
}
</script>

<style>
.albums{
    display: flex;
    justify-content:space-between;
    margin-bottom: 250px;
}
    .album-img img{
        width: 300px;
        height: 300px;
        border-radius: 24px;
    }
    .album-name {
        font-size: 20px;
    }
    .album-name .zhuanji-name{
        width: 300px;
        overflow:hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
    }
</style>
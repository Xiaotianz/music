<template>
    <div class="search-">
        <div class="songs" v-for="item in search_data" :key="item.id" @click="gequxinxi(item.id),play(item.id)">
                <div class="songsnames">{{item.name}}</div>
                <div class="singe">{{item.artists[0].name}}-{{item.album.name}}</div>
        </div>
    </div>
</template>

<script>
import axios from "../../axios/axios"
import songurl from "../function/index"
export default {
    data(){
        return {
          
        }
    },
    props:{
        search_data:Array,
    },
    methods:{
        gequxinxi(id){
            axios.get("/song/detail",{ids:id})
            .then(res => {
                this.$store.commit("addsongs",res.data.songs);
                var data = {
                    id:id,
                    songname:res.data.songs[0].name,
                    singer:res.data.songs[0].ar[0].name,
                    picUrl:res.data.songs[0].al.picUrl,
                    index:1,
                }
                this.$store.commit('songinfos',data);
            })
            .catch(err => {
                console.error(err); 
            })
        },
        play(id){
            songurl.songsurl(id).then(res=>{
                    this.$store.commit("songurl",res);
<<<<<<< HEAD
                    this.$store.commit("play",false);
                    this.$router.push({path:"/play",name:"play"});
                    this.$store.commit("status",true);
=======
                    this.$store.commit("play",true);
                    this.$store.commit("status",true);
                
>>>>>>> f85217584cd9acd94b66b1080309c50d3db2a2de
            }).catch(err=>{
                this.$store.commit("songurl","");
                alert("歌曲暂时没有版权");
            })
        }
    }
}
</script>

<style >
.search-{
    flex: 1;
    overflow: scroll;
    padding-bottom: 200px;
}
.songs{
    width: 70%;
    margin-top: 60px;
}
.songsnames{
    font-size: 40px;
    color:#333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.singe{
    font-size: 30px;
    color: #888;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
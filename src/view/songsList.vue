<template>
    <div>   
        <div class="songslist">
            <!-- 上部分为歌单信息 -->
            <!-- :style="{backgroundImage: 'url(' + songslistdata.coverImgUrl + ')'}" -->
            <div class="songstop" >
                <!-- 导航及标题 -->
                <div class="songslistnav">
                    <div class="leftinfo">
                        <img src="../assets/black.png" alt="" width="24" height="24" @click="goblack()">
                        <div>歌单</div>
                    </div>
                    <div class="rightinfo">
                        <img src="../assets/search-bai.png" alt="" width="24" height="24" class="search">
                        <img src="../assets/sandian.png" alt="" width="20" height="20" class="sandian">
                    </div>
                </div>
                <!-- 歌单信息图片及信息 -->
                <div class="songsinfo">
                    <div class="songsinfo-left">
                        <img v-lazy="songslistdata.coverImgUrl" alt="" width="128" height="128" class="coverimg">
                    </div>
                    <div class="songsinfo-right">
                        <div class="gedanname">{{this.songslistdata.name}}</div>
                        <div class="songsalu">
                            <img v-lazy="this.zuozhexinxi.avatarUrl" alt="" width="26" height="26" class="zuoze">
                            <div class="zuozename">{{this.zuozhexinxi.nickname}}
                                <img src="../assets/right_jiantou.png" alt="" width="10" height="10" class="jiantou">
                            </div>
                        </div>
                        <div class="songsjieshao">
                            <div>{{this.songslistdata.description}}</div>
                             <!-- <img src="../assets/right_jiantou.png" alt="" width="10" height="10" class="jiantou"> -->
                        </div>
                    </div>
                </div>
                <!-- 图标按钮 -->
                <div class="iconinfo">
                    <div>
                         <img src="../assets/info.png" alt="" width="28" height="28">
                            <div>88</div>
                    </div>
                    <div>
                        <img src="../assets/fenxiang.png" alt="" width="28" height="28">
                            <div>分享</div>
                    </div>
                    <div>
                        <img src="../assets/xiazai.png" alt="" width="28" height="28">
                            <div>下载</div>
                    </div>
                    <div>
                        <img src="../assets/duoxuan.png" alt="" width="28" height="28">
                            <div>多选</div>
                    </div>
                </div>
            </div>
            <!-- 下部分为歌曲信息 -->
            <div class="songsbottom">
                <div class="palyall">
                    <img src="../assets/play.png" alt="" width="20" height="20">
                    <div>播放全部<span class="allsongs" @click="all()">(共{{this.allsongsLenght}}首)</span></div>
                </div>
                <div class="songlist" v-for="(item, index) in songslistdata.tracks" :key="item.id">
                    <div class="index">{{index+1}}</div>
                    <div :class="activeClass == index ? 'clicks':'songinfo' " @click="play_info(item.name,item.ar[0].name,item.al.picUrl,item.id,index);songsurl(item.id)" >
                        <div class="songsname">{{item.name}}</div>
                        <div class="geshou">{{item.ar[0].name}} - {{item.al.name}}</div>
                    </div>
                    <div class="icon">
                        <img src="../assets/palymusic.png" alt="" width="24" height="24" class="play-icon" @click="play_info(item.name,item.ar[0].name)">
                        <img src="../assets/sandian-hui.png" alt="" width="26" height="26">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// :style="{backgroundImage: 'url(' + songslistdata.coverImgUrl + ')'}"
import axios from "../../axios/axios"
import songurl from "../function/index"
import songsurl from '../function/index' 
import xiayiqu from "../function/qiege"
export default {
    data(){
       return {
           songslistdata:[],
           zuozhexinxi:[],
           allsongsLenght:"",
           activeClass:-1,
           songslistdataid:[],    //所有歌曲id
       } 
    },
    created(){
      if(sessionStorage.getItem("songsid")){
          //如果存在此id 则去请求数据 如果不存在 然后判断 route是否带id , 如果带id 则表示用户是点击歌单进入的，如果不带则表示用户非法进入
          var id = sessionStorage.getItem("songsid");
          axios.get("/playlist/detail",{id})
          .then(res => {
              //歌单全部数据
              this.songslistdata = res.data.playlist;
              //作者数据
              this.zuozhexinxi = res.data.playlist.creator;
              //歌曲数量
              this.allsongsLenght = res.data.playlist.tracks.length;
              //把歌单全部数据 给vuex 
              this.$store.commit("gedanid",this.songslistdata);
 
            })
          .catch(err => {
              console.error(err); 
          })
      
      }else{
          var songsid = this.$route.params.id;
          if(songsid){
              //存在表示用户点击
              sessionStorage.setItem("songsid",songsid);
                axios.get("/playlist/detail",{id:songsid})
                .then(res => {
                    // console.log(res);
                    this.songslistdata = res.data.playlist;
                    this.zuozhexinxi = res.data.playlist.creator;
                    this.allsongsLenght = res.data.playlist.tracks.length;
                    this.$store.commit("gedanid",this.songslistdata);
                    //拿到所有歌曲的id
                    // for(var i in this.songslistdata.tracks){
                    //    this.songslistdataid.push(this.songslistdata.tracks[i].id);
                    // }
                    // //拿歌单所有id去请求 URL
                    // var id = '';
                    // for(var i=0;i<this.songslistdataid.length;i++){
                    //     id += this.songslistdataid[i]+",";
                    // }
                    //         //解决最后一个逗号
                    // var str=(id.substring(id.length-1)==',') ? id.substring(0,id.length-1) : id; 
                    // songsurl.songsurlall(str).then(res=>{
                    //     //   console.log(res);
                    //      this.$store.commit("songallurl",res.data);
                    // }).catch(err=>{
                    //      alert("亲,请重试")
                    // });
                })
                .catch(err => {
                    console.error(err); 
                })
            }else{
                this.$router.push({
                    path:"/"
                })
            }
        };
        //这里拿到的是歌单全部歌曲的url 
        //做个判断 
    },
    beforeRouteLeave(to,from,next){
        if(to.fullPath == "/"){
            sessionStorage.removeItem('songsid');
        }
        next();
    },
    methods:{
        goblack(){
            this.$router.go(-1);
        },
        play_info(songname,singer,picUrl,id,index){
            // console.log(songname,singer);
            this.activeClass = index;
            var data = {
                id,
                songname,
                singer,
                picUrl,
                index,    
            }
            this.$store.commit("songinfos",data);
            this.$store.commit("play",true);
        },
        //
        songsurl(id){
            // console.log(id);
            songsurl.songsurl(id).then(res=>{
                // console.log(res);
                if(res == null){
                    xiayiqu(this.$store.state.songsinfo.index +1).then(ress=>{
                      songurl.songsurl(ress).then(res=>{
                          this.$store.commit("songurl",res);
                          this.$store.commit("status",true);
                       }).catch(err=>{
                           console.log(err);
                       })
                    })
                }else{
                    this.$store.commit("songurl",res);
                    this.$store.commit("status",true);
                    this.$store.commit("gedanid",this.songslistdata);
                }
            }).catch(err=>{   
                //调用此方法 当遇到没有版权的歌曲时 调用此方法 自动播放下一曲
                xiayiqu(this.$store.state.songsinfo.index +1).then(ress=>{
                    songurl.songsurl(ress).then(res=>{
                        this.$store.commit("songurl",res); 
                        this.$store.commit("status",true);
                    }).catch(err=>{
                        console.log(err);
                    })
                })
            })
        },
        all(){

        }
    },
    computed:{
        store(){
            return this.$store.state.songsinfo.index
        }
    },
    watch:{
        //当前播放的歌曲的高亮
        store(val,old){
            this.activeClass = val; 
        },
        //歌单页面销毁后重新进入会找不到当前播放的歌曲 这里处理这个问题
        songslistdata(val,old){
            if(val){
                //监听歌曲是否存在 不存在会找不到id 
                if(this.$store.state.songsinfo.id){
                    console.log(1);
                    var currentid = val.tracks[this.$store.state.songsinfo.index].id;
                    var cuid = this.$store.state.songsinfo.id
                    if(currentid == cuid){
                        this.activeClass = this.$store.state.songsinfo.index
                    }else{
                        this.activeClass = -1;
                    }
                }else{
                    console.log(0);
                }
            }
        }
    }
}
</script>

<style>
.songslist{
    background:#ccc;
    /* padding:50px 40px 0 40px; */
    border-radius: 30px 30px 0 0 ;
}
.songstop{
    padding:50px 40px 0 40px;
}
.songslistnav{
    display: flex;
    justify-content: space-between;
    padding-bottom: 80px;
}
.leftinfo{
    display: flex;
    line-height: 80px;
}
.leftinfo div{
    padding-left: 35px;
    font-size: 40px;
    color: white;
}
.rightinfo .sandian{
    padding-left: 30px;
}
.songsinfo{
    display: flex;
    padding-bottom: 80px;
}
.songsinfo-left img{
    border-radius: 14px;
}
.songsinfo-right{
    padding-left: 40px;
}
.songsinfo-right .gedanname{ 
    font-size: 53px;
    color: white;
    padding-bottom: 10px;
}
.songsalu{
    display: flex;
    line-height: 90px;
    padding-bottom: 45px;
}
.songsalu .zuoze{
    border-radius: 50%;
    margin-right: 20px;
}
.songsalu .zuozename{
    font-size: 30px;
    color: white;
}
.songsjieshao{
     text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    font-size: 25px;
    color: white;
}
.iconinfo{
    display: flex;
    justify-content: space-between;
    margin-left: 70px;
    margin-right: 70px;
    padding-bottom: 40px;
}
.iconinfo div{
    text-align: center;
    font-size: 26px;
    color: white;
}
.songsbottom{
    background: white;
    border-radius: 60px 60px 0 0 ;
    margin-bottom: 100px;
}
.palyall{
    display: flex;
    padding: 60px 40px;
    margin-bottom: 40px;
}
.palyall div{
    font-size: 40px;
    padding-left: 40px;
}
.palyall div .allsongs{
    font-size: 30px;
    color: #ccc
}
.songlist{
    padding: 0 40px 80px 55px;
    font-size: 40px;
    line-height: 40px;;
    display: flex;
    
}
.songlist .index{
    line-height: 86px;
    font-size: 50px;
    padding-right:55px; 
    color: #ccc
}
.songinfo{
    width: 70%;
    padding-right: 15px;
}
.songsname {
    padding-bottom: 20px;
}
.songinfo .geshou{
    font-size: 30px;
    color: #8c8c8c;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.icon{
    width: 30%;
    display: flex;
    justify-content:space-between;
}

.clicks{
    width: 70%;
    padding-right: 15px;
    color: red;
}
</style>
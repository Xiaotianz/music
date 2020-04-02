<template>
    <div>
        <!-- 播放器样式 -->
        <div class="paly">
            <div class="play_left" @click="bofangqi()">
                <img v-lazy="this.$store.state.songsinfo.picurl" alt="" width="30" height="30" class="picurl">
                <div class="songname">{{this.$store.state.songsinfo.songname}}
                    <div class="geci">{{this.$store.state.songsinfo.singer}}</div>
                </div>
            </div>
            <div class="play_right">
                <img :src="playstatus" alt="" width="26" height="26" class="play_bofang" @click="bofang_icon()">
                <img src="../assets/songslist.png" alt="" width="30" height="30" @click="openBotttomSheet()">
            </div>
        </div>
        <mu-bottom-sheet :open.sync="open">     
            <div class="top">
                <div class="songlen">当前播放<span>({{length}}首)</span></div>
                    <div class="set">
                        <div class="left">
                            <img src="../assets/xunhuan.png" alt="" width="20" height="20">
                            <div class="wenzi">列表循环</div>
                        </div>
                        <div class="right">
                            <img src="../assets/shouchang.png" alt="" width="20" height="20">
                            <div class="wenzi">收藏全部</div>
                            <img src="../assets/qingkong.png" alt="" width="20" height="20">
                        </div>
                    </div>
            </div>
            <div class="bottom" style="height:100%;overflow: auto;margin-bottom:25px;">
                <div class="gequlist" style="width:100%" v-for="(item,index) in this.$store.state.gedaninfo.tracks" :key="item.id">
                    <div class="geming" style="width:60%" @click="dianji(index,item.name,item.ar[0].name,item.al.picUrl);qiege(item.id)">{{item.name}} 
                        <span>-{{item.ar[0].name}}</span>
                    </div>
                    <div class="clear">
                        <img src="../assets/dele.png" alt="" width="20" height="20" @click="dele(index)">
                    </div>
                </div>
            </div>
        </mu-bottom-sheet>
           <audio :src="this.$store.state.songsinfo.songsurl" autoplay ref="audio" id="audio" @ended="ended" @pause="pause" @canplay="getDuration" @timeupdate="updateTime" ></audio>
    </div>
</template>
<script>
import songurl from "../function/index"
import xiayiqu from "../function/qiege"
export default {
    data(){
        return{
            icon:false,
            icon_ok:true,
            open:false,     
            length:"",
            activeClass:-1,
            index:"",
            playstatus:require("../assets/play_goto_bofang.png"),
            local:["play_goto_bofang.png","play_stop.png"]
        }
    },
    methods:{
        ended(){
          //下一曲在这里
          //通过歌单或者其他页面的点击 来给第一首歌曲赋值并 获得当前的索引给 vuex 的歌曲信息
          if(this.$store.state.songsinfo.playmode == 0){ //列表循环模式 存在 最后一曲的问题 在这里判断一下
            if(this.$store.state.songsinfo.index  == this.$store.state.gedaninfo.tracks.length -1){
                this.$store.commit("index",0)
            }else{
                this.$store.commit("index",this.$store.state.songsinfo.index+1);
            }    
          }else if(this.$store.state.songsinfo.playmode == 1){   //单曲循环模式 直接播放
                this.$refs.audio.play();
          }else{  //随机播放 
                var val =Math.floor(Math.random() * this.$store.state.gedaninfo.tracks.length)  //生成歌曲列表内的随机数
                this.$store.commit("index",val)
          }    
        
          xiayiqu(this.$store.state.songsinfo.index).then(ress=>{
            songurl.songsurl(ress).then(res=>{
                if(res == null){
                    this.$store.commit("index",this.$store.state.songsinfo.index+1);
                  //当歌曲url为 null 时 调用此方法 播放下一曲
                    xiayiqu(this.$store.state.songsinfo.index).then(ress=>{
                        songurl.songsurl(ress).then(res=>{
                             this.$store.commit("songurl",res);
                             this.$nextTick(()=>{
                                 this.$refs.audio.play();
                             })
                        })
                    }).catch(err=>{
                        console.log(err);
                    })

                }else{
                    this.$store.commit("songurl",res);
                    this.$nextTick(()=>{
                       this.$refs.audio.play();
                    })
                }
            }).catch(err=>{
                //这里是当歌曲没有版权时所处理的
                this.$store.commit("index",this.$store.state.songsinfo.index+1);
                xiayiqu(this.$store.state.songsinfo.index).then(ress=>{
                    if(ress== null){
                        this.$store.commit("index",this.$store.state.songsinfo.index+1);
                        xiayiqu(this.$store.state.songsinfo.index).then(ress=>{
                            songurl.songsurl(ress).then(res=>{
                                this.$store.commit("songurl",res);
                                this.$nextTick(()=>{
                                    this.$refs.audio.play();
                                })
                            })
                        }).catch(err=>{
                            console.log(err);
                        })
                    }else{
                        this.$store.commit("songurl",res);
                        this.$nextTick(()=>{
                        this.$refs.audio.play();
                        })
                    }
                })
            })
          }).catch(err=>{
              console.log(err);
          })
        },
        duration(){
          
        },
        pause(){
         
        },
        getDuration(){
             this.duration = this.$refs.audio.duration;
             var result = this.fomast(this.duration);
            //  console.log(result);
            this.$store.state.songsinfo.duration = result;
            //计算歌曲总的时长 换算成秒
            var fen = result.substr(0,1);
            var miao = fen * 60;
            var sult =  result.substring(2,4);
            var max = miao + parseInt(sult);
            this.$store.commit("max",max);
            
        },
        updateTime(e){
            this.currentTime = e.target.currentTime;  //获取audio当前播放时间
            this.$store.commit("dangqian",this.currentTime);
            var time = this.fomast(this.currentTime);
            this.$store.state.songsinfo.currentTime = time;
        },
        fomast(interval){
            interval = interval | 0;
            var fen = interval/60 | 0
            var miao = interval % 60
            // var max = fen*60+miao;
            // this.$store.commit("max",max);
            if(miao < 10){
                return `${fen}:0${miao}`
            }else{
                return `${fen}:${miao}` 
            }
        },
        bofang_icon(){    //在触发这个方法之前 是播放状态  触发之后我需要把他变成暂停状态
           if(this.$store.state.songsinfo.songsstatus){
               this.$store.commit("status",false);
               this.$refs.audio.pause();
               this.playstatus = require("../assets/"+this.local[1]);
           }else{
               this.$store.commit("status",true);
               this.$refs.audio.play();
               this.playstatus = require("../assets/"+this.local[0]);
           }
        }, 
        openBotttomSheet () {
            this.open = true;
            this.length = this.$store.state.gedaninfo.tracks.length;
        },
        //更换播放器内容信息 
        dianji(index,name,singer,picurl){
            console.log(index);
            this.$store.commit("songinfos",{songname:name,singer,picUrl:picurl});
        },
        //删除 需要重写
        dele(index){
        //     this.$store.state.gedaninfo.tracks.splice(index,1);
        //     this.length = this.$store.state.gedaninfo.tracks.length;
        //     this.$store.commit("songurl","");
        //     this.activeClass = -1;
        },
        //这里是换歌 
        qiege(id){
            this.icon =false,
            this.icon_ok = true;
            songurl.songsurl(id).then(res=>{
                this.$store.state.songsinfo.songsurl = res;
            }).catch(err=>{
                alert(err);
            })
        },
        bofangqi(){
          this.$store.commit("play",false);
          this.$router.push({path:"/play"});
        }
    },
    computed:{
      status(){
          return this.$store.state.songsinfo.songsstatus
      },
    },
    watch: {
      status(val,old){
          if(val){
              //状态为播放
              this.playstatus = require("../assets/"+this.local[0]);
                this.$nextTick(()=>{
                    this.$refs.audio.play();
                })
          }else{
              //状态为暂停
              this.playstatus = require("../assets/"+this.local[1]);
              this.$refs.audio.pause();
          }
      }
    },
}
</script>

<style>
.paly{
    height: 3.6rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top:1px solid rgb(226, 226, 226);
    background: white;
    opacity: 0.9;
    display: flex;
    justify-content: space-between
}
.play_left{
    width: 60%;
    padding: 25px 0 0 20px;
    display: flex;
}
.picurl{
    border-radius: 50%
}
.songname{
    line-height: 42px;
    padding-left: 18px;
    font-size: 28px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
}
.geci{
    font-size: 22px;
    color: #8c8c8c
}
.play_right{
    width: 30%;
    padding: 25px 40px 0 20px;
}
.play_bofang{
    margin-right: 50px;
}
.mu-bottom-sheet {
    background-color: #fff;
    position: fixed;
    left: 50px;
    right: 50px;
    bottom: 40px;
    border-radius: 20px;
    height: 60%;
    overflow: hidden;
}
.mu-bottom-sheet .top{
    height: 18%;
    border-radius: 30px;
    padding-bottom: 60px;
    overflow: hidden;
}
.mu-bottom-sheet .songlen{
    font-size: 45px;
    font-weight: 700;
    padding:30px;
}
.mu-bottom-sheet .songlen span{
    font-size: 25px;
    color: #8c8c8c
}
.mu-bottom-sheet .set{
    display: flex;
    justify-content: space-between;
    padding-left: 30px;
}
.mu-bottom-sheet .set .left{
    display: flex;
}
.mu-bottom-sheet .set .left img{
    margin-right: 25px;
}
.mu-bottom-sheet .set .right{
    display: flex;
    
}
.mu-bottom-sheet .set .right img{
    margin-right: 20px;
}
.mu-bottom-sheet .set .right div{
    margin-right: 80px;
}
.mu-bottom-sheet .set .wenzi{
    font-size: 33px;
}
.mu-bottom-sheet .gequlist{
    display: flex;
    justify-content: space-between;
    padding:30px 0;
}
.mu-bottom-sheet .geming{
    padding-left: 30px;
    font-size: 33px;
}
.mu-bottom-sheet .geming span{
    font-size: 28px;
    color: #8c8c8c;
}
.mu-bottom-sheet .clear{
    padding-right: 22px;
}
</style>
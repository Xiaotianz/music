<template>
   <div class="music-play">
      <div class="top">
          <div class="black">
              <img src="../assets/black.png" alt="" width="24" height="24" @click="go_black()">
          </div>
          <div class="name">
              <p class="songname">{{this.$store.state.songsinfo.songname}}</p>
              <p class="singer">{{this.$store.state.songsinfo.singer}}</p>
          </div>
          <div class="fenxiang">
              <img src="../assets/fenxiang.png" alt="" width="24" height="24">
          </div>
      </div>
      <div class="content">
          <div><img :src="this.$store.state.songsinfo.picurl" alt="" width="800" height="800" :style="run"></div>
      </div>
      <div class="bottom">
          <div class="icon_play">
              <div><img src="../assets/play/空心.png" alt="" width="24" height="24"></div>
              <div><img src="../assets/xiazai.png" alt=""  width="24" height="24"></div>
              <div><img src="../assets/play/铃声.png" alt=""  width="24" height="24"></div>
              <div><img src="../assets/info.png" alt=""  width="24" height="24"></div>
              <div><img src="../assets/play/竖三点.png" alt=""  width="24" height="24"></div>
          </div>
          <div class="slider">
              <span style="color:#fff">{{times}}</span>
              <mu-slider class="demo-slider" color="#eee" v-model="value1" :display-value="aas" :max="max"></mu-slider>
              <span style="color:#fff">{{this.$store.state.songsinfo.duration}}</span>
          </div>
          <div class="kongzhi">
              <div><img :src="defmodestatus" alt="" width="28" height="28" @click="qiehuanmode()"></div>
              <div><img src="../assets/play/上一曲- 网易icon.png" alt="" width="32" height="32" @click="up()"></div>
              <div><img :src="defstatus" alt="" width="64" height="64" @click="pause()"></div>
              <div><img src="../assets/play/下一曲 - 网易.png" alt="" width="32" height="32" @click="down()"></div>
              <div><img src="../assets/play/趴间_歌曲列表_32.png" alt="" width="28" height="28"></div>
          </div>
      </div>
   </div>
</template>

<script>
import xiayiqu from "../function/qiege"
import songurl from "../function/index"
export default {
    data(){
        return{
            value1:0,
            aas:false,
            run:"",
            flag:1,
            defstatus:require("../assets/play/播放1.png"),
            playstatus:["播放1.png","播放.png"],

            defmodestatus:require("../assets/play/循环.png"),
            modestatus:["循环.png","单曲播放.png","随机播放.png"],

            times:"0:00",
            max:parseInt(this.$store.state.songsinfo.max),
        }
    },
    created(){
        if(this.$store.state.songsinfo.songname){
            if(this.$store.state.songsinfo.songsstatus){
                this.run = "animation-play-state:running"
                this.defstatus = require("../assets/play/"+this.playstatus[0]);
            }else{
                this.run = "animation-play-state:paused"
                this.defstatus = require("../assets/play/"+this.playstatus[1])
            }
        }else{
            this.$router.replace({path:"/"});
        };
        if(this.$store.state.songsinfo.playmode == 1){
            this.defmodestatus = require("../assets/play/"+this.modestatus[1]);
        }else if(this.$store.state.songsinfo.playmode == 0){
            this.defmodestatus = require("../assets/play/"+this.modestatus[0]);
        }else{
            this.defmodestatus = require("../assets/play/"+this.modestatus[2]);
        }
        if(this.$store.state.songsinfo.duration){
            // clearInterval(this.timer);
            // this.timer = setInterval(() => {
            //     this.value1 = this.$store.state.songsinfo.dangqian;
            //     // console.log(this.max);
            //     // console.log(this.value1);
            // if (this.value1 > this.max )
            //      if(this.times == "0:00"){
            //          this.$store.commit("dangqian",0);
            //          this.value1 = 0;
            //      }
            // }, 1000);
        }
    },
    beforeDestroy () {
        // if (this.timer) clearInterval(this.timer);
    },
    methods:{
        go_black(){
            this.$store.commit("play",true);
            this.$router.go(-1);
        },
        pause(){ 
            if(this.$store.state.songsinfo.songsstatus){
                console.log(123);
                this.$store.commit("status",false);
                this.run = "animation-play-state:paused"
                this.defstatus = require("../assets/play/"+this.playstatus[1]);
            }else{
                console.log(456);
                this.$store.commit("status",true);
                this.run = "animation-play-state:running"
                this.defstatus = require("../assets/play/"+this.playstatus[0])
            }
        },
        down(){
          //下一曲在这里
          //通过歌单或者其他页面的点击 来给第一首歌曲赋值并 获得当前的索引给 vuex 的歌曲信息
          if(this.$store.state.songsinfo.index  == this.$store.state.gedaninfo.tracks.length -1){
              this.$store.commit("index",0)
          }else{
              this.$store.commit("index",this.$store.state.songsinfo.index+1);
          }         
          xiayiqu(this.$store.state.songsinfo.index).then(ress=>{
            songurl.songsurl(ress).then(res=>{
                if(res == null){
                    this.$store.commit("index",this.$store.state.songsinfo.index+1);
                  //当歌曲url为 null 时 调用此方法 播放下一曲
                    xiayiqu(this.$store.state.songsinfo.index).then(ress=>{
                        songurl.songsurl(ress).then(res=>{
                            this.$store.commit("songurl",res);
                            this.$store.commit("status",true)
                        })
                    }).catch(err=>{
                        console.log(err);
                    })

                }else{
                    this.$store.commit("songurl",res);
                this.$store.commit("status",true)
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
                                this.$store.commit("status",true)
                            })
                        }).catch(err=>{
                            console.log(err);
                        })
                    }else{
                        this.$store.commit("songurl",res);
                        this.$store.commit("status",true)
                    }
                })
            })
          }).catch(err=>{
              console.log(err);
          })
        },
        up(){
          if(this.$store.state.songsinfo.index == 0){
              this.$store.commit("index",this.$store.state.gedaninfo.tracks.length-1);
          }else{
              this.$store.commit("index",this.$store.state.songsinfo.index-1);
          }
          xiayiqu(this.$store.state.songsinfo.index).then(ress=>{
            songurl.songsurl(ress).then(res=>{
                if(res == null){
                    this.$store.commit("index",this.$store.state.songsinfo.index-1);
                  //当歌曲url为 null 时 调用此方法 播放下一曲
                    xiayiqu(this.$store.state.songsinfo.index).then(ress=>{
                        songurl.songsurl(ress).then(res=>{
                            this.$store.commit("songurl",res);
                            this.$store.commit("status",true)
                        })
                    }).catch(err=>{
                        console.log(err);
                    })

                }else{
                    this.$store.commit("songurl",res);
                    this.$store.commit("status",true)
                }
            }).catch(err=>{
                //这里是当歌曲没有版权时所处理的
                this.$store.commit("index",this.$store.state.songsinfo.index-1);
                xiayiqu(this.$store.state.songsinfo.index).then(ress=>{
                    if(ress== null){
                        this.$store.commit("index",this.$store.state.songsinfo.index-1);
                        xiayiqu(this.$store.state.songsinfo.index).then(ress=>{
                            songurl.songsurl(ress).then(res=>{
                                this.$store.commit("songurl",res);
                                this.$store.commit("status",true)
                            })
                        }).catch(err=>{
                            console.log(err);
                        })
                    }else{
                        this.$store.commit("songurl",res);
                        this.$store.commit("status",true)
                    }
                })
            })
          }).catch(err=>{
              console.log(err);
          })
        },
        qiehuanmode(){
            if(this.flag<3){
                this.defmodestatus = require("../assets/play/"+this.modestatus[this.flag]);
                if(this.flag == 2){
                    this.$store.commit("mode",2);
                }else{
                    this.$store.commit("mode",1);
                }
                this.flag+=1;
            }else{
                  this.defmodestatus = require("../assets/play/"+this.modestatus[0]);
                  this.$store.commit("mode",0);
                  this.flag = 1;
            }
        }

    },
    computed:{
      time(){
          return this.$store.state.songsinfo.currentTime 
      },
      maxs(){
          return this.$store.state.songsinfo.max
      },
      value(){
          return this.$store.state.songsinfo.dangqian_time
      }
    },
    watch:{
        time(val,ola){
           this.times =val;
        },
        maxs(val,ola){ //监听总时长
           this.max = parseInt(val);
        },
        value(val,ola){   //监听当前播放的时间
           this.value1 = parseInt(val);
        }
    }
}
</script>

<style>
p{
    margin: 0;
    padding: 0;
}
.music-play{
    height: 100%;
    display: flex;
    flex-direction:column;
    background: #3e3c3f
}
.music-play .top{
    height: 10%;
    width: 100%;
    /* padding: 30px 0 0 30px; */
    display: flex;
}
.music-play .top .black{
    width: 12%;
    padding:30px 0 0 30px;
}
.music-play  .top .name {
    padding-top: 20px;
    width: 78%;
}
.music-play .top .name p{
    color: #fff;
}
.music-play .top .name .songname{
    padding-left: 0;
    font-size: 30px;
    line-height: 60px;
}
.music-play .top .name .singer{
    font-size: 18px;
}
.music-play .top .fenxiang{
    padding-top: 30px;
}
.content{
    height: 60%;
}
.content div{
    width: 100%;
    height: 100%;
    padding:30% 0;
    text-align: center;
}
.content img{
    width: 800px;
    height: 800px;
    border-radius: 50%;
    animation: rotateArround 35s linear 0s infinite normal;
    -webkit-animation: rotateArround 35s linear 0s infinite normal;
	-moz-animation: rotateArround 35s  linear 0s normal;
	-ms-animation: rotateArround 35s  linear 0s normal;
	-o-animation: rotateArround 35s  linear 0s normal;
}
.bottom{
    height: 40%;
}
.bottom .icon_play{
    display: flex;
}
.bottom .icon_play div{
    width: 25%;
    text-align:center;
}
.bottom .slider{
    display: flex;
    margin: 30px 30px;
}
.bottom .slider span{
    line-height: 60px;
    font-size: 26px;
}
.mu-slider-fill{
    height: 5px;
}
.mu-slider-track{
    height: 5px;
}
.mu-slider-thumb{
    width: 20px;
    height: 20px;
    border-radius: 50%
}
.mu-slider{
    height: 55px;
    margin: 0 20px;
}
.kongzhi{
    display: flex;
    align-items:center;
}
.kongzhi div{
    width: 25%;
    text-align: center;
}

@keyframes rotateArround {
	from {transform: rotateZ(0deg);}
	to {transform: rotateZ(360deg);}
}
@-webkit-keyframes rotateArround {
	from {-webkit-transform: rotate(0deg);
	}
	to {-webkit-transform: rotate(360deg);}
}

@-moz-keyframes rotateArround {
	from {-moz-transform: rotate(0deg);}
	to {-moz-transform: rotate(360deg);}
}

@-ms-keyframes rotateArround {
	from {-ms-transform: rotate(0deg);}
	to {-ms-transform: rotate(360deg);}
}

@-o-keyframes rotateArround {
	from {-o-transform: rotate(0deg);}
	to {-o-transform: rotate(360deg);}
}

</style>
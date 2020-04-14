import vue from "vue"
import vuex from "vuex";
import { stat } from "fs";

vue.use(vuex);

const store  = new vuex.Store({
    state:{
        songsinfo:{
            id:"",           //歌曲id
            songname:"",        //歌曲名称
            singer:"",          //歌手
            geci:"",            //歌词
            picurl:"",       //歌曲图片地址
            songsurl:'',     //歌曲播放地址
            index:"",        //当前播放音乐的index;
            songsstatus:false,   //播放器状态 暂停或者播放
            playstatus:false,    // 播放器隐藏和显示
            playmode:0,         // 0 列表循环  1 单曲循环 2 随机播放    
            duration:"",          //歌曲总时间, 分秒形式
            currentTime:"" ,      //当前所播放的时间 分秒形式
            max:"",              //歌曲总长 单位 秒
            dangqian_time:"",        //当前播放 单位 秒  
        },
        gedaninfo:{},          //歌单的歌曲信息      
        search_jilu:[],        //搜索记录
    },
    mutations:{
        //歌曲信息页
        songinfos(state,data){
            state.songsinfo.id = data.id,
            state.songsinfo.songname = data.songname,
            state.songsinfo.singer = data.singer,
            state.songsinfo.picurl = data.picUrl,
            state.songsinfo.index = data.index;
        },
        //歌曲url
        songurl(state,url){
            state.songsinfo.songsurl = url;
        },
        //歌单全部信息
        gedanid(state,gedaninfo){
            state.gedaninfo = gedaninfo
        },
        // 添加歌曲到歌单
        addsongs(state,songs){
            console.log(typeof songs);
            // console.log(songs);
        },
        //切歌索引
        index(state,flag){
            state.songsinfo.index = flag;
        },
        //播放器状态
        status(state,flag){
            state.songsinfo.songsstatus = flag;
        },
        //播放器显示隐藏
        play(state,flag){
            state.songsinfo.playstatus = flag;
        },
        mode(state,flag){
            state.songsinfo.playmode = flag
        },
        max(state,miao){  //总时长 秒
            state.songsinfo.max = miao;
        },
        dangqian(state,miao){ //当前 秒
            state.songsinfo.dangqian_time = miao
        },
        //搜索记录
        searchjilu(state,data){
            var jieguos = state.search_jilu.indexOf(data);
            if(jieguos == -1){
                if(state.search_jilu.length == 5){
                    state.search_jilu.pop();
                    state.search_jilu.unshift(data);
                }else{
                    state.search_jilu.unshift(data);
                }
                localStorage.setItem('jilu',state.search_jilu);
            }
        },
        searchdele(state){
            state.search_jilu = [];
        } 
    }
})

export default store
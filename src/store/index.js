import vue from "vue"
import vuex from "vuex";

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
            duration:"",          //歌曲总时间,
            currentTime:""       //当前所播放的时间
        },
        gedaninfo:{},          //歌单的歌曲信息      
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
        }
    }
    
})

export default store
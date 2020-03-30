import store from "../store/index"

//异步的方式能够获取到vuex当前的值
var xiayiqu = ((index)=>{
    return new Promise((res,rej)=>{
        const xiayiquid = store.state.gedaninfo.tracks[index].id;
        
        var data ={
            id:store.state.gedaninfo.tracks[index].id,
            songname:store.state.gedaninfo.tracks[index].name,
            singer:store.state.gedaninfo.tracks[index].ar[0].name,
            picUrl:store.state.gedaninfo.tracks[index].al.picUrl,
            index:index,  //这里把之前的歌曲index给到index 
        }
        //最后一首处理在 play组件里面 并不在这里处理
        store.commit("songinfos",data);
        if(xiayiquid == store.state.songsinfo.id){
            res(xiayiquid);
        }else{
            rej("err");
        }
    })
})


export default xiayiqu 

/*
    console.log(this.$store.state.songsinfo.index);
    const xiayiquid = this.$store.state.gedaninfo.tracks[this.$store.state.songsinfo.index+1].id;
    //数据重新给播放器 进行数据刷新
    var data ={
        id:this.$store.state.gedaninfo.tracks[this.$store.state.songsinfo.index+1].id,
        songname:this.$store.state.gedaninfo.tracks[this.$store.state.songsinfo.index+1].name,
        singer:this.$store.state.gedaninfo.tracks[this.$store.state.songsinfo.index+1].ar[0].name,
        picUrl:this.$store.state.gedaninfo.tracks[this.$store.state.songsinfo.index+1].al.picUrl,
        index:this.$store.state.songsinfo.index,  //这里把之前的歌曲index给到index 
    }
    
    this.$store.commit("songinfos",data);
    //调用index进行加1 具体看 store
    this.$store.commit("index");




    const xiayiquid = store.state.gedaninfo.tracks[store.state.songsinfo.index+1].id;
        var data ={
            id:store.state.gedaninfo.tracks[store.state.songsinfo.index+1].id,
            songname:store.state.gedaninfo.tracks[store.state.songsinfo.index+1].name,
            singer:store.state.gedaninfo.tracks[store.state.songsinfo.index+1].ar[0].name,
            picUrl:store.state.gedaninfo.tracks[store.state.songsinfo.index+1].al.picUrl,
            index:store.state.songsinfo.index,  //这里把之前的歌曲index给到index 
        }
        store.commit("songinfos",data);
        store.commit("index");
        if(xiayiquid == store.state.songsinfo.id){
            res(xiayiquid);
        }else{
            rej("err");
        }
    })
*/
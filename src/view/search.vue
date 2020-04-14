<template>
   <div class="search_music">
        <div class="search_top">
            <img src="../assets/black.png" alt="" width="24" height="24" @click="balck()">
            <mu-text-field v-model="value" placeholder="只支持音乐搜索" solo :suffix="forX" type="search"  @keyup.13="sosuo(value)"></mu-text-field >
            <img src="../assets/歌手.png" alt="" width="28" height="28" class="geshouxinxi">
       </div>

<<<<<<< HEAD

       <searchHost class="ces" v-if="host_switch" @child_searchWord="child_searchWord"></searchHost>
       <searchSong v-if="search_switch" :search_data="search_songinfo" class="ces"></searchSong>


=======
       <searchHost class="ces" v-if="host_switch" @child_searchWord="child_searchWord"></searchHost>

       <searchSong v-if="search_switch" :search_data="search_songinfo" class="ces"></searchSong>




>>>>>>> f85217584cd9acd94b66b1080309c50d3db2a2de
       <div class="search-tishi" v-show="open">
           <div class="contents">
               <div class="sosuo sosuocolor" @click="sosuo(value)">
                   <span>搜索 "{{value}}"</span>
               </div>
                <div class="sosuo" v-for="item in suggest" :key="item.keyword" @click="sosuo(item.keyword)">
                    <img src="../assets/search.png" alt="" width="12" height="12" style="line-height:40px">
                   <span>{{item.keyword}}</span>
               </div>
           </div>
       </div>
   </div>
</template>

<script>
import searchHost from "../components/searchHost"
import searchSong from "../components/searchsong"
import axios from "../../axios/axios"
export default {
    data(){
        return{
            value:"",
            forX:"",
            open:false,
            host_switch:true,
            search_switch:false,
            suggest:[], //搜索建议
            search_songinfo:[], //搜索歌曲信息
            flag:true,
<<<<<<< HEAD
=======
            array:[],
>>>>>>> f85217584cd9acd94b66b1080309c50d3db2a2de
        }
    },
    methods:{
        balck(){
            this.$router.replace("/");
        },
        sosuo(keywords){
            if(keywords){
                    axios.get("/search",{
                        keywords:keywords,
                        limit:"30",
                        type:"1",
                    })
                    .then(res => {
                        this.search_songinfo = res.data.result.songs;
                    })
                    .catch(err => {
                        console.error(err); 
                    });
                this.host_switch = false,
                this.search_switch = true;
                this.open = false;
            }
<<<<<<< HEAD
            //添加搜索记录
            this.$store.commit("searchjilu",keywords);
=======
            this.array.push(keywords);
            console.log(this.array);
>>>>>>> f85217584cd9acd94b66b1080309c50d3db2a2de
        },
        child_searchWord(val){
            if(val){
                this.sosuo(val);
                this.value = val;
                this.flag = false;
            }
        }
    },
    components:{
        searchHost,
        searchSong
    },
    watch: {
        value(value,ola){
            if(value){
                this.forX = "×"
                // 获取搜索词提示信息
                axios.get("/search/suggest",{
                    keywords:value,
                    type:"mobile"
                })
                .then(res => {
                    this.suggest = res.data.result.allMatch;
                })
                .catch(err => {
                   console.log("error");
                })
                if(this.flag){
                    this.open =true
                }else{
                    this.open = false;
                }
            }else{
                this.forX = ""
                this.open = false
                this.host_switch = true,
                this.search_switch = false;
            }
        }
    },
}
</script>

<style>
    .search_music{
        height: 100vh;
        width: 100%;
        background: #ccc;
        padding: 0px 40px;
        overflow-y: auto;
        /* position: relative; */
        display: flex; 
        flex-direction: column;
    }
    .search_top{
        padding-top: 40px;
        display: flex;
        padding-bottom: 50px;
        height: 5rem;
    }
    .search_top .mu-input{
        width: 90%;
        height: 100px;
        margin-left: 50px;
        font-size: 30px;
        border-bottom:1px solid #fff
    }
    .ces{
        flex: 1;
        overflow-y:scroll;
        padding-bottom: 100px;
    }
    .mu-text-field-input{
        height: 80px;
    }
    .search_top .mu-input .mu-text-field-input{
        height: 80px;
    }
    .mu-input-suffix-text{
        font-size: 50px;
    }
    .geshouxinxi{
        margin-left: 40px ;
        margin-top:15px;
    }
    .search-tishi{
        width: 81%;
        background: #fff;
        position: absolute;
        top:8%;
        box-shadow: 40px 40px 40px -40px black;
        
    }
    div.content div:last-child{
        border-bottom:none;
    }
    .sosuo{
        box-sizing: border-box;
        width: 100%;
        line-height: 135px;
        padding: 0px 30px;
        border-bottom: 1px solid #ccc;
        font-size: 40px;
    }
    .sosuocolor{
        color:#0000ff
    }
    .flexd{
    }
</style>
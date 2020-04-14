<template>
    <div class="searchHost">
        <div class="search_jilu" v-show="show">
            <div style="font-size:12px;font-weight: 500;height:30px;line-height: 20px">历史记录</div>
            <div style="padding-right: 8px;"><img src="../assets/回收站.png" alt="" width="24" height="24" @click="dele()"></div>
        </div>
        <div class="lishijulu" style="padding-top: 5px;margin-bottom:20px">
            <mu-chip class="demo-chip" v-for="(chip,index) in chips" :key="chip" color="primary" @delete="remove(index)" delete @click="childclick(chip)">{{chip}}</mu-chip>
        </div>
        <div style="font-size:14px;">热搜榜</div>

        <div class="hot" v-for="(item, index) in searchHost" :key="item.score" @click="childclick(item.searchWord)">
            <div class="search-index">{{index+1}}</div>
            <div class="search-hot-info">
                <div>{{item.searchWord}}</div>
                <div class="info-jieshao">{{item.content}}</div>
            </div>
            <div class="search-cishu">
                <div>{{item.score}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../../axios/axios"

export default {
    data(){
        return{
            chips:[],
            searchHost:[],
            show:false,
        }
    },
    created(){
        axios.get("/search/hot/detail",{})
        .then(res => {
           this.searchHost = res.data.data;
        })
        .catch(err => {
            console.error(err); 
        })
    },
    mounted(){
        if(localStorage.getItem("jilu")){
            this.chips = localStorage.getItem("jilu").split(",") || [];
        }else{
            this.chips = [];
        }
    },
    methods:{
        childclick(searchWord){
            // console.log(searchWord);
            this.$emit("child_searchWord",searchWord);
        },
        remove(index){
            this.chips.splice(index,1);
            this.$store.commit("searchdele");
            if(this.chips.length == 0){
                localStorage.removeItem("jilu");
            }else{
                for(var i = 0;i<this.chips.length;i++){
                    this.$store.commit("searchjilu",this.chips[i]);
                }
            }
        },
        dele(){
            this.show = false;
            this.chips = [];
            localStorage.removeItem("jilu");
        }
    },
    watch:{
        chips(val,ola){
            if(val.length == 0){
                this.show = false ;
            }else{
                this.show = true ;
            }
        }
    }
}
</script>

<style>
    .search_jilu{
        display: flex;
        justify-content: space-between;
        overflow-y: auto;
    }
    .lishijulu{
        display: flex;
        width: 100%;
        overflow-x:auto
    }
    .demo-chip {
        margin: 8px;
        vertical-align: middle;
        border-radius: 1.42667rem;
        padding: 0px 1.32rem;
        font-size: 35px;
        line-height: 60px;
    }
    .mu-chip-delete-icon {
        width: 40px;
        height: 40px;
    }
    .hot{
        display: flex;
        width: 100%;
         margin-bottom: 80px;
         margin-top: 20px;
    }
    .search-index{
        width: 10%;
        text-align: center;
        margin: auto 0;
        font-size: 40px;
        padding-right: 40px;
    }
    .info-jieshao{
        font-size: 30px;
        color: #888;
        padding-top: 5px;
    }
    .search-hot-info{
        width: 70%;
        font-size: 40px;
    }
    .search-cishu{
        width: 20%;
        text-align: center;
        margin: auto 0;
        font-size: 25px;
         color: #888;
    }
</style>
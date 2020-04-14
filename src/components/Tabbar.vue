<template>
<!-- 文字导航  -->
    <div class="Tabbar">
        <div class="tabbar">
            <div class="tabbar-icon">
                <img src="../assets/navicon.png" alt="" class="icon-bar" width="20" height="20">
                <img src="../assets/search.png" alt="" class="icon-search" width="20" height="20" @click="go_search()">
            </div>
            <div class="tabbar-nav">
                <div class="My-music">我的</div>
                <div class="Find-music default">发现</div>
                <div class="cloud">云村</div>
                <div class="video">视频</div>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        go_search(){
            this.$router.push({
                name:"search",
            });
        }
    }
}
</script>

<style>

.Tabbar{
    position: relative;
    font-size:40px;
}
.tabbar{
    width: 100%;
}
/* icon左右两边 */
.tabbar .tabbar-icon{
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
}
/* 文字居中 */
.tabbar .tabbar-nav{
    display: flex;
    justify-content: center;
    padding-left: 50px;
    color: #9C9C9C;
}
/* 让居中的文字分离 */
.tabbar .tabbar-nav div{
    margin-right: 60px;
}

.tabbar .default{
    font-size: 43px;
    color: black;
    font-weight: bold;
}
</style>
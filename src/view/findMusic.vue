
<template>
    <div class="findmusic">
        <!-- tabbar -->
        <tabbar class="tabbar"></tabbar>
        <!-- 轮播图 -->
        <swiper class="swiper"></swiper>
        <!-- 图标导航 -->
        <iconnav class="iconnav"></iconnav>
            <div class="wenben">
                <p class="recomm">推荐歌单</p>
                <p class="more">查看更多</p>
            </div>
        <!-- 推荐歌单 -->
        <recomms></recomms>
            <div class="wenbeninfo">
                    <p class="songs">歌曲推荐</p>
                    <p class="playall">
                    <img src="" alt="">
                    播放全部
                    </p>
            </div>
        <!-- 推荐歌曲 -->
        <songrecom></songrecom>
            <div class="wenben">
                <p class="recomm">电台推荐</p>
                <p class="more">查看更多</p>
             </div>
        <!-- 推荐电台 -->
        <radiorecom></radiorecom>
    <div class="wenben">
            <p class="recomm">云音乐新歌榜</p>
            <p class="more">查看更多</p>
        </div>
        <!-- 云音乐新歌榜 -->
        <rank></rank>
    <div class="wenben">
            <p class="recomm">最新专辑</p>
            <p class="more">查看更多</p>
        </div>
        <!-- 最新专辑 -->
        <album></album>
        </div>
</template>

<script>
// 视图 采用通用组件引用的方式 
import tabbar from "../components/Tabbar"
import swiper from "../components/swiper"
import iconnav from "../components/iconnav"
import recomms from "../components/recomsons"
import songrecom from '../components/songrecom';
import radiorecom from "../components/radiorecom"
import rank from "../components/rank"
import album from "../components/album"
export default {
    components:{
        tabbar,
        swiper,
        iconnav,
        recomms,
        songrecom,
        radiorecom,
        rank,
        album,
    }
}
</script>

<style>
.findmusic{
    padding-left: 40px;
    padding-right: 40px;
}
    .iconnav{
        margin-top: 50px;
    }
    .swiper{
        margin-top: 70px;
    }
    .tabbar{
        margin-top: 50px;
    }
    .wenben{
        margin-top: 70px;
        margin-bottom: 35px;
        display: flex;
        justify-content: space-between;
    }
    .more{
        font-size: 28px;
        border:1px solid #cccccc;
        padding: 10px 25px 5px 25px;
        border-radius:40px;
    }
    .recomm{
        color: #8c8c8c;
        font-size: 25px;
    }
    .wenbeninfo{
         margin-top: 40px;
         margin-bottom: 40px;
        display: flex;
        justify-content: space-between;
    }
    .songs{
        color: #8c8c8c;
        font-size: 25px;
    }
    .playall{
        font-size: 28px;
        border:1px solid #cccccc;
        padding: 10px 25px 5px 25px;
        border-radius:40px;
    }
</style>
<template>
    <div>
        <!-- 图标导航 -->
        <div class="icon-nav">
            <div class="nav-text">
                 <img src="../assets/tuijian.png" alt="" width="48" height="48">
                 <span>每日推荐</span>
            </div>
            <div class="nav-text">
                 <img src="../assets/tuijian.png" alt="" width="48" height="48">
                 <span>歌单</span>
            </div>
            <div class="nav-text">
                 <img src="../assets/排行榜.png" alt="" width="48" height="48">
                 <span>排行榜</span>
            </div>

            <div class="nav-text">
                 <img src="../assets/心理电台.png" alt="" width="48" height="48">
                 <span>电台</span>
            </div>
            <div class="nav-text">
                 <img src="../assets/fm.png" alt="" width="48" height="48">
                 <span>私人FM</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="">
    .icon-nav{
        width: 100%;
        display: flex;
        padding-left: 6px;
        padding-right: 6px;
        justify-content: space-between;
    }
    .icon-nav .nav-text{
        display: flex;
        flex-direction:column;
    }
    .icon-nav .nav-text span{
        text-align: center;
        padding-top: 25px;
        font-size: 25px;
    }
</style>
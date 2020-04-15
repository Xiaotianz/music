<template>
    <div class="gedan-top">
        <div class="tops">
            <div class="gedan-black">
                <img src="../assets/后退.png" alt="" width="24" height="24">
                <div class="wenzi">歌单广场</div>
            </div>
                <div class="gedan-tab">
                    <mu-tabs ripple="false" full-width>
                        <mu-tab to="/gedan/huayu">华语</mu-tab>
                        <mu-tab to="/gedan/gufeng">古风</mu-tab>
                        <mu-tab to="/gedan/omei">欧美</mu-tab>
                        <mu-tab to="/gedan/liuxing">流行</mu-tab>
                        <mu-tab to="/gedan/yaogun">摇滚</mu-tab>
                        <mu-tab to="/gedan/dianzi">电子</mu-tab>
                    </mu-tabs>
                </div>
        </div>
        <router-view class="roulink"></router-view>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.tops{
    height: 293px;
}
.gedan-black{
    height: 40%;
    width: 100%;
    padding:30px 0 0 30px;
    display: flex;
}
.wenzi{
    font-size: 40px;
    padding-left: 40px;
}
.wenzi::before{
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle;
}
.gedan-tab{
    margin-top: 40px;
    width: 100%;
}
.mu-tabs{
    height: 130px;
    background: #fff;
    display: flex;
    width: 100%;
    overflow: auto;

}
.mu-tab {
    min-width: none;
    max-width: none;
    width: 25%;
    font-size: 40px;
    color: black;
    height:100%;
    line-height: 120px;
}
.mu-tab-active {
    color:#ff2400
}
.roulink{
    flex: 1;
}

</style>
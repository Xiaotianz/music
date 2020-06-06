<template>
    <div class="gedan-top">
        <div class="tops">
            <div class="gedan-black">
                <img src="../assets/后退.png" alt="" width="24" height="24">
                <div class="wenzi">歌单广场</div>
            </div>
                <div class="gedan-tab" ref>
                    
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



.roulink{
    flex: 1;
}

</style>
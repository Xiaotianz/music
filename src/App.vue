<template>
  <div id="app">
    <router-view/>
    <!-- 隐藏与显示是在这里写的 -->
    <paly v-show="show"></paly>
  </div>
</template>

<script>
import paly from "./components/play"
export default {
  name: 'App',
  components:{
    paly
  },
  data(){
    return{
      show:false,
    }
  },
  //计算vuex的播放地址
  computed:{
    store(){
      return this.$store.state.songsinfo.playstatus;
    }
  },
  watch: {   //监听这个函数是否有变化 有变化则显示播放器组件
    store(val,old){
      if(val){ 
        this.show = true;
      }else{
        this.show = false;
      }
    },
    
  },
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* font-size:40px;   */
  overflow-x: hidden;
}
</style>

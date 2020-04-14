import Vue from 'vue'
import Router from 'vue-router'
import findmusic from "@/view/findMusic"
import songs from "@/view/songsList"
import play from "@/view/music-play"
import search from "@/view/search"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      name:"findmusic",
      component:findmusic,
    },
    {
      path:"/songs",
      name:"songs",
      component:songs,
    },
    {
      path:"/play",
      name:"play",
      component:play
    },
    {
      path:"/search",
      name:"search",
      component:search
    }
  ]
})

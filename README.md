# netcloudmusic

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

BUG1 滑动时 推荐歌单左右两边的margin无法设置0
BUG2 屏幕分辨率不一样的手机会导致页面会出现滑动 //已经解决
BUG3 最新专辑 手机默认浏览器 会导致padding失效 
BUG4 歌单里面的 icon 到第10首歌曲 会有一个偏移 原因是10占的地方与1-9占的宽度不一样 根本问题在于布局 布局出现很大的问题 flex布局应该给宽度 而且布局结构没有思考清楚导致此BUG

歌单需要实现的功能 往下滑 导航居顶 文字变成歌单名字

 
播放器是一个组件 只要存在播放列表 在哪个页面都是居低  然后数据都是从当前的页面给到播放器组件的 vuex实现

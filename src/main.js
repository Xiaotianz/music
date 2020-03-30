// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import store from "./store/index"
import VueLazyLoad from 'vue-lazyload'


Vue.use(MuseUI);
Vue.use(VueLazyLoad,{
  preLoad: 1.3,
  error:'./assets/error.png',
  loading:'./assets/loading.gif',
  attempt: 1
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})

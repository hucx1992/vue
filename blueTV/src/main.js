// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import lazy from 'vue-lazyload'
import store from './../store'
import VideoPlayer from 'vue-video-player';



Vue.use(VideoPlayer)

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.HOST = '/api'
Vue.prototype.CMS = '/cms'
Vue.prototype.ALI = '/ali'
Vue.prototype.ALIM = '/alim'
Vue.prototype.MY = '/my'
Vue.prototype.Player = '/player'


Vue.use(lazy, {
  preLoad: 1.3,
  error: 'http://tv.cztv.com/cztv/user/load_logo.png',
  loading: 'http://tv.cztv.com/cztv/user/load_logo.png',
  attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

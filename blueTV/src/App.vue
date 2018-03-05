<template>
  <div id="app">
    <div class="toTop" :style="{opacity: scrollTop/1000, bottom: (-0.8+scrollTop/500)>1?1:-0.8+scrollTop/500+'rem'}" @click="scorllToTop">ㄑ</div>
    <topbar></topbar>
    <Ad></Ad>
    <transition name="showPage">
      <keep-alive><router-view></router-view></keep-alive>
    </transition>
    <transition name="showPlay">
      <played v-if="showPlayPage"></played>
    </transition>
  </div>
</template>

<script>
import {mapMutations, mapState, mapGetters} from "vuex";
import topbar from "./components/common/topbar";
import Store from "../store";
import Ad from "./components/homeComponents/ad";
import Played from "./components/common/played";
export default {
  name: 'App',
  components: {
    topbar,
    Ad,
    Played
  },
  data(){
    return {
      scrollTop: 0
    }
  },
  methods: {
    scrolls(){
      this.scrollTop = document.documentElement.scrollTop
    },
    scorllToTop(){
      document.documentElement.scrollTop = 0
    }
  },
  mounted(){
    window.addEventListener('scroll', this.scrolls)
  },
  computed: {
    ...mapGetters([
      'showPlayPage'
    ]),
    ...mapState({
      showPlayPage: state => {
        let bool = state.ApiService.showPlayPage
        if(bool){
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = 'auto'
        }
        return bool
      }
    })
  },
}
</script>

<style lang="less"> 
body,div,p,ul,li,ol,dl,dd,dt,h1,h2,h3,h4,h5,h6,span,pre,i,input,a,button,iframe,select,table,tr,th,td,label,textarea{
      padding: 0;
      margin: 0;
      -webkit-appearance:none;
      -webkit-tap-highlight-color:rgba(0,0,0,0);
      outline: none;
      -webkit-overflow-scrolling: touch;
      word-wrap:break-word;
}
img{
      padding: 0;
      margin: 0;
}
h1,h2,h3,h4,h5,h6{
      font-size: 100%;
      font-weight: normal;
}
li{
      list-style: none
}
i{
      font-style: normal;
}
a{
      text-decoration: none;
}
img{
      border: 0 none;
      vertical-align: top;
}
.clearfix{
      *zoom: 1;
}
.clearfix:after{
      content: ".";
      height: 0;
      visibility: hidden;
      display: block;
      clear: both;
}
body,button{
      font-family: "微软雅黑";
}
html{
  font-size: 100px;
}

.row{
  margin-bottom: .2rem;
  overflow: hidden;
}
.banner-foot .swiper-pagination-bullet{
  transition: all .5s;
}
.banner-foot .swiper-pagination-bullet-active{
  width: 20px;
  border-radius: 20px;
}

.showPlay-enter , .showPlay-leave{
  transform: translate(100%, 0);
  opacity: 0;
}
.showPlay-enter-active{
  transition: all .5s;
}
.showPlay-leave-active {
  transform: translate(100%, 0);
  opacity: 0;
  transition: all .5s;
}


.showPage-enter-active{
}
.showPage-leave-active {
  transition: all 0s 1s;
}

.toTop{
  position: fixed;
  bottom: -.8rem;
  right: .4rem;
  width: .8rem;
  height: .8rem;
  background: #007aff;
  color: #fff;
  font-size: .5rem;
  text-align: center;
  line-height: .8rem;
  transform: rotate(90deg);
  border-radius: .2rem;
  z-index: 99;
  opacity: .8;
}
</style>

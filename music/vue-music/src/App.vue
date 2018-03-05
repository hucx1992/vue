<template>
  <div id="app">
    <transition name="showPlay">
      <play v-if="playPageShow"></play>
    </transition>

    <search></search>

    <div class="swiper-container" id="swiper" v-show="showMenu">
      <div class="swiper-wrapper wrap">
        <div class="swiper-slide slide">
          <hot></hot>
        </div>
        <div class="swiper-slide slide">
          <recommend></recommend>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination page-foot"></div>
    </div>

    <transition name="showHotdiss">
      <hotdiss v-if="hotdissBool"></hotdiss>
    </transition>

    <div class="alert"  :class="{'showAlert' : showAlert}">
      <div class="box0 box" :class="{'show' : alertBox.noMusic}">
        <p>没有选择音乐</p>
      </div>
      <div class="box1 box" :class="{'show' : alertBox.noPrev}">
        <p>已经翻到最前面了...</p>
      </div>
      <div class="box2 box" :class="{'show' : alertBox.noNext}">
        <p>已经翻到最后面了...</p>
      </div>
    </div>
  </div>
</template>

<script>
import search from './components/search'
import Play from './components/play'
import Store from "./../store"
import Hot from './components/hot'
import Recommend from './components/recommend'
import hotdiss from "./components/hotdiss";

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';


export default {
  name: 'App',
  components: {
    search,
    Swiper,
    Play,
    Hot,
    Recommend,
    hotdiss
  },
  data() {
    return {
      hotdissBool: false,
      playPageShow: false,
      l: [1, 2],
      recommendBool: true,
      showMenu: true,
      showAlert: false,
      alertBox: {
        noMusic: false,
        noPrev: false,
        noNext: false
      },
    }
  },
  mounted: function(){
    let that = this;
    let swiperObj =  new Swiper('#swiper', {
      loop: false,
      pagination: '.page-foot',
      autoplay: false,
      autoHeight: true,
      paginationClickable: true,
      onSlideChangeStart: function(){
        if(that.recommendBool){
          that.recommendBool = false
          let swiperObj1 =  new Swiper('#reco-swiper', {
            pagination: '.c-pagebar',
            paginationClickable: true,
            autoplay: 3000
          });
        }
      }
    });
  },
  methods: {
  }
}
</script>

<style> 
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  font-family: '微软雅黑';
  font-style: normal;
}
body{
  background: #eee;
}
#swiper{
  position: absolute;
  top: 60px;
  bottom: 50px;
  left: 0;
  width: 100%;
}
#swiper .page-foot {
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  background: #fff;
}
#swiper .page-foot span{
  width: 50%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin: 0;
  background: none;
  border-radius: 0;
}
#swiper .page-foot span:nth-child(1):before{
  content: '排行榜';
}
#swiper .page-foot span:nth-child(2):before{
  content: '推荐';
}
#swiper .wrap{
  position: absolute;
  top: 50px;
  left: 0;
  bottom: 0;
  height: auto !important;
}
#swiper .wrap .slide{
  height: 100%;
  overflow-y: auto;
}
.showHotdiss-enter{
  transform: translateX(100%);
  opacity: 0;
}
.showHotdiss-leave-to{
  transform: translateX(100%);
  transition: all .5s;
  opacity: 0;
}
.showHotdiss-enter-active{
  transition: all .5s;
}
.showHotdiss-leave-active {
  position: absolute;
  width: 100%;
}
.showHotdiss-move{
  transition: all .5s;
}

.showPlay-enter{
  transform: translateY(100%);
  opacity: 0;
}
.showPlay-leave-to{
  transform: translateY(100%);
  transition: all .5s;
  opacity: 0;
}
.showPlay-enter-active{
  transition: all .5s;
}
.showPlay-leave-active {
  position: absolute;
  width: 100%;
}
.showPlay-move{
  transition: all .5s;
}
</style>

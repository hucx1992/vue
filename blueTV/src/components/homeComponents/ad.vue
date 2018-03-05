<template>
  <transition name="hide">
    <div class="ad" v-if="!hideAd">
      <div class="close" @click="closeAd">&times;</div>
      <a :href="$store.state.ApiService.aHref">
        <img src="http://i3.letvimg.com/lc06_isvrs/201605/17/13/41/9e2f1258c281458aa7dffff6730a8be95265114939169925069.jpg" alt="中国蓝TV">
      </a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ad',
  data () {
    return {
      hideAd: false
    }
  },
  methods: {
    closeAd(){
      this.hideAd = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.ad{
  position: relative;
	height: 1.4rem;
  overflow: hidden;
  img{
    width: 100%;
  }
  .close{
    position: absolute;
    top: 0;
    right: 0;
    width: .5rem;
    height: .5rem;
    font-size: .36rem;
    line-height: .5rem;
    text-align: center;
    color: #fff;
  }
}


.hide-enter , .hide-leave{
  height: 0;
  opacity: 0;
}
.hide-enter-active{
  transition: all .5s;
}
.hide-leave-active {
  height: 0;
  opacity: 0;
  transition: all .5s;
}
</style>

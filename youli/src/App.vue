<template>
  <div id="app">
    <transition name="next">
  	   <Loading v-if="$store.state.ApiService.showSec == 0"></Loading>
      <Sign v-if="$store.state.ApiService.showSec == 1"></Sign>
    	<Sec1 v-if="$store.state.ApiService.showSec == 2"></Sec1>
      <Sec2 v-if="$store.state.ApiService.showSec == 3"></Sec2>
      <Sec3 v-if="$store.state.ApiService.showSec == 4"></Sec3>
      <Sec4 v-if="$store.state.ApiService.showSec == 5"></Sec4>
      <Sec4_1 v-if="$store.state.ApiService.showSec == 6"></Sec4_1>
      <Sec5 v-if="$store.state.ApiService.showSec == 7"></Sec5>
  	</transition>
  </div>
</template>

<script>
import Loading from './components/loading'
import Sign from './components/sign'
import Sec1 from './components/sec1'
import Sec2 from './components/sec2'
import Sec3 from './components/sec3'
import Sec4 from './components/sec4'
import Sec4_1 from './components/sec4_1'
import Sec5 from './components/sec5'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
  	Loading,
    Sign,
    Sec1,
    Sec2,
    Sec3,
    Sec4,
    Sec4_1,
    Sec5
  },
  methods: {
  },
  mounted(){
    console.log(this.$store.state.ApiService.showSec)
  }
}
</script>

<style>

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
#app{
  	overflow: hidden;

}


.next-enter , .next-leave{
  transform: translate(0,10%);
	opacity: 0;
}
.next-enter-active{
  transition: all 1s;
}
.next-leave-active {
	opacity: 0;
  transition: all 1.5s;
  transform: translate(0,10%);
}
</style>

<template>
  <div id="home">
  	<Banner :msg="{'name':'home', 'id': 1105}"></Banner>
  	<div class="body">
      <Section class="row " :msg="{'title': '热点', 'name':'hotstops', 'id': 2378}"></Section>
      <Section1 class="row" :msg="{'title': '奔跑吧', 'name':'running', 'id': 2586}"></Section1>
      <Section1 class="row" :msg="{'title': '高能少年团', 'name':'gnsnt', 'id': 2418}"></Section1>
      <Section1 class="row" :msg="{'title': '综艺', 'name':'variety', 'id': 2381}"></Section1>
      <Section1 class="row" :msg="{'title': '90秒剧场', 'name':'theater', 'id': 2677}"></Section1>
      <Section1 class="row" :msg="{'title': '布噜制造', 'name':'blzz', 'id': 2385}"></Section1>
      <Section1 class="row" :msg="{'title': '八卦', 'name':'gossip', 'id': 2618}"></Section1>
      <Section1 class="row" :msg="{'title': '电影', 'name':'movie', 'id': 2386}"></Section1>
      <Section1 class="row" :msg="{'title': '生活情感', 'name':'life', 'id': 2388}"></Section1>
      <Section1 class="row" :msg="{'title': '美食', 'name':'foods', 'id': 2499}"></Section1>
      <Section class="row" :msg="{'title': '搞笑', 'name':'movie', 'id': 2389}"></Section>
      <h2 class='home-title'>航拍全景</h2>
      <Section1 class="row" :msg="{'title': '纪录片', 'name':'documentary', 'id': 2392}"></Section1>
      <Section1 class="row" :msg="{'title': '音乐', 'name':'music', 'id': 2393}"></Section1>
      <Section1 class="row" :msg="{'title': '新闻资讯看浙里', 'name':'newsLook', 'id': 2394}"></Section1>
  	</div>
    <Footers></Footers>
  </div>
</template>

<script>
import Banner from "./homeComponents/banner";
import Section from "./homeComponents/section";
import Section1 from "./homeComponents/section1";
import Footers from "./common/footers";
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

export default {
  name: 'home',
  data () {
    return {
      msg: [
      	{'name':'HotVariety', 'id': 3256},
      	{'name':'HotVariety1', 'id': 3327},
      	{'name':'HotVariety2', 'id': 3061}
      ],
      arr: 0,
      curentView: 'Section'
    }
  },
  components: {
  	Banner,
    Section,
    Section1,
    Footers
  },
  mounted(){	
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
h2.home-title{
  font-size: .2rem;
  padding-left: .1rem;
  line-height: .5rem;
}
</style>

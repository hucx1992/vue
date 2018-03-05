<template>
  <div id="blzz">
	<Banner :msg="{'name':'blzz', 'id': 2500}"></Banner>
  	<Section class="row" :msg="{'title': '蓝朋友报到', 'name':'lpybd', 'id': 2501}"></Section>
  	<Section1 class="row" :msg="{'title': '奔跑吧小鹿', 'name':'bpbxl', 'id': 2509}"></Section1>
  	<Section1 class="row" :msg="{'title': '剧爱找茬', 'name':'jazc', 'id': 2511}"></Section1>
  	<Section1 class="row" :msg="{'title': '兔兔吐吐吐', 'name':'ttttt', 'id': 2917}"></Section1>
  	<Section1 class="row" :msg="{'title': '布噜小飞机', 'name':'blxfj', 'id': 2517}"></Section1>
  	<Section1 class="row" :msg="{'title': '高言值路人', 'name':'gyzlr', 'id': 2519}"></Section1>
  	<Section1 class="row" :msg="{'title': '鸡哥鉴不鉴', 'name':'jgjbj', 'id': 2521}"></Section1>
  	<Section1 class="row" :msg="{'title': '老底子', 'name':'ldz', 'id': 2525}"></Section1>
  	<Section1 class="row" :msg="{'title': '放学别走', 'name':'fxbz', 'id': 3376}"></Section1>
  	<Section1 class="row" :msg="{'title': '新歌声学员人气榜', 'name':'xgsxy', 'id': 2842}"></Section1>
  	<Section1 class="row" :msg="{'title': '卧底新歌声', 'name':'wdxgs', 'id': 1771}"></Section1>
  	<Section1 class="row" :msg="{'title': '方言大擂台', 'name':'fydlt', 'id': 1577}"></Section1>
  	<Footers></Footers>
  </div>
</template>

<script>
import Banner from "../homeComponents/banner";
import Section from "../homeComponents/section";
import Section1 from "../homeComponents/section1";
import Footers from "../common/footers";

export default {
  name: 'blzz',
  data () {
    return {
    }
  },
  components: {
  	Banner,
  	Section,
  	Section1,
  	Footers
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

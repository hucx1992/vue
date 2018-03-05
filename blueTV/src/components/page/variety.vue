<template>
	<div class="variety">
		<Banner :msg="{'name':'variety', 'id': 2575}"></Banner>
      	<Section1 class="row" :msg="{'title': '梦想的声音 放声歌唱', 'name':'mxdsy2', 'id': 3057}"></Section1>
      	<Section1 class="row" :msg="{'title': '再启程 找寻熟悉的味道', 'name':'sxdwd', 'id': 2481}"></Section1>
      	<Section1 class="row" :msg="{'title': '明星汇聚 喜剧总动员', 'name':'xjzdy', 'id': 3006}"></Section1>
      	<Section1 class="row" :msg="{'title': '天生是优我 前浪PK后浪', 'name':'tssyw', 'id': 2479}"></Section1>
      	<Section1 class="row" :msg="{'title': '全新原创 中国新歌声', 'name':'zgxgs', 'id': 2837}"></Section1>
      	<Section1 class="row" :msg="{'title': '原创再发力 真星话大冒险', 'name':'zxhdmx', 'id': 2684}"></Section1>
      	<Section1 class="row" :msg="{'title': '全新联盟 挑战不可能', 'name':'tzzlm', 'id': 2743}"></Section1>
      	<Section1 class="row" :msg="{'title': '明星汇聚 来吧冠军', 'name':'lbgj', 'id': 2654}"></Section1>
      	<Section1 class="row" :msg="{'title': '跑出趣 能量无穷', 'name':'nlwq', 'id': 2416}"></Section1>
      	<Section1 class="row" :msg="{'title': '决战王牌之巅', 'name':'xjzdy', 'id': 3253}"></Section1>
      	<Footers></Footers>
	</div>
</template>

<script>
import Banner from "../homeComponents/banner";
import Section1 from "../homeComponents/section1";
import Footers from "../common/footers";
export default {
  name: 'variety',
  data () {
    return {
    }
  },
  components: {
  	Banner,
  	Section1,
  	Footers
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
  <div id="news">
	<Banner :msg="{'name':'news', 'id': 2435}"></Banner>
  	<Section1 class="row" :msg="{'title': '囧新闻不思议', 'name':'jxwbsy', 'id': 193}"></Section1>
  	<Section1 class="row" :msg="{'title': '看浙里', 'name':'kzl', 'id': 194}"></Section1>
  	<Section1 class="row" :msg="{'title': '贵圈水很深', 'name':'wqshs', 'id': 2436}"></Section1>
  	<Section1 class="row" :msg="{'title': '偶像真唱，你受得了吗', 'name':'oxcg', 'id': 169}"></Section1>
  	<Footers></Footers>
  </div>
</template>

<script>
import Banner from "../homeComponents/banner";
import Section1 from "../homeComponents/section1";
import Footers from "../common/footers";
export default {
  name: 'news',
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

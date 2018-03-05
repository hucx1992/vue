<template>
  <div id="music">
	<Banner :msg="{'name':'music', 'id': 2466}"></Banner>
  	<Section1 class="row" :msg="{'title': '音乐V榜', 'name':'yyvb', 'id': 2467}"></Section1>
  	<Section1 class="row" :msg="{'title': '明星翻唱哪家强', 'name':'mxfc', 'id': 2468}"></Section1>
  	<Section1 class="row" :msg="{'title': '失恋了该听谁的歌', 'name':'wltdg', 'id': 172}"></Section1>
  	<Section1 class="row" :msg="{'title': '偶像真唱，你受得了吗', 'name':'oxcg', 'id': 173}"></Section1>
  	<Footers></Footers>
  </div>
</template>

<script>
import Banner from "../homeComponents/banner";
import Section1 from "../homeComponents/section1";
import Footers from "../common/footers";
export default {
  name: 'music',
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

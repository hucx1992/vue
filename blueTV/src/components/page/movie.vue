<template>
	<div id="movie">
		<Banner :msg="{'name':'movie', 'id': 2401}"></Banner>
      	<Section1 class="row" :msg="{'title': '口袋电影', 'name':'kddy', 'id': 2402}"></Section1>
      	<Section1 class="row" :msg="{'title': '我们先看吐槽再看戏', 'name':'tczkx', 'id': 2403}"></Section1>
      	<Section1 class="row" :msg="{'title': '我们只看颜值不看戏', 'name':'kyzbkx', 'id': 2530}"></Section1>
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

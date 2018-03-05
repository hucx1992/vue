<template>
  <div id="child">
		<Banner :msg="{'name':'child', 'id': 3208}"></Banner>
      	<Section1 class="row" :msg="{'title': '大神动漫库', 'name':'dsdmk', 'id': 2426}"></Section1>
      	<Section1 class="row" :msg="{'title': '番剧补课ing', 'name':'fjbk', 'id': 2471}"></Section1>
      	<Section1 class="row" :msg="{'title': '国漫の匠心', 'name':'dmjx', 'id': 2472}"></Section1>
      	<Section1 class="row" :msg="{'title': '萌娃综艺秀', 'name':'mwzy', 'id': 3422}"></Section1>
      	<Footers></Footers>
  </div>
</template>

<script>
import Banner from "../homeComponents/banner";
import Section1 from "../homeComponents/section1";
import Footers from "../common/footers";


export default {
  name: 'child',
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

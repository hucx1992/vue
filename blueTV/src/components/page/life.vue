<template>
  <div id="life">
	<Banner :msg="{'name':'life', 'id': 2423}"></Banner>
  	<Section class="row" :msg="{'title': '生活大爆炸', 'name':'shdbz', 'id': 1287}"></Section>
  	<Section class="row" :msg="{'title': '深夜放毒', 'name':'syfd', 'id': 1293}"></Section>
  	<Section1 class="row" :msg="{'title': '钱塘老娘舅', 'name':'qtlnj', 'id': 2433}"></Section1>
  	<Section1 class="row" :msg="{'title': '微在涨知识', 'name':'wzzzs', 'id': 2432}"></Section1>
  	<Section1 class="row" :msg="{'title': '森哥微课堂', 'name':'sgwkt', 'id': 2440}"></Section1>
  	<Section1 class="row" :msg="{'title': '相亲才会赢', 'name':'xqchy', 'id': 2434}"></Section1>
  	<Section1 class="row" :msg="{'title': '和全世界翻脸', 'name':'hqsjfl', 'id': 2439}"></Section1>
  	<Footers></Footers>
  </div>
</template>

<script>
import Banner from "../homeComponents/banner";
import Section from "../homeComponents/section";
import Section1 from "../homeComponents/section1";
import Footers from "../common/footers";

export default {
  name: 'life',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App / life'
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

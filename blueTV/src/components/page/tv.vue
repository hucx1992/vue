<template>
  <div class="tv">
    <Banner :msg="{'name':'tv', 'id': 77}"></Banner>
    <Section1 class="row" :msg="{'title': '我们是神剧的改造家', 'name':'sjdgzj', 'id': 769}"></Section1>
    <Section1 class="row" :msg="{'title': '胭脂', 'name':'yz', 'id': 1749}"></Section1>
    <Section1 class="row" :msg="{'title': '小别离', 'name':'xbl', 'id': 1580}"></Section1>
    <Section1 class="row" :msg="{'title': '青春剧集看鲜肉', 'name':'qcjjkxr', 'id': 58}"></Section1>
    <Section1 class="row" :msg="{'title': '国剧大典我家强', 'name':'wjdd', 'id': 59}"></Section1>
    <Section1 class="row" :msg="{'title': '谍战大戏比智商', 'name':'dzdx', 'id': 78}"></Section1>
    <Section1 class="row" :msg="{'title': '豪门恩怨深似海', 'name':'hmey', 'id': 79}"></Section1>
    <Section1 class="row" :msg="{'title': '古装神剧拼特效', 'name':'gzsj', 'id': 348}"></Section1>
    <Section1 class="row" :msg="{'title': '进击的剧务霸', 'name':'jjdjwb', 'id': 448}"></Section1>
    <Footers></Footers>
  </div>
</template>

<script>
import Banner from "../homeComponents/banner";
import Section1 from "../homeComponents/section1";
import Footers from "../common/footers";
export default {
  name: 'tv',
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

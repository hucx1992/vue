<template>
  <div class="footers">
  	copyright © 2009-2017 cztv.com 浙ICP备 11016796号-2
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footers{
	line-height: 1rem;
	font-size: .24rem;
	text-align: center;
	color: #999;
	border-top: .04rem solid #f5f5f5;
  background: #fff;
}
</style>

<template>
	<div class="idCard">
		<img src="http://ohudong.cztv.com/1/249248/images/erweima-2x.png">
		<h4>「中国蓝TV」</h4>
		<p>扫一扫或长按二维码关注公众微信号</p>
		<a :href="$store.state.ApiService.aHref">都翻到这里了 打开app查看更多内容</a>
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
<style scoped lang="less">

.idCard{
	overflow: hidden;
	text-align: center;
	padding-bottom: .38rem;
	img{
		display: block;
		width: 2.66rem;
		margin: .34rem auto 0;
	}
	h4{
		font-size: .32rem;
		line-height: .5rem;
		color: #333;
		font-weight: bold;
	}
	p{
		color: #666;
		font-size: .28rem;
		line-height: .48rem;
		margin-bottom: .18rem;
	}
	a{
		display: block;
		width: 7rem;
		height: .88rem;
		line-height: .88rem;
		color: #fff;
		font-size: .28rem;
		text-align: center;
		background: linear-gradient(to right, #0db1ff, #2c93ee);
		border-radius: .88rem;
		margin: 0 auto;
		box-shadow: 0.04rem 0.1rem 0.4rem rgba(20, 170, 251, 0.4);
	}
}
</style>

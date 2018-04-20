<template>
	<div class="sec1">
		<Header :showUser="true"></Header>
		<Slide></Slide>
	</div>
</template>

<script>
import Slide from './sec1/slide'
import Header from './common/header'
export default {
	name : 'sec1',
	data () {
		return {
			msg: 'sec1'
		}
	},
	components: {
		Slide,
		Header
	},
	methods: {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.bg(@bg){
  background: url(@bg) no-repeat;
  background-size: 100%;
}
.bg1(@bg){
  background: url(@bg) no-repeat;
  background-size: auto 100%;
}
.sec1{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.bg1('../assets/sec1.png');
	overflow: hidden;

}
@keyframes show{
	100%{ transform: translate(0, 0) scale(1); opacity: 1}
}
</style>

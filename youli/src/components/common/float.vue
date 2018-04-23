<template>
	<div class="float">
		<div class="float-body">
			<ChooseSex v-if="rlt==0"></ChooseSex>
			<SetName v-if="rlt==1"></SetName>
			<div v-if="rlt==2" class="sign-err">
				<h3>错误</h3>
				<p>柴可夫同学已重复登录</p>
				<button @click="hideFloat">重新登录</button>
			</div>
		</div>
	</div>
</template>

<script>
import ChooseSex from "../register/chooseSex";
import SetName from "../register/setName";
export default {
	name: 'float',
	data () {
		return {
			showSec:{ sec1: true}
		}
	},
	props: ['rlt'],
	components: {
		ChooseSex,
		SetName
	},
	methhods: {
		hideFloat(){
		this.$parent.showFloat = false
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.sign-err{
	h3{
		margin-bottom: 1.5rem;
	}
	p{
		font-size: .58rem;
		text-align: center;
	}
	button{
		display: block;
		width: 4rem;
		height: 1.38rem;
		background: #a2c020;
		font-size: .58rem;
		color: #fff;
		border-radius: .4rem;
		border: 0 none;
		box-shadow: 0 0 .1rem #222;
		border: 0 none;
		margin: .8rem auto 0;
	}
}
h3{
	font-size: .58rem;
	line-height: .88rem;
	text-align: center;
	margin-bottom: .7rem;
}
.bg(@bg){
  background: url(@bg) no-repeat;
  background-size: 100%;
}
.float{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.6);
	z-index: 999;
	
	.float-body{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 20.39rem;
		height: 8.33rem;
		.bg('../../assets/sec0_1.png');
		padding: 2rem 4.06rem 0;
		box-sizing: border-box;
	}
}
</style>

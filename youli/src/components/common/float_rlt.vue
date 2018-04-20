<template>
	<div class="float">
		<div class="float-body" v-if="rlt.ans == 0">
			<div class="err">
				<h3>答错啦</h3>
				<p class="cue">正确的做法应该是</p>
				<p>{{rlt.msg}}</p>
				<div class="btn" @click="closeFloat">记住了</div>
			</div>
		</div>
		<div class="suc" v-else>
			<div class="light"></div>
			<div class="box">
				<p>太棒啦</p>
				<p>回答很正确</p>
			</div>
		</div>
	</div>
</template>

<script>
import Answer from "../sec2/answer";
export default {
	name: 'float',
	data () {
		return {
		}
	},
	props: ['rlt'],
	components: {
		Answer
	},
	methods: {
		closeFloat(){
			this.$parent.showFloat = false;
			this.$emit('getAns');
		}
	},
	mounted(){
		const that = this;
		if(that.rlt.ans == 1){
			setTimeout(()=>{
				that.closeFloat();
			},3000)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
h3{
	font-size: .68rem;
	line-height: .88rem;
	opacity: .6;
	margin-bottom: 1.1rem;
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
	text-align: center;
	
	.float-body{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 18.04rem;
		height: 8.2rem;
		.bg('../../assets/float.png');
		padding: 1.3rem 2rem 0;
		box-sizing: border-box;
		font-size: .58rem;

		.cue{
			color: #0c0;
			font-size: .68rem;
			margin-bottom: .5rem;
		}
		.btn{
			background: #F7E22F;
			width: 4.5rem;
			height: 1.29rem;
			line-height: 1.29rem;
			border-radius: 1.3rem;
			margin: .5rem auto 0;
		}
	}
}
.suc{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 12.78rem;
	height: 12.78rem;
	.light{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.bg('../../assets/float1_1.png');
		animation: rotate 4s infinite linear;
	}
	.box{
		position: absolute;
		top: 2rem;
		left: .41rem;
		z-index: 2;
		width: 11.96rem;
		height: 7.98rem;
		.bg('../../assets/float1.png');
		font-size: .58rem;
		text-align: center;
		padding-top: 4.1rem;
	}
}
@keyframes rotate{
	100%{ transform: rotate(360deg);}
}
</style>

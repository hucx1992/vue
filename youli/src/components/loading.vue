<template>
	<div class="loading">
		<div class="txt">微笑是我们的语言，文明是我们的信念</div>
		<div class="progress">
			<div class="pro-bg"></div>
			<span :style="{'width': bt+'%'}"></span>
		</div>
	</div>
</template>

<script>
export default {
	name : 'loading',
	data () {
		return {
			msg: 'asd',
			bt: 0
		}
	},
	mounted(){
		const that = this;
		timeOut();
		function timeOut(){
			if(that.bt<100){
				that.bt ++
				setTimeout(()=>{
					timeOut()
				},20)
			} else {
				that.$store.state.ApiService.showSec = 1
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.bg(@bg){
  background: url(@bg) no-repeat;
  background-size: auto 100%;
}
.loading{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.bg('../assets/loading.png');
	
	.txt{
		position: absolute;
		top: 13.3rem;
		left: 50%;
		line-height: 1.21rem;
		transform: translate(-50%, 0);
		font-size: .58rem;
		color: #603200;
		font-weight: 700;
		padding: 0 .72rem;
		border-radius: 1.5rem;
		text-align: center;
		background: rgba(255, 255, 255, .6);
	}
	.progress{
		position: absolute;
		top: 15rem;
		left: 50%;
		margin-left: -4.01rem;
		width: 8.8rem;
		height: .4rem;
		border-radius: 1rem;
		.pro-bg{
			position: absolute;
			top: -.03rem;
			left: -.03rem;
			width: 8.8rem;
			height: .4rem;
			background: #666;
			border: .033rem solid #000;
			border-radius: 1rem;
			opacity: .6;
		}
		span{
			position: absolute;
			top: 0;
			left: 0;
			width: 0%;
			height: 100%;
			background: linear-gradient(left, #6bdc00, #e0ff28);
			border-radius: 1rem;
		}
	}
}
</style>

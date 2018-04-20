<template>
	<div class="sec3">
		<Header  :time="time" :headerMsg="{ num: '三', title: '小组备课', subtitle: '小组备课的副标题'}"></Header>
		<div class="main">
			<div class="title">故事梗概：</div>
			<div class="main-content bg1">
				<p>公交车终于来啦！我和大家一起依次排队上了车。车上乘客真不少，作为文明小标兵的我，今天也要保持文明乘车的仪态！</p>
				<div class="jr" @click="showFloat"></div>
			</div>
		</div>
		<div class="float" v-if="showFloatBool">
			<div class="float-main">
				<p>不插队，不推搡，</p>
				<p>吵闹堵门叫人愁。</p>
				<p>先下后上是规则，</p>
				<p>冲门追车要不得。</p>
				<div class="pen"></div>
				<div class="btn" @click="showFloat">厉害了</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from './common/header'
export default {
	name : 'sec3',
	data () {
		return {
			time: 10,
			showFloatBool: false
		}
	},
	components: {
		Header
	},
	methods: {
		timeOutFun(){
			const that = this;
			if(that.time>0){
				that.time --;
				setTimeout(()=>{
					that.timeOutFun()
				},1000)
			} else {
				//倒计时结束

				that.$store.state.ApiService.showSec ++
				
			}
		},
		showFloat(){
			this.showFloatBool = !this.showFloatBool
		}
	},
	mounted(){
		this.timeOutFun()
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
.sec3{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.bg1('../assets/sec3.png');
	overflow: hidden;
}
.main{
	position: absolute;
	bottom: 0;
	left: .75rem;
	width: 24.14rem;
	height: 13.88rem;
	padding: 3.4rem 0 0 1.4rem;
	box-sizing: border-box;
	.bg('../assets/sec3_1.png');

	.title{
		font-size: .58rem;
		line-height: 1.2rem;
		color: #894431;
		margin-bottom: .3rem;
	}
	.main-content{
		width: 100%;
		height: 100%;
		font-size: .56rem;
		text-indent: 2em;
		background: right 1rem bottom 1.76rem no-repeat;
		background-size: 10.6rem 8.98rem;

		&.bg0{
			background-image: url('../assets/sec3_bg0.png')
		}
		&.bg1{
			background-image: url('../assets/sec3_bg1.jpg')
		}
		&.bg2{
			background-image: url('../assets/sec3_bg2.png')
		}
		&.bg3{
			background-image: url('../assets/sec3_bg3.png')
		}
		&.bg4{
			background-image: url('../assets/sec3_bg4.png')
		}
		p{
			width: 14rem;
			line-height: 1.1rem;
		}
		.jr{
			position: absolute;
			bottom: .8rem;
			left: 1.2rem;
			width: 4rem;
			height: 3.6rem;
			.bg('../assets/jr.png');
			animation: shake 1s infinite linear;
			transform-origin: top 3rem;
		}
	}
}
.float{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background: rgba(0, 0, 0, .6);
	z-index: 999;
	opacity: 0;
	animation: show .5s forwards;

	.float-main{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 9.12rem;
		height: 9.76rem;
		.bg('../assets/sec3_f.png');
		font-size: .56rem;
		text-align: center;
		box-sizing: border-box;
		padding-top: 3rem;
		transform: scale(0);
		animation: scales .3s .1s forwards;

		p{
			line-height: .8rem;
		}
		.pen{
			position: absolute;
			right: -1.15rem;
			top: 3.5rem;
			width: 3.09rem;
			height: 5.06rem;
			.bg('../assets/pen.png');
			animation: pen 3s infinite linear;
		}
		.btn{
			position: absolute;
			bottom: -1rem;
			left: 0;
			right: 0;
			margin: 0 auto;
			width: 4.5rem;
			height: 1.29rem;
			background: #F7E22F;
			line-height: 1.29rem;
			border-radius: 1.3rem;
		}
	}
}
@keyframes show{
	100%{ transform: rotate(0); opacity: 1}
}
@keyframes scales{
	0%	{ transform: scale(0)}
	50%	{ transform: scale(1.3)}
	100%{ transform: scale(1)}
}
@keyframes shake{
	0%	{ transform: rotate(0)}
	50%	{ transform: rotate(10deg)}
	100%{ transform: rotate(0)}
}
@keyframes pen{
	0%	{ transform: translate(0,0); opacity: 0}
	12.5%{ transform: translate(.1rem, .1rem); opacity: .3}
	25%	{ transform: translate(.2rem, 0rem)}
	37.5%	{ transform: translate(.3rem, .2rem)}
	50%	{ transform: translate(.4rem, 0rem)}
	62.5%	{ transform: translate(.5rem, .3rem); opacity: 1}
	75%	{ transform: translate(.6rem, 0)}
	87.5%{ transform: translate(.7rem, .3rem); opacity: .3}
	100%{ transform: translate(.7rem, .3rem); opacity: 0}
}
</style>

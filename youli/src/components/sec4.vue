<template>
	<div class="sec4">
		<Header :headerMsg="{ num: '四', title: '小组师范', subtitle: '小组备课的副标题'}"></Header>
		<div class="dec">
			<div class="dec1 d"><span></span></div>
			<div class="dec2 d" v-if="showTeam">
				<div class="msg">
					<div class="title">第<em>1</em>组</div>
					<div class="subtitle">故事梗概</div>
					<p>公交车终于来啦！我和大家一起依次排队上了车。车上乘客真不少，作为文明小标兵的我，今天也要保持文明乘车的仪态！</p>
				</div>
			</div>
			<div class="npc d" v-else>
				<span><i>每组组内通过讨论商议，选择表现最好的小组，并确定选择理由。</i></span>
			</div>
			<div class="dec3 d"><span></span></div>
		</div>
		<div class="main">
			<div class="icon"></div>
			<div class="team" v-if="showTeam">
				<span v-for="(item, index) in teams" :key="index" :class="[{'check': index == cIndex},{'zb': index == (cIndex+1)}]">{{item}}
					<i class="i0">剩余{{time}}秒</i>
					<i class="i1">准备</i>
				</span>
			</div>
			<div class="finish" v-else>
				<p>距离结束商议时间</p>
				<span>剩余0秒</span>
			</div>
		</div>
		

		<transition name="hide">
			<div class="float" v-show="showFloat">
				<div class="float-main">
					<div class="light"></div>
					<div class="float-msg">
						<p>你获得了组长</p>
						<p>请先发言</p>
						<p>再投票</p>
					</div>
					<div class="btn" @click="hideFloat">好的</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import Header from './common/header'
export default {
	name : 'sec4',
	data () {
		return {
			teams:[1,2,3,12,5,4,9,10,5,4,9,10],
			cIndex: 0, 	//点击的位置
			time: 2,	//每小组表演时间
			showFloat: false,
			selected: true,
			showTeam: true		//显示小组或者商议时间
		}
	},
	components: {
		Header
	},
	methods: {
		hideFloat(){
			console.log(1)
			this.showFloat = false;
		},
		timeOutFun(){
			const that = this;
			if(that.time>0){
				that.time --;
				setTimeout(()=>{
					that.timeOutFun()
				},1000)
			} else {	
				//答题时间超过
				if(that.cIndex>=that.teams.length){
					//全部小组表演完成

					that.$store.state.ApiService.showSec ++
					return
				}
				that.cIndex ++;
				that.time = 2;
				that.timeOutFun()
			}
		},
	},
	mounted(){
		this.timeOutFun();
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
.sec4{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.bg1('../assets/sec4.png');
	overflow: hidden;

	.dec{
		.d{
			position: absolute;
			bottom: 0;
			z-index: 2;
		}
		.dec1{
			left: 0;
			width: 8.39rem;
			height: 6.49rem;
			.bg("../assets/sec4_1_1.png");
			transform: translate(0, 100%);
			animation: show .5s .5s forwards;
			span{
				position: absolute;
				right: -4.32rem;
				bottom: 0;
				width: 4.32rem;
				height: 2.67rem;
				.bg('../assets/sec4_1_2.png');
			}
		}
		.dec2{
			left: 1rem;
			width: 6.66rem;
			height: 11.56rem;
			.bg("../assets/sec4_2.png");
			transform: translate(0, 100%);
			animation: show .5s .6s forwards;
			text-align: center;
			color: #888;
			box-sizing: border-box;
			padding: .3rem .6rem 3.5rem;
			overflow: hidden;
			

			.msg{
				opacity: 0;
				animation: show .5s 1s forwards;
			}
			.title{
				display: inline-block;
				font-size: .58rem;
				vertical-align: top;
				line-height: 1.3rem;
				border-bottom: .05rem solid #888;
				em{
					font-weight: bold;
					font-style: normal;
					margin: 0 .1rem;
				}
			}
			.subtitle{
				font-size: .45rem;
				line-height: .96rem;
				height: .96rem;
				margin-bottom: .3rem;
			}
			p{
				color: #000;
				text-align: left;
				text-indent: 2em;
				font-size: .45rem;
				line-height: .82rem;
			}

		}
		.dec3{
			right: 0;
			width: 2.73rem;
			height: 4.11rem;
			.bg("../assets/sec4_3_2.png");
			transform: translate(0, 100%);
			animation: show .5s .55s forwards;
			span{
				position: absolute;
				left: -4rem;
				bottom: 0;
				width: 4.1rem;
				height: 1.74rem;
				.bg('../assets/sec4_3_1.png');
			}
		}
	}
	.finish{
		padding-top: 2.2rem;
		font-size: .68rem;
		text-align: center;

		p{
			margin-bottom: .5rem;
		}
		span{
			display: inline-block;
			vertical-align: top;
			padding: 0 .6rem;
			height: .73rem;
			border-radius: .73rem;
			font-size: .45rem;
			color: #fff;
			background: #C73200;
		}
	}
	.main{
		position: absolute;
		top: 3.3rem;
		right: 1.5rem;
		width: 15.27rem;
		height: 12.71rem;
		.bg('../assets/sec4_main.png');
		box-sizing: border-box;
		padding: 3.5rem 1.6rem 0;
		transform: translate(0, -100%);
		opacity: 0;
		animation: show .5s .8s forwards;
		text-align: center;
		perspective: 1rem;
	
		.team{
			transform: rotateX(2.5deg);

			span{
				position: relative;
				display: inline-block;
				vertical-align: top;
				width: 1.99rem;
				height: 2.11rem;
				.bg('../assets/sec4_i.png');
				text-align: center;
				line-height: 1.5rem;
				font-size: 1.04rem;
				font-weight: bold;
				color: #9F8B63;
				margin: 0 .3rem .2rem;

				&.check{
					color: #fff;
					background-position: 0 100%;
					.i0{
						display: block;
					}
				}
				&.zb{
					.i1{
						display: block;
					}
				}

				i{
					display: none;
					position: absolute;
					top: 1.3rem;
					left: 0;
					width: 100%;
					color: #fff;
					height: .6rem;
					line-height: .6rem;
					font-size: .32rem;
					background: rgba(0, 0, 0, .6);
					border-radius: 1rem;
				}
			}
		}
		.icon{
			position: absolute;
			top: 1.3rem;
			right: 0;
			left: 0;
			margin: auto;
			width: 2.07rem;
			height: 1.42rem;
			.bg('../assets/icon.png');
		}
	}
}
.float{
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
	background: rgba(0, 0, 0, .6);
	z-index: 999;
	.float-main{
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		width: 12.78rem;
		height: 12.78rem;
		.light{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			.bg('../assets/float1_1.png');
			animation: rotate 4s infinite linear;
		}
		.float-msg{
			position: absolute;
			top: 2rem;
			left: .41rem;
			z-index: 2;
			width: 11.96rem;
			height: 7.98rem;
			.bg('../assets/float1.png');
			font-size: .58rem;
			text-align: center;
			padding-top: 4.1rem;
		}
		.btn{
			position: absolute;
			bottom: 1rem;
			left: 0;
			right: 0;
			margin: 0 auto;
			width: 4.5rem;
			height: 1.29rem;
			background: #F7E22F;
			border-radius: 1.3rem;
			text-align: center;
			line-height: 1.29rem;
			font-size: .58rem;
			z-index: 3;
		}
	}
}
.npc{
	left: 0;
	width: 3.9rem;
	height: 7.5rem;
	.bg('../assets/npc.png');

	span{
		position: absolute;
		right: -6rem;
		top: 0;
		width: 5.73rem;
		height: 4.52rem;
		.bg('../assets/pao1.png');
		font-size: .52rem;
		i{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			line-height: .8rem;
			transform: rotate(-2deg);
			box-sizing: border-box;
			padding: .6rem .3rem .6rem 1.2rem;
		}
	}
}


.hide-enter{
	opacity: 0;
	transition: all .5s;
}
.hide-enter-active{
	transition: all .5s;
}
.hide-leave-active {
	opacity: 0;
	transition: all .5s;
}
@keyframes rotate{
	100%{ transform: rotate(360deg);}
}
@keyframes show{
	100%{ transform: rotate(0); opacity: 1}
}
</style>

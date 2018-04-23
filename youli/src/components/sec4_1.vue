<template>
	<div class="sec4">
		<Header :headerMsg="{ num: '六', title: '小组师范', subtitle: '小组备课的副标题'}"></Header>
		<div class="dec">
			<div class="dec1 d"><span></span></div>
			<div class="npc d">
				<span><i>系统已随机推荐一个组员成为组长，代表小组发表意见并进行投票。</i></span>
			</div>
			<div class="dec3 d"><span></span></div>
		</div>
		<div class="main">
			<div class="icon"></div>
			<div class="team" v-if="showTeam">
				<span v-for="(item, index) in teams" :key="index" :class="{'check': index == cIndex}" @click="checkChild(index,item)">{{item}}</span>
			</div>
			<div class="finish" v-else>
				<p>距离结束商议时间</p>
				<span>剩余{{timeOut}}秒</span>
			</div>
		</div>
		

		<transition name="hide">
			<div class="float" v-show="showFloat">
				<div class="float-main">
					<div class="light"></div>
					<div class="float-msg">
						<p>{{floatMsg}}</p>
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
	name : 'sec4_1',
	data () {
		return {
			teams:[1,2,3,12,5,4,9,10,5,4,9,10],
			cIndex: -1, 	//点击的位置
			time: 2,	//每小组表演时间
			selected: true,		//是否选择过
			showTeam: false,		//显示小组或者商议时间
			showFloat: true,	//显示小组组长
			floatMsg: '你获得了组长请先发言再投票',
			toNextPage: false, 	//是否进入下一页
			timeOut: 10
		}
	},
	components: {
		Header
	},
	methods: {
		timeOutFun(){
			const that = this;
			if(that.timeOut > 0){
				that.timeOut --
				setTimeout(()=>{
					that.timeOutFun();
				},1000)
			} else {
				that.showTeam = true
			}
		},
		hideFloat(){
			const that = this;
			if(that.toNextPage){
				that.$store.state.ApiService.showSec ++
			} else {
				that.showFloat = false;
			}
		},
		checkChild(index, item){
			if(this.cIndex == -1){
				this.cIndex = index;
				this.showFloat = true;
				this.floatMsg = '恭喜第'+item+'组获得了一票'
				this.toNextPage = true;
			}
		}
	},
	mounted(){
		const that = this;
		setTimeout(()=>{
			that.timeOutFun();
		},1000)
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
			box-sizing: border-box;
			padding: 4.1rem 4.5rem 0;
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

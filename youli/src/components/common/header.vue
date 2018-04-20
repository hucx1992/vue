<template>
	<div class="heads">
		<div class="left" v-if="showUser">
			<div class="tx">
				<img  src="../../assets/sec2.jpg" alt="">
				<span></span>
			</div>
			<div class="left-r">
				<p class='user'><strong>杜小月</strong>/<span>礼仪小生</span><em>Lv2</em></p>
				<div class="user-msg">
					<div class="credit">
						<strong>85</strong>
						<i>学分</i>
					</div>
					<div class="bar">
						<div class="lineBox">
							<div class="bar-bg"></div>
							<div class="line" :style="{width: creditBar+'%'}"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="left2" v-else>
			<div class="title">
				<strong>第{{headerMsg.num}}部分</strong>
				<strong class='msg'>{{headerMsg.title}}</strong>
				<span v-if="time">剩余<i>{{time}}</i>秒</span>
			</div>
			<div class="sub-title">{{headerMsg.subtitle}}</div>
		</div>
		<div class="right">2</div>
	</div>
</template>

<script>
export default {
	name : 'heads',
	data () {
		return {
			creditBar: 30,	//学分经验进度条
		}
	},
	props: ['showUser','time',"headerMsg"],
	watch: {
	},
	mounted(){
		const that = this;
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.bg(@bg){
  background: url(@bg) no-repeat;
  background-size: 100%;
}
@keyframes show{
	100%{ transform: translate(0, 0) scale(1); opacity: 1}
}
.heads{
	position: relative;
	z-index: 9;
	width: 100%;
	height: 6.26rem;
	.bg('../../assets/sec1_header.png');
	transform: translate(0, -100%) scale( 1.1);
	opacity: 0;
	animation: show .8s .2s linear forwards;
}
.left{
	position: absolute;
	top: .5rem;
	left: 0;
	width: 2.2rem;
	height: 2.21rem;
	.bg('../../assets/header_l.png');
	.tx{
		position: absolute;
		top: .07rem;
		right: .08rem;
		width: 1.5rem;
		height: 1.5rem;
		img{
			display: block;
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		span{
			position: absolute;
			top: 1.18rem;
			right: .06rem;
			width: 1.53rem;
			height: 1.75rem;
			.bg('../../assets/header_l1.png');
		}
	}
	.left-r{
		position: absolute;
		top: 0;
		left: 2.5rem;
		width: 8rem;
		.user{
			height: 1rem;
			font-size: .45rem;
			strong{
				margin-right: .1rem;
				font-size: .6rem;
			}
			span{
				margin: 0 .2rem 0 .1rem;
			}
			em{
				display: inline-block;
				width: 1.26rem;
				height: .51rem;
				border-radius: .51rem;
				font-size: .4rem;
				color: #fff;
				background: #EE580C;
				text-align: center;
				line-height: .51rem;
			}
		}
		.user-msg{
			display: flex;
			.credit{
				width: 1.85rem;
				height: .75rem;
				line-height: .75rem;
				border-radius: .75rem;
				color: #fff;
				background: #6F5422;
				display: flex;
				align-items: center;
				justify-content: center;
				box-shadow: 0 0 .3rem #000 inset;
				strong{
					margin-right: .1rem;
					font-size: .42rem;
				}
				i{
					font-size: .3rem;
				}
			}
			.bar{
				position: relative;
				width: 4.71rem;
				height: 1.15rem;
				.bg('../../assets/header_bar.png');

				.lineBox{
					position: absolute;
					top: .1rem;
					left: .32rem;
					width: 4.26rem;
					height: .5rem;
					border-radius: .5rem;
					overflow: hidden;
					.bar-bg{
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						.bg('../../assets/header_bar_bg.png');
					}
					.line{
						width: 0%;
						height: 100%;
						background: linear-gradient(left, #ffb100, #fffe00);
						border-radius: .15rem;
					}
				}
			}
		}
	}
}
.left2{
	position: absolute;
	top: 0;
	left: 0;
	width: 22.11rem;
	height: 2.67rem;
	.bg('../../assets/left2.png');
	padding-left: 1.15rem;
	box-sizing: border-box;

	.title{
		display: flex;
		align-items: center;
		height: 1.45rem;
		line-height: 1.45rem;
		font-size: .58rem;

		.msg{
			font-weight: normal;
			margin-right: .4rem;
		}
		strong{
			margin-right: .2rem;
		}
		span{
			height: .73rem;
			padding: 0 .4rem;
			line-height: .73rem;
			background: #C73200;
			border-radius: .8rem;
			font-size: .45rem;
			color: #fff;
			i{
				font-weight: bold;
				margin: 0 .05rem;
			}
		}
	}
	.sub-title{
		height: 1.25rem;
		line-height: 1.25rem;
		font-size: .45rem;
	}
}
.right{
	position: absolute;
	top: .4rem;
	right: 1rem;
	width: 1.22rem;
	height: 1.1rem;
	font-size: .7rem;
	font-weight: bold;
	text-align: center;
	line-height: 1.1rem;
}
</style>

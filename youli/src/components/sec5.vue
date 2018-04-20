<template>
	<div class="sec5">
		<Header  :time="time" :headerMsg="{ num: '七', title: '组内互评', subtitle: '小组备课的副标题'}"></Header>
		<div class="npc">
			<span></span>
		</div>
		<div class="teams">
			<div :class="['p',{'girl': item.type == 2}]" v-for="(item, index) in childrens" :key="index" @click="checked(index)">{{item.name}}</div>
		</div>

		<transition name="hide">
			<div class="float" v-show="showFloatBool">
				<div class="float-main">
					<div class="light"></div>
					<div class="float-msg">
						<p>恭喜{{selectedChild.name}}</p>
						<p>获得本组</p>
						<p>优秀组员</p>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import Header from './common/header'
export default {
	name : 'sec5',
	data () {
		return {
			time: 100,
			showFloatBool: false,
			childrens: [	//type2 为女 ， 1为男
				{name: '黄晓明', type: 1},
				{name: '黄晓明1', type: 1},
				{name: '黄晓明2', type: 2},
				{name: '黄晓明3', type: 1},
				{name: '黄晓明4', type: 2},
				{name: '黄晓明5', type: 1},
				{name: '黄晓明6', type: 2},
				{name: '黄晓明7', type: 1},
			],
			selectedChild: {}
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
				
			}
		},
		showFloat(){
			this.showFloatBool = !this.showFloatBool
		},
		checked(index){
			const that = this;
			let child = that.childrens[index];	//点击的组员
			that.selectedChild = child;
			that.showFloatBool = !that.showFloatBool
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
.sec5{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.bg1('../assets/sec5.png');
	overflow: hidden;
}
.npc{
	position: absolute;
	bottom: 0;
	left: 1rem;
	width: 3.9rem;
	height: 7.5rem;
	.bg('../assets/npc.png');

	span{
		position: absolute;
		right: -2rem;
		top: -3.2rem;
		width: 6.27rem;
		height: 3.71rem;
		.bg('../assets/pao2.png');
		font-size: .52rem;
	}
}
.teams{
	position: absolute;
	top: 6rem;
	left: 6rem;
	width: 18rem;
	text-align: center;

	.p{
		display: inline-block;
		width: 2.66rem;
		height: 3.47rem;
		background: url('../assets/child.png') no-repeat;
		background-size: 200%;
		box-sizing: border-box;
		padding-top: 2.6rem;
		font-size: .48rem;
		line-height: .8rem;
		text-align: center;
		color: #fff;
		margin: 0 .2rem .8rem;

		&.girl{
			background-position: 100% 0;
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
</style>

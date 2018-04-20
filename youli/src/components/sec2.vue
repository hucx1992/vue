<template>
	<div class="sec2">
		<Header :time="time" :headerMsg="{ num: '二', title: '小组备课', subtitle: '小组备课的副标题'}"></Header>
		<transition name="hide">
			<div class="sec2-sec0" v-if='bool'>
				<Tv></Tv>
				<div class="npc">
					<div class="pao">
						<p>请认真观影，</p>
						<p>要答题的哟</p>
					</div>
				</div>
			</div>
		</transition>
		<div class="sec2-sec1" v-if='!bool'>
			<div class="queNum">第{{queNum.cur}}/{{queNum.all}}题</div>
			<div class="que">{{options.que}}</div>
			<div class="choose">
				<div :class="['bar', {'check': cIndex == index}]" v-for="(item, index) in options.ans" :key="index" @click="checked(index)">{{item}}</div>
			</div>
		</div>
		<transition name="hide">
			<Float1 :rlt="rlt" v-if="showFloat" @getAns="getAns"></Float1>
		</transition>
	</div>
</template>

<script>
import Header from './common/header'
import Tv from './sec2/tv'
import Float1 from './common/float_rlt'
export default {
	name : 'sec2',
	data () {
		return {
			queNum: {
				cur: 0,
				all: 5
			},
			rlt: {ans: 1, msg: ''}, 		//答题结果
			showFloat: false,
			cIndex: -1,		//选择的答案
			bool: true,
			options: {},
			time: 0,
			timeOutBool: false
		}
	},
	components: {
		Header,
		Tv,
		Float1
	},
	methods: {
		timeOutFun(){
			const that = this;
			if(that.time>0 && that.timeOutBool){
				that.time --;
				setTimeout(()=>{
					that.timeOutFun()
				},1000)
			} else {	
				//答题时间超过
				this.checked(-1)
			}
		},
		timeOutFun2(){
			const that = this;
			if(that.time>0){
				that.time --;
				setTimeout(()=>{
					that.timeOutFun2()
				},1000)
			} else {
				that.bool = false
				that.getAns();	//获取题目
			}
		},
		getAns(){
			const that = this;
			//初始化答题
			that.cIndex = -1;
			if(that.queNum.cur >= that.queNum.all){		//判断是否答完全部的题
				that.$store.state.ApiService.showSec ++
				return
			}
			that.time = 10		//设置答题时间
			that.options = [];
			setTimeout(()=>{
				that.timeOutBool = true;
				that.timeOutFun();
				that.queNum.cur ++ ;
				that.options = {
					que: '第'+that.queNum.cur+'题题目',
					ans: ['我还要再继续玩一玩','我还要再继续玩一玩1','我还要再继续玩一玩2','我还要再继续玩一玩3']
				}
			},100)
		},
		checked(index){
			this.cIndex = index;
			if(false){		//是否答对
				this.rlt = {ans: 1, msg: ''};
			} else {
				this.rlt = {ans: 0, msg: '你回到错误了哈哈哈'};
			}
			this.timeOutBool = false
			this.showFloat = true
		}
	},
	mounted(){
		const that = this;
		that.time = 10;			//观影时间
		that.timeOutFun2();		//观影
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
.sec2{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.bg1('../assets/sec2.jpg');
	overflow: hidden;
}
.npc{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 3.9rem;
	height: 7.5rem;
	.bg('../assets/npc.png');
	transform: translate(-100%, 30%);
	opacity: 0;
	animation: show 1s 1.5s forwards;

	.pao{
		position: absolute;
		top: 0;
		right: -6rem;
		width: 5.68rem;
		height: 3.04rem;
		.bg('../assets/pao.png');
		font-size: .68rem;
		opacity: 0;
		transform: translate(-5%, 0);
		animation: show 1s 2.5s forwards;
		box-sizing: border-box;
		padding: .5rem 0 0 1.3rem;

		p{
			transform: rotate(-2.5deg);
			margin-bottom: .1rem;
		}
	}
}
.sec2-sec1{
	position: absolute;
	top: 4.8rem;
	left: 0;
	width: 24.46rem;
	height: 11.3rem;
	.bg('../assets/car.png');
	transform: translate(150%,0);
	animation: show .5s .2s forwards;
	
	.que{
		position: absolute;
		top: -2.1rem;
		right: -1.35rem;
		width: 15.46rem;
		height: 1.38rem;
		line-height: 1.38rem;
		padding-left: .8rem;
		border-radius: 1.5rem 0 0 1.5rem;
		background: rgba(0,0,0,.6);
		color: #fff;
		font-size: .7rem;
		box-sizing: border-box;
	}
	.queNum{
		position: absolute;
		top: -1.6rem;
		left: -1.35rem;
		width: 5.2rem;
		height: .86rem;
		line-height: .86rem;
		padding-right: .7rem;
		border-radius: 0 1.5rem 1.5rem 0;
		background: rgba(0,0,0,.6);
		color: #fff;
		font-size: .45rem;
		text-align: right;
		box-sizing: border-box;
	}
	.choose{
		position: absolute;
		top: 1.2rem;
		right: -.82rem;

		.bar{
			width: 15.1rem;
			height: 2.82rem;
			.bg('../assets/bar.png');
			margin-top: -.5rem;
			box-sizing: border-box;
			padding: .3rem 0 0 1.1rem;
			font-size: .7rem;
			line-height: 1.3rem;
			transform: translate(150%,0);

			&:nth-child(1){
				animation: show .5s .3s forwards;
			}
			&:nth-child(2){
				animation: show .5s .4s forwards;
			}
			&:nth-child(3){
				animation: show .5s .5s forwards;
			}
			&:nth-child(4){
				animation: show .5s .6s forwards;
			}

			&.check{
				background-position: 0 100%;
			}
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
@keyframes show{
	100%{ transform: translate(0, 0) scale(1); opacity: 1}
}
</style>

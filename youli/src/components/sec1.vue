<template>
	<div class="sec1">
		<Header :showUser="true"></Header>
		<Slide></Slide>
		<div class="chooseTeam" v-if="showChooseTeam">
			<div class="chooseTeam-main" v-if="!showNPCPao">
				<h3>请选择你所在的小组</h3>
				<div :class="['ul', {'hide': chooseTeamB}]">
					<div :class="['team',{'selected': cTeamIndex == index}]" v-for="(item, index) in teams" :key="index" @click="chooseTeam(index,item)">
						<span class="num">{{item}}</span>
					</div>
				</div>
			</div>

			<div class="npc" v-else>
				<div :class="['pao', {'pao0': !showPao1}, {'pao1': showPao1}]">
					<div class="btn" v-if="showPao1" @click="hideFloat">知道啦~</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Slide from './sec1/slide'
import Header from './common/header'
export default {
	name : 'sec1',
	data () {
		return {
			msg: 'sec1',
			teams: [1,2,3,4,5,3,4,5],
			showChooseTeam: false,
			cTeamIndex: -1,
			chooseTeamB: false,
			showPao1: false,
			showNPCPao: false
		}
	},
	components: {
		Slide,
		Header
	},
	methods: {
		hideFloat(){
			this.$store.state.ApiService.showSec ++
		},
		chooseTeam(index,item){
			const that = this;
			if(!that.chooseTeamB){
				that.cTeamIndex = index;
				that.chooseTeamB = true;
				setTimeout(()=>{
					that.$store.state.ApiService.teamNum = item;
					that.showNPCPao = true;

					setTimeout(()=>{
						that.showPao1 = true;
					}, 4000)
				}, 1500)
			}
		}
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

.chooseTeam{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.6);
	z-index: 999;
}
.chooseTeam-main{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 20.39rem;
	height: 8.33rem;
	.bg("../assets/sec0_1.png");
	box-sizing: border-box;
	padding: 3.5rem 3.6rem 0;
	
	h3{
		position: absolute;
		top: 2rem;
		left: 0;
		width: 100%;
		font-size: .68rem;
		text-align: center;
	}
	.ul{
		width: 100%;
		height: 100%;

		&.hide{
			.team{
				 animation: hideTeam .6s forwards;
			}
			.team.selected{
				animation: select 1.5s forwards;
			}
		}
	}
	.team{
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

		i{
			position: absolute;
			bottom: -1.2rem;
			left: 0;
			width: 100%;
			text-align: center;
			font-size: .58rem
		}

		&.selected{
			background-position: 0 100%;
			color: #fff;

			i{
				color: #ff9700;
			}
		}
	}
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
	animation: show 1s forwards;



	.pao{
		position: absolute;
		top: 0;
		left: 4rem;
		width: 5.68rem;
		height: 3.04rem;
		.bg('../assets/pao.png');
		font-size: .68rem;
		opacity: 0;
		transform: translate(-5%, 0);
		animation: show 1s 1.5s forwards;
		box-sizing: border-box;
		padding: .5rem 0 0 1.3rem;

		p{
			transform: rotate(-2.5deg);
			margin-bottom: .1rem;
		}
		&.pao0{
			width: 5.67rem;
			height: 3.04rem;
			.bg('../assets/pao0.png');
		}
		&.pao1{
			width: 8.56rem;
			height: 3.14rem;
			.bg('../assets/pao0_1.png');
		}
	}
	.btn{
		position: absolute;
		top: 4rem;
		right: -1rem;
		width: 4rem;
		height: 1rem;
		line-height: 1rem;
		border-radius: 1rem;
		font-size: .58rem;
		text-align: center;
		background: #F7E22F;
	}
}
@keyframes show{
	100%{ transform: translate(0, 0) scale(1); opacity: 1}
}
@keyframes hideTeam{
	100%{ opacity: 0}
}
@keyframes select{
	50%	{ transform: scale(1.2) translate(0, 0); opacity: 1}
	100%{ transform: translate(5rem, -8rem); opacity: 0}
}
</style>

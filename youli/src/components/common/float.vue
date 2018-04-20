<template>
	<div class="float">
		<div class="float-body">
			<ChooseSex v-if="rlt==0"></ChooseSex>
			<SetName v-if="rlt==1"></SetName>
			<ChooseTeam v-if="rlt==2"></ChooseTeam>
		</div>
	</div>
</template>

<script>
import ChooseSex from "../register/chooseSex";
import SetName from "../register/setName";
import ChooseTeam from "../register/chooseTeam";
import Answer from "../sec2/answer";
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
		SetName,
		ChooseTeam,
		Answer
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
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

<template>
	<div class="chooseTeam">
		<h3>请选择你所在的小组</h3>
		<div class="teams">
			<div class="team" v-for="(item, index) in teams" @click="choose(index)" :class="{'choose': cur == index}">{{item}}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'chooseTeam',
	data () {
		return {
			chooseBool: true,
			cur: -1,
			teams: [1,2,3,4,5,6,7,8]
		}
	},
	methods: {
		choose(index){
			if(this.chooseBool){
				this.chooseBool = !this.chooseBool;
				this.cur = index
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
.chooseTeam{
	.team{
		float: left;
		width: 2.14rem;
		height: 2.21rem;
		.bg('../../assets/team.png');
		text-align: center;
		line-height: 1.5rem;
		font-weight: bold;
		font-size: 1.04rem;
		color: #9F8B63;
		margin: 0 .14rem;

		&.choose{
			color: #000;
			.bg('../../assets/team_a.png');
		}
	}
}
</style>

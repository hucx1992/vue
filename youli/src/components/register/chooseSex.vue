<template>
	<div class="chooseSex">
		<h3>请选择你的性别</h3>
		<div class="content">
			<div class="boy" @click="setSex(1)">
				<p>我是男生</p>
				<span></span>
			</div>
			<div class="girl" @click="setSex(2)">
				<span></span>
				<p>我是女生</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name : 'chooseSex',
	data () {
		return {
			sex: 0
		}
	},
	methods: {
		setSex(sex){
			this.sex = sex
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

.content{
	display: flex;
	font-size: .48rem;
	color: #EC4863;
	padding-top: .5rem;
	.boy{
		position: relative;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		p{
			color: #3596D2;
			margin-right: .6rem;
		}
		span{
			display: block;
			width: .96rem;
			height: 2.6rem;
			.bg('../../assets/boy.png')
		}
		&:after{
			content: '';
			position: absolute;
			top: .8rem;
			right: 0;
			width: .02rem;
			height: 1.26rem;
			background: #aaa;
		}
	}
	.girl{
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		span{
			display: block;
			width: 1.22rem;
			height: 2.52rem;
			.bg('../../assets/girl.png');
			margin-right: .6rem;
		}
	}
}
</style>

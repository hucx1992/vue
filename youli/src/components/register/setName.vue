<template>
	<div class="setName">
		<div class="main" v-if="success">
			<h3>小朋友，欢迎来到智慧教室</h3>
			<input type="" name="" placeholder="请输入姓名">
			<div class="btn" v-if="rlt.err">
				<button class="return" @click="returnPage">返回</button>
				<button class="next" @click="changeSuc">下一步</button>
			</div>
		</div>
		<div class="err" v-else>
			<h3>错误</h3>
			<p>{{rlt.err.txt}}</p>
			<button>{{rlt.err.btn}}</button>
		</div>
	</div>
</template>

<script>
export default {
	name : 'setName',
	data () {
		return {
			success: true,		//注册是否成功
			rlt: {
				err: {
					txt: '教师审核不通过，请重新注册',
					btn: '好的'
				}
			}
		}
	},
	methods:{
		changeSuc(){
			if(true){		//注册成功, 修改true
				this.success = true;
				this.$store.state.ApiService.showSec ++
			} else {		//注册失败
				this.success = false
			}
		},
		returnPage(){
			this.$parent.$parent.showFloat = false
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
h3{
	margin-bottom: 1.1rem;
}
input{
	display: block;
	width: 7rem;
	height: 1.28rem;
	border-radius: .58rem;
	box-shadow: 0 0 .1rem #666;
	border: 0 none;
	margin: 0 auto .6rem;
	font-size: .58rem;
	text-align: center;
	color: #aaa;
}
.btn{
	display: flex;
	justify-content: center;
	button{
		font-size: .58rem;
		color: #fff;
		border-radius: .4rem;
		border: 0 none;
		box-shadow: 0 0 .1rem #222;
	}
	.return{
		width: 2.28rem;
		height: 1.38rem;
		background: #79c5ed;
		margin-right: .8rem;
	}
	.next{
		width: 4rem;
		height: 1.38rem;
		background: #a2c020;
	}
}
.err{
	text-align: center;
	font-size: .68rem;
	button{
		width: 4rem;
		height: 1.38rem;
		background: #a2c020;
		font-size: .58rem;
		color: #fff;
		border-radius: .4rem;
		border: 0 none;
		box-shadow: 0 0 .1rem #222;
		border: 0 none;
		margin-top: .8rem;
	}
}
</style>

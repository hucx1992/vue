<template>
	<div :id="msg.name" :class="[msg.type,{'type0': !msg.type}]">
		<h3>{{msg.title}}</h3>
		<div class="box" v-for="(data, index) in list" :key="index" :class="[{'bw': list.length%2 == 1&&index==0},{'mr': list.length%2 == 1 && index % 2 == 1},{'mr': list.length%2 == 0 && index % 2 == 0}]" @click="playMovie({'vid': data.content, 'cid': data.bid})">
			<div class="pic">
				<img v-lazy="data.pic1"/>
				<h3 class='title0'>{{data.title}}</h3>
			</div>
			<div class="t">
				<h4 class='title1'>{{data.title}}</h4>
				<p>{{data.subTitle ==''? data.title: data.subTitle}}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'sections1',
	data () {
		return {
		  	list: [],
		}
	},
	props: ['msg'],
	watch: {
		msg(){
			this.getList()
		}
	},
	mounted(e){
		this.getList(e)
	},
	methods: {
		getList(){
		  	const that = this;
		  	that.axios(that.HOST + '/block/'+ this.msg.id+'.json').then((res)=>{
		  		if(res.status === 200){
		  			let data = res.data.blockContent;
		  			this.msg.len = this.msg.len? this.msg.len: -1;
		  			that.list = data.slice(0, this.msg.len)
		  			console.log(that.list)
		  		}
		  	})
		},
		playMovie(ids){
			this.$store.commit('setPlayId', ids)
			this.$store.commit('setPlayPage', true)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
h3{
	line-height: .8rem;
	font-size: .36rem;
	padding-left: .2rem;
}
.oh{
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.type0{
	.box{
		float: left;
		width: 49.5%;
		margin-bottom: 1%;

		&.bw{
			width: 100%;
			.pic{
				height: 4.68rem;
			}
		}
		&.mr{
			margin-right: 1%;
		}
		.pic{
			position: relative;
			height: 2.04rem;
			overflow: hidden;
			img{
				display: block;
				width: 100%;
			}
			h3{
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				line-height: .56rem;
				font-size: .28rem;
				color: #fff;
				background: rgba(0, 0, 0, 0.6);
				.oh();
			}
		}
		p{
			font-size: .24rem;
			background: #eee;
			padding: .2rem;
			.oh();
		}
	}
	.title1{
		display: none;
	}
}
.type1{
	padding: 0 2%;
	.box{
		display: flex;
		margin-bottom: .2rem;
	}
	.pic{
		width: 2.14rem;
		height: 1.18rem;
		overflow: hidden;

		img{
			width: 100%;
		}
	}
	.t{
		width: 5rem;
	}
	p{
		font-size: .24rem;
		padding: .1rem;
		color: #919191;
		.oh();
	}
	.title1{
		line-height: .56rem;
		font-size: .28rem;
		padding-left: .1rem;
		.oh();
	}
	.title0{
		display: none;
	}
}
</style>

<template>
	<div class="commont">
		<h3>评论</h3>
		<div class="commit">
			<span>hi，我来说两句</span>
		</div>
		<ul class="list">
			<li v-for="(item, index) in list" :key="index">
				<img :src="item.user.photo">
				<div class="content">
					<h4>{{item.user.username}}</h4>
					<div class="times">发表于{{item.vtime}}</div>
					<p>{{item.content}}</p>
				</div>
			</li>
		</ul>
		<div class="more">——打开中国蓝TV，查看全部评论——</div>
	</div>
</template>

<script>
export default {
	name: 'commont',
	data () {
		return {
			list: []
		}
	},
	props: ['vid'],
	created(){
	},
	mounted(){
	  	console.log('--------------------------------------------------------------'+this.vid)
	  	const that = this;
	  	that.axios(that.MY + '/api/list?xid=' + that.vid + '&page=1&rows=10&type=video').then((res)=>{
			console.log(res)
			let data = res.data.data;
			if(data.length <= 0){
				return;
			} else {
				that.list = data
				console.log(data)
			}
	  		console.log('--------------------------------------------------------------')
		}).catch((res)=>{
			console.log('请求评论失败')
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.list{
	border-bottom: .01rem solid #f5f5f5;
	li{
		display: flex;
		margin: 0 4%;
		border-top: .01rem solid #f5f5f5;
		padding: .17rem 0 .24rem 0;
	}
	img{
		display: block;
		height: .72rem;
		border-radius: 50%;
		margin-right: .18rem;
	}
	.content {
		line-height: .38rem;
		h4{
			color: #5babf2;
			font-size: .24rem;
		}
		.times{
			font-size: .24rem;
			color: #252525;
			opacity: .5;
			margin-bottom: .1rem;
		}
		p{
			color: #666;
			font-size: .28rem;
		}
	}
}
.commit{
	position: relative;
	width: 100%;
	height: 1.22rem;
	background: url('http://ohudong.cztv.com/1/249248/images/pingluntouxiang.png') .32rem center no-repeat;
	background-size: .72rem .72rem;
	margin-bottom: .24rem;
	span{
		position: absolute;
		top: .28rem;
		left: 1.32rem;
		width: 5.7rem;
		height: .72rem;
		background: url('https://ohudong.cztv.com/1/249248/images/pinglunkuang-3x.png') no-repeat;
		background-size: 100% 100%;
		padding-left: .5rem;
		font-size: .24rem;
		color: #828282;
		line-height: .72rem;
	}
}
.more{
	font-size: .28rem;
	text-align: center;
	line-height: .64rem;
	color: #229df2;
	margin-top: .16rem;
}
</style>

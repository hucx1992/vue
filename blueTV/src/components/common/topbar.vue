<template>
  <div id="topbar">
  	<a href="/" class="logo">
  		<img src="http://i3.letvimg.com/lc06_isvrs/201605/17/13/38/5b0e722067514b64b10d3e5fb82e3bd71577664492545621229.png" alt="中国蓝TV" title="中国蓝TV">
  	</a>

	<div class="swiper-container nav-list">
		<div class="swiper-wrapper">
			<div class="swiper-slide" @click="curPage(index)" v-for = "(data, index) in nav" :key="index">
				<router-link :to="{name: data.name}" :alt="data.title" :title="data.title">{{data.title}}</router-link>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

export default {
	name: 'topbar',
	data () {
		return {
			nav: [
				{
					title: "首页",
					name: "/"
				},
				{
					title: "直播",
					name: "live"
				},
				{
					title: "综艺",
					name: "variety"
				},
				{
					title: "电影",
					name: "movie"
				},
				{
					title: "电视剧",
					name: "tv"
				},
				{
					title: "生活",
					name: "life"
				},
				{
					title: "少儿",
					name: "child"
				},
				{
					title: "音乐",
					name: "music"
				},
				{
					title: "新闻",
					name: "news"
				},
				{
					title: "布噜制造",
					name: "blzz"
				}
			],
			indexs: 0
		}
	},
	methods: {
		curPage(index){
			this.indexs = index
		}
	},
	mounted(){

	    var swiper = new Swiper('.nav-list', {
	      slidesPerView: 5,
	      freeMode: true
	    });
  
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#topbar{
	
	.logo{
		display: flex;
		height: .9rem;
		background: #fff;
		align-items: center;
		padding-left: .2rem;
		border-bottom: .04rem solid #d9d9d9;

		img{
			width: 2rem;
		}
	}
	.nav-list{
		background: #f2f2f2;
		white-space: nowrap;
		font-size: .3rem;

		.swiper-slide{
			display: inline-block;
			line-height: 1rem;
			text-align: center;
			a{
				color: #333;
			}
		}
	}
}
.router-link-exact-active{
	display: block;
	color: #4d147a;
	border-bottom: .04rem solid #4d147a;
}
</style>

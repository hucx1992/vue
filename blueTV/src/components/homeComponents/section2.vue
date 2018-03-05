<template>
	<div :id="msg.name" :class="msg.type">
		<h3>{{msg.title}}</h3>
		<div class="swiper-container" :id="msg.name+'-slide'">
			<div class="swiper-wrapper wrap">
				<div class="swiper-slide slide box" v-for="(data, index) in list" :key="index" @click="playMovie(data.content)">
					<div class="pic">
						<img v-lazy="data.pic"/>
						<h4 v-if="msg.type!=1">{{data.title}}</h4>
					</div>
					<p>{{data.title}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
	name: 'sections2',
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
		  	new Promise((resolve, reject) => {
			  	that.axios(that.CMS+'/mms/out/album/videos?id='+this.msg.pid+'&cid='+this.msg.cid+'&platform=pc&vid='+this.msg.vid).then((res)=>{
			  		this.list = res.data.data
			  		resolve();
			  	}).catch((res)=>{
			  		console.log(res)
			  	})
		  	}).then(()=>{
			    var swiper = new Swiper('#'+this.msg.name+'-slide', {
			        breakpoints: {
			        	1000: {
			        		slidesPerView: 3,
			        		spaceBetween: 5
			        	},
			        	1400: {
			        		slidesPerView: 6,
			        		spaceBetween: 10
			        	},
			        	2000: {
			        		slidesPerView: 7,
			        		spaceBetween: 15
			        	},
			        },
			        slidesPerView: 'auto',
			        slidesPerColumn: 1,
			        paginationClickable: true
			    });
		  	});
		},
		playMovie(id){
			this.$store.commit('setPlayId', id)
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
	margin: .12rem 0;
}
.oh{
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.type1{
	padding: 0 2%;
	.box{
		position: relative;
		margin-bottom: 1%;
		overflow: hidden;

		img{
			display: block;
			width: 100%;
		}
		&.bw{
			width: 100%;
			.pic{
				height: auto;
			}
		}
		&.mr{
			margin-right: 1%;
		}
		.pic{
			position: relative;
			height: 1.52rem;
			overflow: hidden;
			h4{
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
	}
	.slide{
		p{
			font-size: .24rem;
			background: #eee;
			padding: .2rem;
			.oh();
		}
	}
}


</style>

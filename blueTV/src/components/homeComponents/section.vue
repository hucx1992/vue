<template>
	<div :id="msg.name">
		<h3>{{msg.title}}</h3>
		<div class="swiper-container" :id="msg.name+'-slide'">
			<div class="swiper-wrapper wrap">
				<div class="swiper-slide slide box" v-for="(data, index) in list" :key="index" @click="playMovie({'vid': data.content, 'cid': data.video.cid},data.bid)">
					<div class="pic">
						<img v-lazy="data.pic1"/>
						<h4>{{data.title}}</h4>
					</div>
					<p>{{data.subTitle}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
	name: 'sections',
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
			  	that.axios(that.HOST + '/block/'+ this.msg.id+'.json').then((res)=>{
			  		if(res.status === 200){
			  			let data = res.data.blockContent;
			  			that.list = data
		  			console.log(that.list)
			  			resolve()
			  		}
			  	})
		  	}).then(()=>{
			    var swiper = new Swiper('#'+this.msg.name+'-slide', {
			        breakpoints: {
			        	1000: {
			        		slidesPerView: 2,
			        		spaceBetween: 5
			        	},
			        	1400: {
			        		slidesPerView: 4,
			        		spaceBetween: 10
			        	},
			        	2000: {
			        		slidesPerView: 5,
			        		spaceBetween: 15
			        	},
			        },
			        slidesPerView: 'auto',
			        slidesPerColumn: 2,
			        paginationClickable: true
			    });
		  	});
		},
		playMovie(ids, bid){	
			this.$store.commit('setPlayListId', bid)		
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
	border-left: .12rem solid #007aff;
	margin-bottom: .2rem;
	background: #efefef;
}
.oh{
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
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
		height: 2.04rem;
		overflow: hidden;
		h4{
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			line-height: .56rem;
			font-size: .28rem;
			padding: 0 .2rem;
			color: #fff;
			background: rgba(0, 0, 0, 0.6);
			.oh();
		}
	}
}
.slide{
	p{
		font-size: 0.24rem;
		background: #eee;
		padding: .2rem;
		.oh();
	}
}



</style>

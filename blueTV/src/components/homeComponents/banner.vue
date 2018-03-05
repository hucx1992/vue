<template>
	<div class="banner">
		<div class="swiper-container" :id="msg.name+'banner'">
			<div class="swiper-wrapper wrap">
				<div class="swiper-slide slide" v-for="(data, index) in list" :key="index" @click="playMovie({'vid': data.content, 'cid': data.video.cid},data.bid)">
					<img :src="data.mobilePic"/>
					<p class="box">{{data.title}}{{data.subTitle}}</p>
				</div>
			</div>
			<div class="swiper-pagination banner-foot">
			</div>
		</div>
	</div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
  name: 'banner',
  data () {
    return {
      list: []
    }
  },
  props:['msg'],
  mounted(){
  	const that = this;
  	new Promise((resolve, reject) => {
	  	that.axios(that.HOST + '/block/'+this.msg.id+'.json').then((res)=>{
	  		if(res.status === 200){
	  			let data = res.data.blockContent;
	  			that.list = data
	  			resolve()
	  		}
	  	})
  	}).then(()=>{
	    var mySwiper = new Swiper('#'+this.msg.name+'banner',{
	    	loop: true,
	    	autoplay: {
	    		disableOnInteraction: false
	    	},
			pagination : {
				el:'.banner-foot'
			}
		})
  	});
  },
  methods: {
	playMovie(ids, bid){	
		console.log(ids, bid)
		this.$store.commit('setPlayListId', bid)		
		this.$store.commit('setPlayId', ids)
		this.$store.commit('setPlayPage', true)
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.swiper-wrapper{
	position: relative;
	height: 3.5rem;
}
.swiper-container{
	margin: 0 auto;
	.slide{
		position: relative;
		overflow: hidden;

		img{
			width: 100%;
		}
		.box{
			position: absolute;
			bottom: 0;
			left: 0%;
			width: 100%;
			height: .8rem;
			background: rgba(0, 0, 0, 0.6);
			color: #fff;
			box-sizing: border-box;
			padding: 0 .1rem;
			line-height: .8rem;
			font-size: .28rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
.banner-foot{
	position: initial;
	display: flex;
	justify-content: flex-end;
	text-align: right;
	align-items: center;
	width: 95%;
	height: .8rem;
}

</style>

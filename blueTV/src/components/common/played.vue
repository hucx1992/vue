<template>
  <div id="played">
	<div class="return" @click="returnP">く</div>
  	<Ad></Ad>
  	<div class="lantv-box sec">
	  	<div class="vod">
	  		<!-- <video src=""></video> -->
	  		<video-player id="video" :options="videoOptions"></video-player>
	  	</div>
	  	<div class="video-msg">
	  		<div class='l'>
		  		<p>{{playMsg.title}}</p>
		  		<span class="toggle-msg" :class="{'tg': tgBool}" @click="toggleMsg"></span>
	  		</div>
	  		<div class="lantv-msg-share"></div>
	  	</div>
	  	<transition name="hides">
			<p class="subt" v-if="tgBool">简介：{{playMsg.title}}</p>
		</transition>
		<a class="lantv-yindao-btn" :href="$store.state.ApiService.aHref">
			直接打开中国蓝TV，提升3倍流畅度<span>ㄑ</span><span>ㄑ</span><span>ㄑ</span>
		</a>
	</div>
	<div class="sec">
		<Section2 :msg="{'title': '节目列表', 'name':'jmlb', 'cid': playMsg.cid, 'vid': playMsg.vid, 'pid': playMsg.pid, 'type': 'type1'}"></Section2>
	</div>
	<div class="sec">
		<Section1 :msg="{'title': '大家都在看', 'name':'djdzk', 'id': $store.state.ApiService.ids.cid, 'len': 10, 'type': 'type1'}"></Section1>
	</div>
	<div class="sec">
		<h3>王牌节目</h3>
		<div class="swiper-container" id="wpjm-slide">
			<div class="swiper-wrapper wrap">
				<div class="swiper-slide slide box" v-for="(data, index) in wpjm" :key="index" @click="playMovie(data.content,data.bid)">
					<img v-lazy="data.pic1"/>
					<a :href="$store.state.ApiService.aHref" class="lantv-yindao-btn2">打开APP订阅</a>
					<div class="msg-box">
						<h4>{{data.title}}</h4>
						<p>{{data.subTitle}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="sec">
		<Commont :vid="$store.state.ApiService.ids.vid"></Commont>
  	</div>
  	<div class="sec">
  		<IdCard></IdCard>
  	</div>
  	<Footers></Footers>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import Ad from "../homeComponents/ad";
import Section1 from "../homeComponents/section1";
import Section2 from "../homeComponents/section2";
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import videoPlayer from 'vue-video-player';
import 'videojs-contrib-hls';
import Commont from "./commont";
import Footers from "./footers";
import IdCard from "./idCard";



export default {
  name: 'played',
  data () {
    return {
    	tgBool: false,
    	playMsg: {
    		vid: 0
    	},
		videoOptions: {
			//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
			autoplay: false, //如果true,浏览器准备好时开始回放。
			muted: false, // 默认情况下将会消除任何音频。
			loop: false, // 导致视频一结束就重新开始。
			preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
			language: 'zh-CN',
			aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
			fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
			sources: [{
			  type: "application/x-mpegURL",
			  src: '',
			}],
			poster: "poster.jpg", //你的封面地址
			width: document.documentElement.clientWidth,
			notSupportedMessage: '此视频暂无法播放，请稍后再试...', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
			//        controlBar: {
			//          timeDivider: true,
			//          durationDisplay: true,
			//          remainingTimeDisplay: false,
			//          fullscreenToggle: true  //全屏按钮
			//        }
		},
		wpjm: []
    }
  },
  props: ['msg'],
  components: {
    Ad,
    Section1,
    Section2,
    Commont,
    Footers,
    IdCard
  },
  created(){
  	const that = this;
  	that.axios(that.CMS+'/mms/out/video/playJson?id='+that.$store.state.ApiService.ids.vid+'&domain=www.letv.com&splatid=111&platid=1002&at=1&pt=1').then((res)=>{
  		let playurl = res.data.playurl;
  		let url = playurl.dispatch[0].url[0].ali;
  		url = that.ALI + url.replace('http://ali.v.cztv.com','');
  		that.playMsg = playurl;
  		that.videoOptions.sources[0].src= url
  		//获取节目列表

  	}).catch((res)=>{
  		console.log(res)
  	})
  },
  mounted(){
  	const that = this;
  	//获取王牌节目

  	new Promise((resolve, reject) => {
	  	that.axios(that.HOST + '/block/2693.json').then((res)=>{
	  		if(res.status === 200){
	  			let data = res.data.blockContent;
	  			that.wpjm = data
	  			resolve()
	  		}
	  	})
  	}).then(()=>{
		var swiper2 = new Swiper('#wpjm-slide',{
	      effect: 'coverflow',
	      grabCursor: true,
	      centeredSlides: true,
	      initialSlide: 1,
	      slidesPerView: 'auto',
		  slidesPerView: 1.62,
	      coverflowEffect: {
	        rotate: 80,
	        stretch: 20,
	        depth: 400,
	        modifier: 1,
	        slideShadows : false,
	      },
	      pagination: {
	        el: '.swiper-pagination',
	      },
	    });
  	});
  },
  methods: {
  	toggleMsg(){
  		this.tgBool = !this.tgBool;
  		//this.$store.dispatch('')
  	},
    returnP(){
      this.$store.commit('setPlayPage', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#played{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #f5f5f5;
	z-index: 999;
	overflow: auto;
	padding-top: .7rem;
	
  	.return{
  		position: fixed;
  		top: 0;
  		left: 0;
  		width: 100%;
		height: .7rem;
		line-height: .7rem;
		font-size: .4rem;
		z-index: 999999999999999999999999;
		background: url("http://i3.letvimg.com/lc06_isvrs/201605/17/13/38/5b0e722067514b64b10d3e5fb82e3bd71577664492545621229.png") right .3rem center no-repeat #fff;
		background-size: 1.6rem;
		box-shadow: 0 0 .1rem #888;
	}
	.vod{
		width: 100%;

		#video{
			position: relative;
			display: block;
			width: 100%;
			height: 100%;
			background: #000;
			font-size: .4rem;
		}
	}

    .lantv-msg-share{
      width: 0.44rem;
      height: 0.44rem;
      background: url('http://ohudong.cztv.com/1/249248/images/zhuanfa-3x.png') no-repeat;
      background-size: 100%;
      margin-right: .1rem;
    }
    .l{
		display: flex;
    	align-items: center;
    }
	.video-msg{
		display: flex;
		padding: 0 .2rem;
		height: 1rem;
		line-height: 1rem;
		font-size: .28rem;
		align-items: center;
    	justify-content: space-between;

		p{
			width: 6rem;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			color: #333;
			margin-right: .2rem;
		}
		.toggle-msg{
			display: block;
			width: .4rem;
			height: .4rem;
			background: url('http://ohudong.cztv.com/1/249248/images/detail2-3x.png') center no-repeat;
			background-size: .24rem .16rem;
			transition: all .3s;

			&.tg{
				transform: rotate(180deg);
			}
		}
	}
	.subt{
		height: 1rem;
		padding: 0 .2rem;
		font-size: .24rem;
		overflow: hidden;
		color: #666;
		margin-bottom: .2rem;
	}
	.hides-enter{
  		height: 0;
		transition: all .3s;
		margin-bottom: 0;
	}
	.hides-enter-active{
		transition: all .3s;
	}
	.hides-leave-active {
	  	height: 0;
		transition: all .3s;
		margin-bottom: 0;
	}
	.lantv-yindao-btn{
		display: block;
		width: 7rem;
		height: .88rem;
		line-height: .88rem;
		color: #fff;
		font-size: .28rem;
		text-align: center;
		background: linear-gradient(to right, #0db1ff, #2c93ee);
		border-radius: .88rem;
		margin: 0 auto;
		box-shadow: 0.04rem .1rem .4rem rgba(20, 170, 251, .4);
		
		span{
			display: inline-block;
			font-size: .24rem;
			vertical-align: middle;
			transform: rotate(180deg);
			margin-right: -.1rem;

			&:nth-child(1){
				animation: lantvBtn 1.2s infinite
			}
			&:nth-child(2){
				animation: lantvBtn 1.2s .4s infinite
			}
			&:nth-child(3){
				animation: lantvBtn 1.2s .8s infinite
			}
		}
	}
	.vjs-big-play-button{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 50%;

		span{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			&:before{
				display: block;
				font-size: .8rem;
				text-align: center;
				line-height: 1.2rem;
			}
		}
	}
	.sec{
		background: #fff;
		margin-bottom: .16rem;
		padding-bottom: .16rem;

		h3{
		    line-height: .8rem;
		    font-size: .36rem;
		    padding-left: .2rem;
		}
	}
	.lantv-box{
		padding-bottom: .5rem;
	}
}
@keyframes lantvBtn{
	0%	{ transform: rotate(180deg) scale(1); opacity: .6}
	50%	{ transform: rotate(180deg) scale(1.1); opacity: 1}
	100%{ transform: rotate(180deg) scale(1); opacity: .6}
}
.oh{
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
#wpjm-slide{
	font-size: .24rem;

	.swiper-slide {
		box-sizing: border-box;
		border-radius: .2rem;

		img{
			display: block;
			width: 80%;
			height: 1.96rem;
			margin: 0 auto .4rem;
			border-radius: .2rem;
		}
		.msg-box{
			padding: 1.5rem .4rem .4rem;
			border-radius: .4rem;
			box-shadow: 0 .1rem .4rem #eee;
			margin-top: -1.5rem;
			margin-bottom: .5rem;
		}
		h4{
			font-size: .28rem;
			line-height: .5rem;
			text-align: center;
			.oh();
		}
		p{
			font-size: .24rem;
			line-height: .5rem;
			text-align: center;
			color: #252525;
			opacity: .5;
			.oh();
		}
		.lantv-yindao-btn2{
			position: absolute;
			top: 1.62rem;
			left: 1.3rem;
			padding: .13rem .32rem;
			color: #fff;
			font-size: .28rem;
			text-align: center;
			background: linear-gradient(to right, #0db1ff, #2c93ee);
			border-radius: .88rem;
			margin: 0 auto;
		}
	}
}
</style>

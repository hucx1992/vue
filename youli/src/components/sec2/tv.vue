<template>
	<div class="tv">
		<div class="v-bg"></div>
		<div class="vod"></div>
		<video id="player" src="http://pcvideogs.titan.mgtv.com/pb/2018/01/02/1318/A71F9B75DA40B05373DCFA2E8F636AA9_20180102_1_1_238.mp4?arange=0&amp;pm=sip47wqZugfZgL5bd3RyRAoZrW2JMKuD6wQpo8URgrRgQROsU_Ggwvr7oP4iHTfzSjow9Jk1pTJIzBWlz9AWbeo7KMtJ4BwldhSXh33S9IiV9w_5bJ6Vfpotl5aOXk3DUibw8T2nkc5EHrX8Ib9CfH4Q85GDXbOJnl7YUBwKRCxD1J4fgxfFt_JPIujOHzbG0koqFNmS4TCbx0HyPeps5Y5Z2vro7EPYFUz87cdz3LxwY~SjDOjL9g4eLzu3FpnT_CQOTJLMllS7yjcwAXTIaRWtfu9mvnjEeoUICVcQQEh7sNivtb2oDdYVUZ6WCpKBEbFt4LjuFfHZ8WtTRcbs9XgqQtroo7E6mUMcOmj1VonIFwL_ytXZUg6Pk~1LqL0xoMl0EfNxiMQeLMaKqvmXOW_ufOU-" poster="" preload="auto" playsinline="" x-webkit-airplay="deny" webkit-playsinline="" :controls="showControls"></video>
		<div :class="['playIcon',{'hide': playIcons}]" @click="playVod"></div>
	</div>
</template>

<script>
export default {
	name : 'tv',
	data () {
		return {
			showControls: false,
			playIcons: false
		}
	},
	methods: {
		playVod(){
			const that = this;
			let vod = document.getElementById('player');
			vod.play();
			that.showControls = true;
			that.playIcons = true;
			let timeOut;
			vod.addEventListener('play', ()=>{
				clearTimeout(timeOut)
				that.showControls = true;
				that.playIcons = true;
			})
			vod.addEventListener('pause', ()=>{
				timeOut = setTimeout(()=>{
					that.showControls = false;
					that.playIcons = false;
				},200)
			})
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
.tv{
	position: absolute;
	bottom: .6rem;
	right: -.4rem;
	width: 18.74rem;
	height: 13.49rem;
	transform: scale(0);
	animation: show 1s .8s forwards;
	

	.v-bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		.bg("../../assets/tv.png");
	}
	.vod{
		position: absolute;
		top: 1.5rem;
		left: 3.2rem;
		width: 66%;
		height: 67%;
		background: #000;
	}
	video{
		position: absolute;
		z-index: 3;
		top: 2.9rem;
		left: 4.2rem;
		width: 55%;
		height: 48%;
	}
	.playIcon{
		position: absolute;
		top: 4.5rem;
		left: 50%;
		transform: translate(-50%, 0);
		width: 3rem;
		height: 3rem;
		.bg('https://ohudong.cztv.com/1/254659/images/video.png');
		z-index: 3;
	}
	.hide{
		display: none;
	}
}
@keyframes show{
	20%	{ transform: scale(1.3);}
	30%	{ transform: scale(.8);}
	40%	{ transform: scale(1.1);}
	50%	{ transform: scale(.9);}
	60%	{ transform: scale(1);}
	70%	{ transform: scale(1);}
	80%	{ transform: scale(1);}
	100%{ transform: scale(1);}
}
</style>

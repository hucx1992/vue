<template>
	<div class="slide">
		<div class="swiper-container" id="chooseClass">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item, index) in list">
					<img :src="item.pic">
					<div class="num">
						<span>{{item.num}}/</span>
						<span class='all'>{{item.all}}</span>
					</div>
					<div class='btn' :class="[{'touch': cIndex == index, 'type1': index%2 == 0}]" @touchstart="startTouch(index)" @touchend="stopTouch" @click="setChoose"></div>
				</div>
			</div>
		</div>
		<div class="swiper-button-next arrow"></div>
		<div class="swiper-button-prev arrow"></div>
	</div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
	name : 'slide',
	data () {
		return {
			cIndex: -1,
			list: [
				{
					pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1192669903,3228679607&fm=27&gp=0.jpg',
					title: '语文',
					num: 10,
					all: 50
				},
				{
					pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1192669903,3228679607&fm=27&gp=0.jpg',
					title: '语文1',
					num: 10,
					all: 50
				},
				{
					pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1192669903,3228679607&fm=27&gp=0.jpg',
					title: '语文2',
					num: 10,
					all: 50
				},
				{
					pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1192669903,3228679607&fm=27&gp=0.jpg',
					title: '语文2',
					num: 10,
					all: 50
				},
				{
					pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1192669903,3228679607&fm=27&gp=0.jpg',
					title: '语文2',
					num: 10,
					all: 50
				},
				{
					pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1192669903,3228679607&fm=27&gp=0.jpg',
					title: '语文2',
					num: 10,
					all: 50
				}
			]
		}
	},
	mounted(){
		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 4,
			pagination: {
				el: '.swiper-pagination',
				type: 'fraction',
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
  

	},
	methods: {
		startTouch(index){
			this.cIndex = index
		},
		stopTouch(){
			this.cIndex = -1
		},
		setChoose(){
			this.$store.state.ApiService.showSec = 3
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
.bg1(@bg){
  background: url(@bg) no-repeat;
  background-size: auto 100%;
}
.slide{
	position: relative;
	width: 80%;
	margin: 0 auto;
}
.arrow{
	width: 1.12rem;
	height: 1.9rem;
	.bg('../../assets/arrow_a.png')
}
.swiper-container{
	padding: 1rem 0;
}
.swiper-button-prev{
	left: -2rem;
	transform: rotate(180deg);
}
.swiper-button-next{
	right: -2rem;
}
.swiper-button-disabled{
	.bg('../../assets/arrow.png')
}
@keyframes show{
	100%{ transform: translate(0, 0) scale(1); opacity: 1}
}
.swiper-slide{
	width: 4.21rem !important;
	height: 6.27rem;
	margin: 0 .5rem;
	opacity: 0;
	transform: translate(0, 10%);
	animation: show .8s .4s linear forwards;
	
	img{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: .3rem;
		box-shadow: 0 0 .2rem #333
	}
}
.num{
	position: absolute;
	bottom: -.05rem;
	left: 0;
	width: 100%;
	height: 1.62rem;
	.bg('../../assets/sec1_1.png');
	font-size: .58rem;
	font-weight: bold;
	color: #fff;
	text-align: center;
	box-sizing: border-box;
	padding-top: .16rem;
	opacity: 0;
	animation: show .8s 1s linear forwards;

	.all{
		color: #f2ac00
	}
}
.btn{
	position: absolute;
	bottom: -1.1rem;
	left: 50%;
	margin-left: -1.75rem;
	width: 3.5rem;
	height: 1.84rem;
	background: url('../../assets/sec1_2.png') no-repeat;
	background-size: 200% 300%;
	transform: translate(0, 20%);
	opacity: 0;
	animation: show .8s 1s linear forwards;

	&.type1{	//进入课程
		background-position: 100% 0;
	}
	&.touch{
		background-position-y: 50%;
		transform: scale(1.05)
	}
}
</style>

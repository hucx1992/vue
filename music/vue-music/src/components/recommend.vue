<template>
  <div id="recommend">
  	<div class="swiper-container" id="reco-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in focus">
          <a href="http://hucxweb.com">
        	   <img :src="item.pic" alt="">
          </a>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination c-pagebar"></div>
    </div>
    <h3 class='hotlist'>热门歌单</h3>
    <div class="hotdiss">
    	<div class="boxs" v-for="item in hotdiss">
    		<div class="pic">
    			<img v-lazy="item.imgurl" alt="">
    			<div class="num">{{item.listennum%10000==0?item.listennum/10000: (item.listennum%10000).toFixed(1)}}万</div>
    		</div>
    		<p class='p0'>{{item.dissname}}</p>
    		<p class='p1'>{{item.author}}</p>
    	</div>
    </div>
  </div>
</template>

<script>

import Hot from './hot';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';


export default {
  name: 'hot',
  data () {
    return {
    	id: 4,
    	focus : [],
    	hotdiss: [],
    	listBool: false
    }
  },
  mounted: function(){
  	this.id = Hot.id;
  	console.log('---------------------')
  	console.log(Hot)
  	console.log('---------------------')
  	this.axios(this.HOST+'/v8/fcg-bin/fcg_first_yqq.fcg',{
  		params: {
			format:'json',
			tpl:'v12',
			page:'other',
			rnd:0,
			g_tk:new Date().getTime(),
			loginUin:0,
			hostUin:0,
			inCharset:'utf8',
			outCharset:'GB2312',
			notice:0,
			platform:'yqq',
			needNewCode:0
  		}
  	}).then((res)=>{
  		let data = res.data.data;
  		this.focus = data.focus;
  		this.hotdiss = data.hotdiss.list
  	})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#reco-swiper{
	height: 150px;
	margin-bottom: 10px;
}
#reco-swiper .swiper-wrapper{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
}
#reco-swiper .swiper-wrapper img{
	width: 100%;
	height: 150px;
}
.hotlist{
	text-align: center;
	line-height: 50px;
	height: 50px;
	background: #fff;
	font-weight: normal;
	font-size: 16px;
}
.boxs{
	width: 50%;
	float: left;
}
.boxs .pic,.boxs .pic img{
	display: block;
	width: 100%;
}
.boxs .pic{
	position: relative;
	margin-bottom: 5px;
}
.boxs .pic .num{
	position: absolute;
	bottom: 5px;
	left: 10px;
	font-size: 12px;
	color: #fff;
}
.boxs p{
	font-size: 14px;
	line-height: 20px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding: 0 8px;
}
.p1{
	margin-bottom: 5px;
	color: #777;
}
</style>

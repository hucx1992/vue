<template>
  <div id='hot'>
  	<div class="box" v-for='item in hotList' @click="showHotDiss(item.id)">
  		<div class="pic">
  			<img :src="item.picUrl" alt="">
  			<span class="num">{{item.listenCount%10000 == 0 ? item.listenCount/10000 : (item.listenCount/10000).toFixed(1)}}万</span>
  		</div>
  		<div class="box-r">
  			<div class="t">{{item.topTitle}}</div>
  			<div :class="'r r'+index" v-for='(cItem,index) in item.songList'>
	  			{{index+1}} {{cItem.songname}} - <em>{{cItem.singername}}</em>
	  		</div>
  		</div>
  	</div>
  </div>
</template>

<script>

export default {
  name: 'hot',
  data () {
    return {
    	hotList: []
    }
  },
  mounted: function(){
  	this.axios(this.HOST+'/v8/fcg-bin/fcg_myqq_toplist.fcg',{
  		params: {
  			format: 'json',
	        g_tk: 5381,
	        uin: 0,
	        inCharset: 'utf-8',
	        outCharset: 'utf-8',
	        notice: 0,
	        platform: 'h5',
	        needNewCode: 1,
	        _: new Date().getTime()
  		}
  	}).then((res)=>{
  		let data = res.data.data.topList;
  		this.hotList = data;
  	});
  },
  methods: {
  	showHotDiss(id){
    	this.$parent.hotdissBool = true
		this.$store.commit('vodId', id)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
	display: flex;
	height: 100px;
	margin: 10px;
	background: #fff;
	border-radius: 8px;
	overflow: hidden;
	padding-right: 10px;
	box-shadow: 0 0 8px #ddd;
}
.box .pic{
	position: relative;
	width: 100px;
	height: 100%;
	margin-right: 10px;
}
.box .pic img{
	width: 100%;
}
.box .pic .num{
	position: absolute;
	bottom: 5px;
	left: 5px;
	color: #fff;
	font-size: 12px;
}
.box .t{
	font-size: 16px;
	margin: 6px 0;
}
.box .box-r{
    flex:1;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.box .r{
	font-size: 14px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.box .r em{
	color: #aaa;
}
</style>

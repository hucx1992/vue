<template>
	<div id= "hotdiss" @scroll="scrollFun()" :class="{'white': colorChoose}">
		<div class="return" :style="{'background-color':'rgba('+color.r+','+color.g+','+color.b+','+color.opacity+')','border-bottom':'1px solid rgba('+color.r+','+color.g+','+color.b+','+color.opacity+')'}">
			<span @click="returnHot">排行榜</span>
		</div>
		<div id="singer-header">
			<img v-lazy="data.topinfo.pic_album" alt="">
		</div>
		<div class="hot-msg" :style="{background: '-webkit-linear-gradient(top, rgba('+color.r+','+color.g+','+color.b+', 0), rgb('+color.r+','+color.g+','+color.b+') )'}">
			<h4>{{data.topinfo.ListName}}</h4>
			<p>{{data.topinfo.listennum%10000==0?data.topinfo.listennum/10000:(data.topinfo.listennum/10000).toFixed(1)}}万</p>
		</div>
		<div class="list" :style="{ background:'rgba('+color.r+','+color.g+','+color.b+', 1)'}">
			<div class="row" v-for="(item, index) in data.songlist" @click="played(item.data, index)">
				<div class="msg">
					<i>{{index+1}}</i>
					<h4>{{item.data.songorig}}</h4>
					<p>{{item.data.singer[0].name}} - {{item.data.albumname}}</p>
					<div class="detail"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
  name: 'hotdiss',
  data () {
    return {
    	colorChoose: false,
    	id: 4,
    	color: {r:255,g:255,b:255,opacity:0},
      	data: {
      		songlist:[],
      		topinfo:{
      			pic_album: '',
      			ListName: '',
      			listennum: 0
      		}
      	}
    }
  },
  mounted: function(){
	this.id = this.$store.vodId
  	this.axios(`${this.HOST}v8/fcg-bin/fcg_v8_toplist_cp.fcg`,{
  		params: {
			g_tk: 5381,
			uin: 0,
			format: 'json',
			inCharset: 'utf-8',
			outCharset: 'utf-8',
			notice: 0,
			platform: 'h5',
			needNewCode: 1,
			tpl: 3,
			page: 'detail',
			type: 'top',
			topid: this.id,
			_: new Date().getTime()
  		}
  	}).then((res)=>{
  		let data = res.data;
  		this.data = data;
  		let fixed = '00000' + data.color.toString(16)
        let color = '#' + fixed.substr(fixed.length - 6)
        let r = parseInt(color.slice(1,3), 16);
        let g = parseInt(color.slice(3,5), 16);
        let b = parseInt(color.slice(5,7), 16);
  		this.color.r = r;
  		this.color.g = g;
  		this.color.b = b;
  		if(data.date&&data.color<5000000){
  			this.colorChoose = true;
  		}

  		this.data.songlist = data.songlist
  	})
  	let that = this;
  },
  methods: {
  	played(data, index){
  		let url = `https://dl.stream.qqmusic.qq.com/C100${data.songmid}.m4a?fromtag=46`;
  		this.$parent.$children[0].playMsg.url = url;
		this.$parent.$children[0].playMsg.pic = `https://y.gtimg.cn/music/photo_new/T002R500x500M000${data.albummid}.jpg`
		this.$parent.$children[0].playMsg.singer = data.singer[0].name
		this.$parent.$children[0].playMsg.name = data.songorig
		this.$parent.$children[0].playBool = true

		let msg = {
			name: data.songorig,
			pic: `https://y.gtimg.cn/music/photo_new/T002R500x500M000${data.albummid}.jpg`,
			singer: data.singer[0].name,
			url: url
		}
		console.log(this.data.songlist)
		this.$store.commit('playIndex', index)
		this.$store.commit('setPlay', msg)
		this.$store.commit('setPlayList',this.data.songlist)
  	},
  	returnHot(){
  		this.$parent.hotdissBool = false
  	},
	scrollFun: function(){
		let that = this;
		if (document.getElementById('singer-header')) {
			that.color.opacity = document.getElementById('hotdiss').scrollTop / document.getElementById('singer-header').offsetHeight
		} else {
			that.color.opacity = 0
		}
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.white{
	color: #fff;
}
#hotdiss{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #fff;
	z-index: 4;
	overflow-y: auto;
}
#singer-header{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
}
.white .return{
	background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsNCkBmb250LWZhY2UgeyBmb250LWZhbWlseTogaWZvbnQ7IHNyYzogdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS5lb3Q/I2llZml4IikgZm9ybWF0KCJlbWJlZGRlZC1vcGVudHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LndvZmYiKSBmb3JtYXQoIndvZmYiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS50dGYiKSBmb3JtYXQoInRydWV0eXBlIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuc3ZnI2lmb250IikgZm9ybWF0KCJzdmciKTsgfQ0KDQpdXT48L3N0eWxlPjwvZGVmcz48ZyBjbGFzcz0idHJhbnNmb3JtLWdyb3VwIj48ZyB0cmFuc2Zvcm09InNjYWxlKDAuMTk1MzEyNSwgMC4xOTUzMTI1KSI+PHBhdGggZD0iTTMyMCA1MTIgMzgwLjYzMTA0IDU3NS42MDA2NCAzODAuNjMxMDQgNTc1LjU5OTYxNiA2NDMuMzY4OTYgODUxLjIgNzA0IDc4Ny42MDAzODQgNDQxLjI2MzEwNCA1MTIgNzA0IDIzNi40MDA2NCA2NDMuMzY4OTYgMTcyLjggMzgwLjYzMTA0IDQ0OC40MDAzODQgMzgwLjYzMTA0IDQ0OC40MDAzODRaIiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4NCg==) 10px center no-repeat;
	background-size: 26px;
}
.return{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	font-size: 18px;
	line-height: 50px;
	z-index: 3;
	padding-left: 40px;
	background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsNCkBmb250LWZhY2UgeyBmb250LWZhbWlseTogaWZvbnQ7IHNyYzogdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS5lb3Q/I2llZml4IikgZm9ybWF0KCJlbWJlZGRlZC1vcGVudHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LndvZmYiKSBmb3JtYXQoIndvZmYiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS50dGYiKSBmb3JtYXQoInRydWV0eXBlIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuc3ZnI2lmb250IikgZm9ybWF0KCJzdmciKTsgfQ0KDQpdXT48L3N0eWxlPjwvZGVmcz48ZyBjbGFzcz0idHJhbnNmb3JtLWdyb3VwIj48ZyB0cmFuc2Zvcm09InNjYWxlKDAuMTk1MzEyNSwgMC4xOTUzMTI1KSI+PHBhdGggZD0iTTMyMCA1MTIgMzgwLjYzMTA0IDU3NS42MDA2NCAzODAuNjMxMDQgNTc1LjU5OTYxNiA2NDMuMzY4OTYgODUxLjIgNzA0IDc4Ny42MDAzODQgNDQxLjI2MzEwNCA1MTIgNzA0IDIzNi40MDA2NCA2NDMuMzY4OTYgMTcyLjggMzgwLjYzMTA0IDQ0OC40MDAzODQgMzgwLjYzMTA0IDQ0OC40MDAzODRaIiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4=) 10px center no-repeat;
	background-size: 26px;
}
#singer-header img{
	width: 100%;
}
.hot-msg{
	position: absolute;
	top: 250px;
	left: 0;
	width: 100%;
	height: 125px;
	padding: 15px;
	padding-top: 40px;
}
.hot-msg h4{
	font-size: 30px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-bottom: 5px;
}
.list {
	position: relative;
	margin-top: 375px;
	width: 100%;
	padding-bottom: 60px;
}
.list .msg{
	position: relative;
	padding-left: 50px;
}
.list .msg i{
	position: absolute;
	top: 0;
	left: 0;
	width: 50px;
	text-align: center;
	line-height: 50px;
}
.list .msg h4{
	line-height: 30px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.list .msg p{
	color: #666;
	font-size: 14px;
	line-height: 20px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.list .detail{
	position: absolute;
	top: 0;
	right: 0;
	width: 50px;
	height: 50px;
	background: url(../assets/icon-...black.png) center no-repeat;
	background-size: 20px;
}
</style>



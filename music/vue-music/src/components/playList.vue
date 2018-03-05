<!-- 音乐播放列表 -->
<template>
	<div id="playList">
		<div class="t">
			<div class="t-l" :class="'t'+playState">
				<i @click="setPlayState"></i>
				<span></span>
				{{playList.length}}首歌曲
			</div>
			<span class='finish' @click="hideList()">完成</span>
		</div>
		<div class="list">
			<div class="row" :class="{'cur': indexs==index}" v-for="(item, index) in playList" @click="playVod(item,index)">
				<div class='row-l'>
					<em>{{item.cur_count?item.data.songorig : item.name}}-<i>{{item.cur_count?item.data.singer[0].name : item.singer}}</i></em>
				</div>
				<span class='oper' @click.stop="operation(index)"></span>
			</div>
		</div>
		<div class="oper-box" v-show="showOperBox" @click="hideOperBox"></div>
		<div class="box-ctx" :class="{'slideCtx': showOperBox}">
			<div class="msg">
				<h3>{{songs.name}}</h3>
				<p>{{songs.singer}}</p>
			</div>
			<div v-if="playNextBtn" class="delete" @click="deleteRow(deleteIndex),playNext()">删除</div>
			<div v-else class="delete" @click="deleteRow(deleteIndex)">删除</div>
			<div class="close" @click="hideOperBox">取消</div>
		</div>
	</div>
</template>

<script>
import {mapGetters,mapState,mapMutations} from "vuex";

export default {
  name: 'playList',
  data () {
    return {
    	playList: [],
    	playState: 0,
    	showOperBox: false,
    	playNextBtn: false,
    }
  },
  mounted: function(){
  	this.playList = this.$store.state.PlayService.playList;
  },
  computed:{
  	...mapGetters(['indexs','songs','deleteIndex']),
  	...mapState({
  		indexs: state=>{
  			return state.PlayService.index
  		},
  		songs: state=>{
  			let delIndex = state.PlayService.index;
  			let songs = state.PlayService.playList;
  			let msg = {};
  			if(songs.length <= 0){
  				return msg = {
  					name: '',
  					singer: '',
  				}
  			}
  			if(songs[delIndex].data){
  				msg = {
  					name: songs[delIndex].data.songorig,
  					singer: songs[delIndex].data.singer[0].name,
  				};
  			} else {
  				msg = {
  					name: songs[delIndex].name,
  					singer: songs[delIndex].singer,
  				};
  			}
  			return msg;
  		},
  		deleteIndex: state=>{
  			return state.PlayService.deleteIndex
  		}
  	})
  },
  methods:{
  	...mapMutations([
  		'playNext'
	]),
  	hideList(){
  		this.$parent.showList = false;
  	},
  	playVod(item,index){
  		let song = {};
  		if(item.cur_count){
	  		song = {
	  			name: item.data.songorig,
	  			pic: "https://y.gtimg.cn/music/photo_new/T002R500x500M000"+item.data.albummid+".jpg",
	  			singer: item.data.singer[0].name,
	  			url: "https://dl.stream.qqmusic.qq.com/C100"+item.data.songmid+".m4a?fromtag=46",
	  		}
  		}else {
	  		song = {
	  			name: item.name,
	  			pic: "https://y.gtimg.cn/music/photo_new/T002R500x500M000"+item.albummid+".jpg",
	  			singer: item.singer,
	  			url: "https://dl.stream.qqmusic.qq.com/C100"+item.mid+".m4a?fromtag=46",
	  		}
  		}
  		this.$parent.$parent.$children[0].playMsg.url = song.url;
  		this.$parent.songMsg = song;
		this.$store.commit('setPlay', song)
		this.$store.commit('playIndex', index)
		this.$store.commit('setPlaying', true)
  	},
  	setPlayState(){
  		let type = (this.playState+1)>2? 0 : this.playState+1;
  		this.playState = type;
  		this.$store.commit('setPlayState', type)
  	},
  	operation(index){
  		if(index == this.$store.state.PlayService.index){
  			this.playNextBtn = true
  		}else{
  			this.playNextBtn = false
  		}
  		this.$store.commit('setDeleteIndex', index)
  		this.showOperBox = true;
  	},
  	hideOperBox(){
  		this.showOperBox = false;
  	},
  	deleteRow(index){
  		let list = this.$store.state.PlayService.playList;
  		let sIndex = this.$store.state.PlayService.index;
  		list.splice(index,1);
  		this.showOperBox = false;
  		if(this.playNextBtn){
  			this.$store.commit('playIndex', sIndex-1)
  		}else if(index < sIndex){
  			this.$store.commit('playIndex', sIndex-1)
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.showPlay-enter{
  transform: translateY(100%);
  opacity: 0;
}
.showPlay-leave-to{
  transform: translateY(100%);
  transition: all .5s;
  opacity: 0;
}
.showPlay-enter-active{
  transition: all .5s;
}
.showPlay-leave-active {
  position: absolute;
  width: 100%;
}
.showPlay-move{
  transition: all .5s;
}

#playList{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #fff;
}
.t{
	height: 50px;
	border-bottom: 1px solid #ccc;
	line-height: 50px;
}
.t span.finish{
	float: right;
	padding: 0 20px;
}
.t-l{
	float: left;
	margin-left: 20px;
}
.t-l i{
	display: inline-block;
	width: 25px;
	height: 50px;
	vertical-align: top;
}
.t-l.t0 span:before{
	content: '顺序播放';
}
.t-l.t0 i{
	background: url(../assets/icon-SEQUENTIAL.png) center no-repeat;
	background-size: 100%;
}
.t-l.t1 span:before{
	content: '随机播放';
}
.t-l.t1 i{
	background: url(../assets/icon-RANDOM.png) center no-repeat;
	background-size: 100%;
}
.t-l.t2 span:before{
	content: '单曲循环';
}
.t-l.t2 i{
	position: relative;
	width: 22px;
	height: 31px;
	margin-top: 10px;
	margin-right: 3px;
	background: url(../assets/icon-SEQUENTIAL.png) center no-repeat;
	background-size: 100% 100%;
}
.t-l.t2 i:before{
	position: absolute;
	top: 3px;
	right: -5px;
	width: 15px;
	height: 15px;
	line-height: 15px;
	text-align: center;
	border-radius: 50%;
	font-size: 12px;
	content: '1';
	background: #000;
	color: #fff;
}
.list{
	position: absolute;
	top: 50px;
	left: 0;
	bottom: 0;
	width: 100%;
	overflow-y: auto;
}
.list .row{
	height: 45px;
	line-height: 45px;
	margin: 0 5px;
	padding: 0 10px;
	border-bottom: 1px solid #ddd;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.list .row .row-l{
	position: relative;
	float: left;
	max-width: 280px;
}
.list .row em{
	display: block;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.list .row i{
	position: relative;
	font-size: 14px;
	color: #8f8f8f;
	max-width: 100px;
}
.list .row .oper{
	float: right;
	width: 40px;
	height: 45px;
	background: url(../assets/icon-...black.png) center right no-repeat;
	background-size: 50%;
}
.list .row.cur{
	border-left: 5px solid #ff9900;
}
.list .row.cur .row-l:after{
	position: absolute;
	content: '';
	right: -20px;
	top: 0;
	width: 15px;
	height: 100%;
	background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsNCkBmb250LWZhY2UgeyBmb250LWZhbWlseTogaWZvbnQ7IHNyYzogdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS5lb3Q/I2llZml4IikgZm9ybWF0KCJlbWJlZGRlZC1vcGVudHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LndvZmYiKSBmb3JtYXQoIndvZmYiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS50dGYiKSBmb3JtYXQoInRydWV0eXBlIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuc3ZnI2lmb250IikgZm9ybWF0KCJzdmciKTsgfQ0KDQpdXT48L3N0eWxlPjwvZGVmcz48ZyBjbGFzcz0idHJhbnNmb3JtLWdyb3VwIj48ZyB0cmFuc2Zvcm09InNjYWxlKDAuMTk1MzEyNSwgMC4xOTUzMTI1KSI+PHBhdGggZD0iTTEwMTcuNiAxNjYuNGMwLTI1LjYtMTkuMi00NC44LTQ0LjgtNDQuOC0yNS42IDAtNDQuOCAxOS4yLTQ0LjggNDQuOGwwIDBMOTI4IDEwMjRsODkuNiAwTDEwMTcuNiAxNjYuNCAxMDE3LjYgMTY2LjQgMTAxNy42IDE2Ni40ek01MS4yIDQyOC44QzI1LjYgNDI4LjggNi40IDQ0OCA2LjQgNDczLjZsMCAwTDYuNCAxMDI0bDg5LjYgMEw5NiA0NzMuNmwwIDBDOTYgNDQ4IDc2LjggNDI4LjggNTEuMiA0MjguOEw1MS4yIDQyOC44ek0zNTguNCAwQzMzMi44IDAgMzEzLjYgMTkuMiAzMTMuNiA0NC44bDAgMEwzMTMuNiAxMDI0bDg5LjYgMEw0MDMuMiA0NC44bDAgMEM0MDMuMiAxOS4yIDM4NCAwIDM1OC40IDBMMzU4LjQgMHpNNjY1LjYgMjc1LjJDNjQwIDI3NS4yIDYyMC44IDI5NC40IDYyMC44IDMyMGwwIDAgMCA3MDQgODkuNiAwTDcxMC40IDMyMGwwIDBDNzEwLjQgMjk0LjQgNjkxLjIgMjc1LjIgNjY1LjYgMjc1LjJMNjY1LjYgMjc1LjJ6TTY2NS42IDI3NS4yIiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4=) right center no-repeat;
	background-size: 100%;
}
.oper-box{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.6);
	transition: all 1s;
}
.box-ctx{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background: #fff;
	text-align: center;
	transform: translate(0,100%);
	transition: all .3s;
}
.box-ctx.slideCtx{
	transform: translate(0,0);
}
.box-ctx .msg{
	padding: 8px;
	border-bottom: 1px solid #eee;
}
.box-ctx .msg h3{
	font-weight: normal;
}
.box-ctx .msg p{
	font-size: 14px;
	color: #8f8f8f;
}
.box-ctx .delete{
	box-sizing: initial;
	line-height: 45px;
	height: 45px;
	border-bottom: 8px solid #eee;
	font-size: 18px;
}
.box-ctx .close{
	line-height: 45px;
	height: 45px;
	font-size: 18px;
}
</style>

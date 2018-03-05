<template>
	<div id="search">
		<div class="t">
			<div class="search" :class="{'showSearchBox': showSearchBox}">
				<form @submit.prevent="search(key)">
					<input type="text" placeholder="搜索 歌曲/专辑/歌手" name="" @click="showSearchBoxFn()" v-model="key">
				</form>
				<span class='closeSea' @click="closeSeaFn">取消</span>
			</div>
		</div>
		<div class="b">
			<div class="sea-history" v-if='showHis && !showSeaRlt'>
				<span @click='btnSea(data)' v-for="data in seaHistory">{{data}}</span>
			</div>
			<div class="sea-rlt " v-if='showSeaRlt && song.length>0'>
				<h3>单曲</h3>
				<div class="box danqu" v-for="(data, index) in song" @click='played(data, index)'>
					<span>{{data.name}}<i class='s'> - {{data.singer}}</i></span>
					<div class="action-button">
						<img src="../assets/icon-...black.png">
					</div>
				</div>
			</div>
			<div class="sea-rlt " v-if='showSeaRlt && album.length>0'>
				<h3>专辑</h3>
				<div class="box album" v-for="data in album">
					<img class='pic' :src="data.pic">
					<div class="album-msg">
						<p>{{data.name}}</p>
						<p class="s">{{data.singer}}</p>
					</div>
				</div>
			</div>
			<div class="sea-rlt " v-if='showSeaRlt && singer.length>0'>
				<h3>歌手</h3>
				<div class="box singer" v-for="data in singer">
					<img class='tx' :src="data.pic">
					<p>{{data.singer}}</p>
				</div>
			</div>
			<div class="sea-rlt " v-if='showSeaRlt && mv.length>0'>
				<h3>MV</h3>
				<div class="box mv" v-for="data in mv">
					<p>{{data.name}}</p>
					<p class='s'>{{data.singer}}</p>
				</div>
			</div>
		</div>
		<div class="footer">
			<audio @timeupdate="updateTime" id='music' :src='songs.url' autoplay='autoplay'></audio>
			<img :src="songs.pic" @click="showPlay">
			<p @click="showPlay">{{songs.name}} - <i class='s1'>{{songs.singer}}</i></p>
			<div class="play-btn pause" v-if="playBool && songs.url" @click="pausing"></div>
			<div class="play-btn " v-else-if="!songs.url" @click="noMusics"></div>
			<div class="play-btn" v-else @click="playing"></div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">

import {mapMutations, mapState, mapGetters} from 'vuex'

export default {
	data (){
		return {
			playMsg: {
				url: '',
				pic: require('../assets/Vue_Music_Blur.png'),
				singer: '',
				name: ''
			},
			key: '',	//搜索框文案
			showSeaRlt: false, 	// 搜索结果
			showSearchBox: false,	//显示搜索
			showHis: false,		//显示历史搜索
			seaHistory: [],
			album: [],
			mv: [],
			song: [],
			singer: [],
			playBool: false,
			songList: []
		}
	},
	mounted(){
		let that = this;
		document.getElementById('music').addEventListener("timeupdate",function(){
		    if (document.getElementById('music').paused) {
			    that.playBool = false
			} else {
			    that.playBool = true
			    // 播放中
			}
	  	});
	},
    computed: {
      ...mapGetters([
        'songs'
      ]),
      ...mapState({
        songs: state => {
        	let songs = state.PlayService.song;
			return songs
        }
      })
    },
	methods: {
		showSearchBoxFn(){
			this.showSearchBox = true;
			this.showHis = true;
			this.$parent.showMenu = false
		},
		updateTime(){
			this.$store.commit('upTime', document.getElementById('music'))
		},
		closeSeaFn(){
			this.showSearchBox = false;
			this.showSeaRlt = false;
			this.showHis = false;
			this.key = '';
			this.$parent.showMenu = true
		},
		showPlay(){
			if(this.songs.url){
				this.$parent.playPageShow = true;
			} else {
				this.noMusics();
			}
		},
		noMusics(){
			this.$parent.showAlert = true;
			this.$parent.alertBox.noMusic = true;
			setTimeout(()=>{
				this.$parent.showAlert = false;
				this.$parent.alertBox.noMusic = false;
			}, 2000)
		},
	    playing(event) {
			event.preventDefault()
			document.getElementById('music').play();
			this.playBool = true;
			this.$store.commit('setPlaying', true)
	    },
	    pausing(event) {
			event.preventDefault()
			document.getElementById('music').pause();
			this.playBool = false;
			this.$store.commit('setPlaying', false)
	    },
		btnSea(key){
			this.key = key;
			this.search(this.key);
		},
		played(data, index){
			this.$store.commit('setPlayList', this.song)
			this.$store.commit('playIndex', index)

			let songMsg = {
				url: `https://dl.stream.qqmusic.qq.com/C100${data.mid}.m4a?fromtag=46`,
				singer: data.singer,
				pic: `https://y.gtimg.cn/music/photo_new/T002R500x500M000${data.albummid}.jpg`,
				name: data.name
			}
			this.$store.commit('setPlay', songMsg)
			this.playMsg.url = this.$store.state.PlayService.song.url
			this.playMsg.pic = this.$store.state.PlayService.song.pic
			this.playMsg.singer = this.$store.state.PlayService.song.singer
			this.playMsg.name = this.$store.state.PlayService.song.name
			this.playBool = true
			document.getElementById('music').play();
		},
		search(key){
			console.log(this.HOST)
			let url = `${this.HOST}/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&format=jsonp&key=${this.key}&g_tk=5381&loginUin=0&hostUin=0&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&jsonpCallbac=`;

			this.axios(url).then((res)=>{
				let data = res.data.data;
				let song = data.song?data.song.itemlist:[];
				let singer = data.singer?data.singer.itemlist:[];
				let mv = data.mv?data.mv.itemlist:[];
				let album = data.album?data.album.itemlist:[];
				this.song = song
				this.album = album
				this.singer = singer
				this.mv = mv
				this.showSeaRlt = true;
				this.showHis = false;

				this.seaHistory.unshift(key);

				this.seaHistory = [...new Set(this.seaHistory)];

			}).catch((err)=>{
				console.log(err)
			})
		}
	}
}
</script>
<style type="text/css" >
#search .t{
	position: relative;
	overflow: hidden;

}
#search{
	background: #fff;
}
.search{
	height: 40px;
	margin: 10px;
	transition: all .3s;
}
.search input{
	display: block;
	width: 100%;
	height: 100%;
	border: 0 none;
	background: url(../assets/icon-search.png) 5px center  no-repeat #eee;
	background-size: 30px 30px;
	border-radius: 5px;
	padding: 10px 10px 10px 40px;
  	font-size: 16px;
}
.showSearchBox{
	position: relative;
	margin-right: 60px;
}
.closeSea{
	position: absolute;
	top: 0;
	right: -60px;
	width: 60px;
	text-align: center;
	line-height: 40px;
}
.sea-history{
	max-height: 66px;
	overflow: hidden;
	display: flex;
	flex-wrap: wrap;
	padding: 0 10px;
}
.sea-history span{
	display: block;
	padding: 0 10px;
	border-radius: 10px;
	border: 1px solid #000;
	margin: 5px;
}
.sea-rlt .box span i{
	font-size: 14px;
}
.sea-rlt .box{
	line-height: 40px;
	margin: 0 10px;
	padding: 0 10px;
}
.sea-rlt .box{
	border-bottom: 1px solid #eee;
}
.sea-rlt .box span{
	max-width: 250px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.action-button{
	float: right;
	padding: 10px 0 10px 10px;
	width: 30px;
	height: 40px;
}
.action-button img{
	width: 20px;
	height: 20px;
	vertical-align: top;
}
.box .pic{
	float: left;
	width: 40px;
	height: 40px;
	border-radius: 5px;
	margin: 0 20px 0 0;
}
.box.album{
	font-size: 14px;
	line-height: 21px;
	margin: 0 10px;
	padding: 10px;
}
.box.album p{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.box .s{
	font-size: 12px;
	color: #aaa;
	font-style: normal;
}
.box.singer .tx{
	float: left;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin-right: 20px;
}
.box.singer{
	padding: 10px;
}
.box.singer p{
	font-size: 16px;
}
.sea-rlt h3{
	height: 40px;
	line-height: 40px;
	padding: 0 10px 0 35px;
	border-left: 6px solid #ddd;
	font-size: 18px;
}
.sea-rlt:nth-child(1) h3{
	background: url(../assets/icon-music.png) 6px center no-repeat #eee;
	background-size: 25px 25px;
}
.sea-rlt:nth-child(2) h3{
	background: url(../assets/icon-album.png) 6px center no-repeat #eee;
	background-size: 25px 25px;
}
.sea-rlt:nth-child(3) h3{
	background: url(../assets/icon-singer.png) 6px center no-repeat #eee;
	background-size: 25px 25px;
}
.sea-rlt:nth-child(4) h3{
	background: url(../assets/icon-mv.png) 6px center no-repeat #eee;
	background-size: 25px 25px;
}
.box.mv{
	line-height: 21px;
	padding: 10px;
}

.footer{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background: #f3f3f3;
	padding: 5px 0;
	align-items: center;
	display: flex;
	z-index: 9;
}
.footer img{
	width: 40px;
	height: 40px;
	border-radius: 5px;
	margin-right: 20px;
	margin-left: 10px;
	background: url(../assets/Vue_Music_Blur.png) no-repeat;
	background-size: 100% 100%;
	border: 0 none;
}
.footer p{
	flex-grow: 1;
}
.footer .play-btn{
	width: 20px;
	height: 20px;
	background: url(../assets/icon-play.png) center no-repeat;
	background-size: 20px 20px;
	margin-right: 15px;
	padding: 20px;
}
.s1{
	font-size: 14px;
	color: #aaa;
	font-style: normal;
}

.footer .play-btn.pause{
	background: url(../assets/icon-pause.png) center no-repeat;
	background-size: 20px 20px;
}

.alert{
	display: none;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 99;
}
.alert .box{
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
	width: 250px;
	height: 36px;
	line-height: 24px;
	text-align: center;
	background: #eee;
	padding: 6px 10px;
	border-radius: 6px;
	color: #333;
	opacity: 0;
}
.alert.showAlert{
	display: block;
}
.alert.showAlert .show{
	opacity: 1;
}
</style>
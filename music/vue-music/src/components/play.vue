<!-- 音乐详细播放页面 -->
<template>
  	<div id="play">
  		<div class="return" @click="hidePlay"></div>
		<img :src="songs.pic" alt="" class="pic">
		<div class="lyr-b">
			<img :src="songs.pic" alt="" class="bg">
			<div class="progress">
				<div class="line">
					<span :style="{width:cur.bt+'%'}">
						<i></i>
					</span>
				</div>
				<div class="time">
					<div class="r">{{duration}}</div>
					<div class="l">{{cur.curTime}}</div>
				</div>
			</div>
			<div class="text">
				<div class="t">{{songs.name}}</div>
				<div class="singer">{{songs.singer}}</div>
				
				<transition-group name="list" tag="ul">
				    <div class="words " v-for="item in list"  :key="item">
				        {{item}}
				    </div>
				</transition-group>
			</div>
			<div class="f-row">
				<div class="icon"></div>
				<div class="icon" @click="playPrev()"></div>
				<div v-if="playing" class="icon played" @click="stopPlayed()"></div>
				<div v-else class="icon"  @click="startPlayed()"></div>
				<div class="icon" @click="playNext()"></div>
				<div class="icon" @click="showVodList"></div>
			</div>
		</div>

	    <transition name="showList">
			<playList v-if="showList"></playList>
	    </transition>
  	</div>
</template>

<script>
import PlayList from "./playList";

import {mapMutations, mapState, mapGetters} from 'vuex'
export default {
  	data () {
		return {
			showList: false,
			list: ['未搜索到歌词'],
		}
	},
	mounted(){
		const ad = document.getElementById('music');
		const that = this;
	},
    computed: {
      ...mapGetters([
        'cur', 'duration', 'songs', 'playing'
      ]),
      ...mapState({
        cur: state => {
        	let currentTime = state.PlayService.currentTime;
        	let bt = currentTime / state.PlayService.duration * 100;
        	let m = parseInt(currentTime/60)<10?'0'+parseInt(currentTime/60):parseInt(currentTime/60);
        	let s = currentTime%60<10?'0'+currentTime%60:currentTime%60;

        	let cur = {
        		curTime: m+":"+s,
        		bt: bt
        	}
        	return cur
        },
        duration: state => {
        	let duration = state.PlayService.duration;
        	let m = parseInt(duration/60)<10?'0'+parseInt(duration/60): parseInt(duration/60);
        	let s = duration%60<10?'0'+duration%60:duration%60;
        	m = isNaN(m)?'00':m
        	s = isNaN(s)?'00':s
        	return m+":"+s
        },
        songs: state => {
        	let songs = state.PlayService.song;
			return songs
        },
        playing: state => {
        	return state.PlayService.playing
        }
      })
    },
    components:{
    	PlayList
    },
	methods: {
		...mapMutations([
			'playPrev', 'playNext'
		]),
		hidePlay(){
			this.$parent.playPageShow = false
		},
		stopPlayed(){
			document.getElementById('music').pause();
			this.$store.commit('setPlaying', false);
		},
		startPlayed(){
			document.getElementById('music').play();
			this.$store.commit('setPlaying', true);
		},
		showVodList(){
			this.showList = true
		}
	}
}
</script>

<style type="text/css">
#play .return{
	position: absolute;
	top: 20px;
	left: 20px;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	background: url(../assets/icon-jiantou.png) center no-repeat #fff;
	background-size: 20px;
}
.list-words {
  transition: all 1s;
}
.list-enter{
  transform: translateY(100%);
  opacity: 0;
}
.list-leave-to{
  transform: translateY(-100%);
  transition: all 1s;
  opacity: 0;
}
.list-enter-active{
  transition: all 1s;
}
.list-leave-active {
  position: absolute;
  width: 100%;
}
.list-move{
  transition: all 1s;
}



.showList-enter{
  transform: translateX(100%);
  opacity: 0;
}
.showList-leave-to{
  transform: translateX(100%);
  transition: all .5s;
  opacity: 0;
}
.showList-enter-active{
  transition: all .5s;
}
.showList-leave-active {
  position: absolute;
  width: 100%;
}
.showList-move{
  transition: all .5s;
}




#play{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 99;
	background: #fff;
}
.pic{
	display: block;
	width: 100%;
}
.progress .line{
	display: block;
	position: relative;
	padding-right: 2px;
	height: 5px;
	background: #ccc;
}
.progress .line span{
	display: block;
	width: 0%;
	height: 5px;
	background: #7f7f7f;
}
.progress .line i{
	float: right;
	width: 2px;
	height: 8px;
	background: #f00;
}
.progress .time{
	margin-top: 10px;
	font-size: 12px;
}
.progress .time .l{
	margin-left: 10px;
}
.progress .time .r{
	float: right;
	margin-right: 10px;
	overflow: hidden;
}
.text {
	height: 200px;
	overflow: hidden;
}
.text .t{
	text-align: center;
	font-weight: bold;
	font-size: 20px;
}
.text .singer{
	text-align: center;
	color: #aaa;
	font-size: 14px;
	margin-bottom: 20px;
}
.text .words{
	text-align: center;
	margin-bottom: 15px;
}
.f-row{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
}
.f-row .icon{
	float: left;
	width: 20%;
	height: 100%;
}
.f-row .icon:nth-child(1){
	background: url(../assets/icon-like.png) center no-repeat;
	background-size: 30px;
}
.f-row .icon:nth-child(2){
	background: url(../assets/icon-shangyiqu.png) center no-repeat;
	background-size: 30px;
}
.f-row .icon:nth-child(3){
	background: url(../assets/icon-play.png) center no-repeat;
	background-size: 30px;
}
.f-row .icon:nth-child(4){
	background: url(../assets/icon-xiayiqu.png) center no-repeat;
	background-size: 30px;
}
.f-row .icon:nth-child(5){
	background: url(../assets/icon-list.png) center no-repeat;
	background-size: 30px;
}
.f-row .icon:nth-child(3).played{
	background: url(../assets/icon-pause.png) center no-repeat;
	background-size: 30px;
}
.lyr-b{
	position: absolute;
	top: 375px;
	left: 0;
	bottom: 0;
	width: 100%;
	background: hsla(0,0%,100%,.76);
}
.lyr-b .bg{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	width: 100%;
	z-index: -1;
	filter: blur(30px);
}
</style>

/**
 * Created by sioxa on 2016/12/25 0025.
 */
export default {
	state: {
		vodId: 4,
	    playing: true,
	    currentTime: 0,
	    duration: 0,
	    playState: 0,
	    index: 0,
	    deleteIndex: 0,
	    song: {
	      name: 'www.hucxweb.com',
	      pic: 'http://sioxas.github.io/apple-touch-icon.png',
	      singer: '个人网站'
	    },
	    playList: [],
	    noMore:{
	    	prevBool: true,
	    	nextBool: true
	    }
	},
	mutations: {
		setDeleteIndex(state, plays){
			state.deleteIndex = plays
		},
		setPlaying(state, plays){
			state.playing = plays;
		},
		setPlayState(state, plays) {
			state.playState = plays;
		},
		setPlay(state, plays) {
			state.song = plays;
			let ad = document.getElementById('music');
			let that = this;
			
			ad.addEventListener('ended', function(){
				that.commit('playNext')
			})
	    },
		setPlayList(state, plays) {
			state.playList = plays;
	    },
	    playIndex(state, plays) {
	    	state.index = plays
	    },
	    upTime(state, plays) {
	    	state.currentTime = parseInt(plays.currentTime);
	    	state.duration = parseInt(plays.duration);
	    	state.song.name = state.song.name;
	    	state.song.pic = state.song.pic;

	    },
	    vodId(state,plays) {
	    	this.vodId = plays;
	    },
	    playNext(state) {
			if(state.playList == 0){
				return
			}
			state.index = (state.index + 1);
			if(state.index>(state.playList.length-1)){
				state.index = 0
			}else{
	    		state.playing = true;
			}
	    	let songs, songsMsg ={};
	    	if(state.playList[state.index].cur_count){
		    	songs = state.playList[state.index].data;
		    	songsMsg = {
		    		name: songs.songorig,
		    		singer: songs.singer[0].name,
	  				pic: "https://y.gtimg.cn/music/photo_new/T002R500x500M000"+songs.albummid+".jpg",
	  				url: "https://dl.stream.qqmusic.qq.com/C100"+songs.songmid+".m4a?fromtag=46",
		    	}
	    	}else{
	    		songs = state.playList[state.index];
		    	songsMsg = {
		    		name: songs.name,
		    		singer: songs.singer,
	  				pic: "https://y.gtimg.cn/music/photo_new/T002R500x500M000"+songs.albummid+".jpg",
	  				url: "https://dl.stream.qqmusic.qq.com/C100"+songs.mid+".m4a?fromtag=46",
		    	}
	    	}
			state.song = songsMsg
	    },
	    playPrev(state) {
			if(state.playList == 0){
				return
			}
			state.index = (state.index - 1);
			if(state.index<0){
				state.index = state.playList.length-1;
			}else {
	    		state.playing = true;
			}
			let songs, songsMsg ={};

	    	if(state.playList[state.index].cur_count){
		    	songs = state.playList[state.index].data;
		    	songsMsg = {
		    		name: songs.songorig,
		    		singer: songs.singer[0].name,
	  				pic: "https://y.gtimg.cn/music/photo_new/T002R500x500M000"+songs.albummid+".jpg",
	  				url: "https://dl.stream.qqmusic.qq.com/C100"+songs.songmid+".m4a?fromtag=46",
		    	}
	    	}else{
		    	songs = state.playList[state.index];
		    	songsMsg = {
		    		name: songs.name,
		    		singer: songs.singer,
	  				pic: "https://y.gtimg.cn/music/photo_new/T002R500x500M000"+songs.albummid+".jpg",
	  				url: "https://dl.stream.qqmusic.qq.com/C100"+songs.mid+".m4a?fromtag=46",
		    	}
	    	}
			state.song = songsMsg
	    }
	}
}

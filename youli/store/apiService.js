/**
 * Created by sioxa on 2016/12/25 0025.
 */
export default {
	state: {
		showSec: 6,
		teamNum: '',
	},
	actions:{
		toSetPlayPage(state, mid){
			console.log('设置播放')
			this.commit('setPlayPage')
		}
	},
	mutations: {
		setPlayPage(state, bool){
			state.showPlayPage = bool
		},
		setPlayListId(state, bid){
			state.bid = bid
		}
	}
}

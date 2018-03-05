/**
 * Created by sioxa on 2016/12/25 0025.
 */
export default {
	state: {
		ids: {
			vid: 0,
			cid: 0
		},
		bid: 0,
		showPlayPage: false,
		aHref: 'http://m.tv.cztv.com/download.html'
	},
	actions:{
		toSetPlayPage(state, mid){
			console.log('设置播放')
			this.commit('setPlayPage')
		}
	},
	mutations: {
		setPlayId(state, ids){
			console.log('set---11------------------------------------')
			console.log(ids)
			state.ids = ids
		},
		setPlayPage(state, bool){
			state.showPlayPage = bool
		},
		setPlayListId(state, bid){
			state.bid = bid
		}
	}
}

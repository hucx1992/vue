import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Variety from '@/components/page/variety'
import Live from '@/components/page/live'
import Tv from '@/components/page/tv'
import Movie from '@/components/page/movie'
import Life from '@/components/page/life'
import Child from '@/components/page/child'
import Music from '@/components/page/music'
import News from '@/components/page/news'
import Blzz from '@/components/page/blzz'

Vue.use(Router)

export default new Router({
	routes:[
		{
		    path: '/',
		    name: '/',
		    component: Home, //顶层路由，对应index.html
		},
		{
			path: '/variety',
			name: 'variety',
			component: Variety
		},
		{
			path: '/live',
			name: 'live',
			component: Live
		},
		{
			path: '/tv',
			name: 'tv',
			component: Tv
		},
		{
			path: '/movie',
			name: 'movie',
			component: Movie
		},
		{
			path: '/life',
			name: 'life',
			component: Life
		},
		{
			path: '/child',
			name: 'child',
			component: Child
		},
		{
			path: '/music',
			name: 'music',
			component: Music
		},
		{
			path: '/news',
			name: 'news',
			component: News
		},
		{
			path: '/blzz',
			name: 'blzz',
			component: Blzz
		}
	]
})

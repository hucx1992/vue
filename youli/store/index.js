import Vue from 'vue'
import Vuex from 'vuex'

import ApiService from './apiService'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ApiService
  }
})


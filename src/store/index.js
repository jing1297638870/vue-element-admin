import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import sidebar from './modules/sidebar'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    sidebar,
    tagsView
  }
})

export default store

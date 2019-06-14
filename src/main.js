import Vue from 'vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element, { size: 'small', zIndex: 3000 });

import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.$http = axios

import validate from './assets/js/validate'
import util from './assets/js/util'
import './permission'
Vue.prototype.validate = validate;
Vue.prototype.util = util;

import '@/styles/index.scss'
import '@/assets/scss/common.scss'
import '@/assets/scss/iconfont.css'

import * as filters from './assets/js/filters' // global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

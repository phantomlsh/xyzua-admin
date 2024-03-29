import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import model from './model'
Vue.prototype.$model = model

import util from './util'
Vue.prototype.$util = util

import axios from 'axios'
axios.defaults.withCredentials = true
Vue.prototype.$ajax = axios

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

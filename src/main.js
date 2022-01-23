// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify' 
import VueAxios from 'vue-axios'
import axios from 'axios'
import './mixin'
import store from './store/store'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error.response;
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  template: '<App/>',
  components: { App }
})

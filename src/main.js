import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import jsCookie from 'js-cookie'

const axiosConfig = {
  baseURL: 'http://127.0.0.1:8000/files'
  //timeout: 30000,
};

Vue.prototype.$axios = axios.create(axiosConfig)
Vue.prototype.$cookies = jsCookie
Vue.prototype.$history = []

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

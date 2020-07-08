import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/dzzicon/icon.css'
import './assets/common.less'
import router from './router'
// import rowgrid from 'rowgrid'
import Qs from 'qs'
//配置請求地址
import axios from 'axios'
axios.interceptors.request.use(config => {
  if(config.method === 'post'){
    if (config.method === 'post') {
      config.data = Qs.stringify(config.data)
     }
     return config
  }

})
// axios.interceptors.response.use(config => {
//   return config
// })

Vue.prototype.AxiosApi = ''
Vue.prototype.axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

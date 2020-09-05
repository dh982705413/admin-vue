import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入初始化样式
import './assets/scss/global.scss'
// 引入ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from '@/util/http'
require('../mock/mock-server')
Vue.use(ElementUI)
// 导入axios
Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

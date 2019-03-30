import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './css/main.css'
import './fonts/iconfont.css'
import dayjs from 'dayjs'

Vue.use(ElementUI)
Vue.filter('dateFormat', function (value, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(value).format(format)
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

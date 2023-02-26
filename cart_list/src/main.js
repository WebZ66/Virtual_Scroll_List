import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/store.js'
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.component('Header', Header)
Vue.component('Footer', Footer)
Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

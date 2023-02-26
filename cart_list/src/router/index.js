import Vue from 'vue'
import VueRouter from 'vue-router'
import CartList from '@/views/CartList/CartList.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/cartlist' },
  { path: '/cartlist', component: CartList, name: 'cartlist' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

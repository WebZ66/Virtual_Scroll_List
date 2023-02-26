import Vue from 'vue'
import Vuex from 'vuex'
import CartList from '@/store/CartList/CartList'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    CartList
  }
})

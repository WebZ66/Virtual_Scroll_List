import { getCartListApi } from '@/api/CartListApi/CartListApi.js'
const state = {
  cartList: []
}

const actions = {
  async getCartList({ commit }) {
    const { data: res } = await getCartListApi()
    if (res.status == 200) {
      commit('GETCARTLIST', res.list)
    }
  }
}

const mutations = {
  GETCARTLIST(state, data) {
    state.cartList = data
  }
}

const getters = {
  cartList: state => state.cartList
}

export default {
  namespace: true,
  state,
  actions,
  mutations,
  getters
}

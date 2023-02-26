import request from '@/api/request.js'

export const getCartListApi = () => {
  return request({
    url: '/get',
    method: 'get'
  })
}

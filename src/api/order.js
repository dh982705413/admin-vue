import http from '@/util/http'

// 获取订单列表
export function getOrderList() {
  return http.get('/order/orderList')
}

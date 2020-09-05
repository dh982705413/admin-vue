import http from '@/util/http'

// 获取用户列表
export function getUserList() {
  return http.get('/user/userList')
}

// 获取VIP列表
export function getVipList() {
  return http.get('/user/vipList')
}

import http from '@/util/http'

// 获取权限列表
export function getRoleList() {
  return http.get('/role/roleList')
}

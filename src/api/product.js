import http from '@/util/http'

// 获取所有产品列表
export function getProductList() {
  return http.get('/product/productList')
}
// 添加产品
export function addProduct(form) {
  return http.post('/product/insert', { data: form })
}
// 根据id查找产品
export function findProductById(id) {
  return http.get('/product/selectByParam', { params: { id } })
}

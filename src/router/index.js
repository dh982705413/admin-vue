import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/views/welcome/Welcome'
import Main from '@/views/main/Main'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/welcome',
    component: Main,
    children: [
      // 欢迎页
      { path: '/welcome', component: Welcome },
      // 商品页
      {
        path: '/editProcudt/:id',
        props: true,
        component: () => import('../views/product/EditProduct.vue')
      },
      {
        path: '/editProcudt',
        component: () => import('../views/product/EditProduct.vue')
      },
      {
        path: '/productList',
        component: () => import('../views/product/ProductList.vue')
      },
      // 用户页
      {
        path: '/editUser',
        component: () => import('../views/user/EditUser.vue')
      },
      {
        path: '/editUser/:id',
        props: true,
        component: () => import('../views/user/EditUser.vue')
      },
      {
        path: '/userList',
        component: () => import('../views/user/UserList.vue')
      },
      // 权限列
      {
        path: '/roleList',
        component: () => import('../views/permission/RoleList.vue')
      },
      {
        path: '/editRole/:id',
        props: true,
        component: () => import('../views/permission/EditRole.vue')
      },
      {
        path: '/editRole',
        component: () => import('../views/permission/EditRole.vue')
      },
      // 订单列
      {
        path: '/orderList',
        component: () => import('../views/order/OrderList.vue')
      },
      {
        path: '/editOrder',
        component: () => import('../views/order/OrderEdit.vue')
      },
      {
        path: '/editOrder/:id',
        props: true,
        component: () => import('../views/order/OrderEdit.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  originalPush
})

export default router

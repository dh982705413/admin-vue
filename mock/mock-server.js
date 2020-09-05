import Mock from 'mockjs'

Mock.Random.extend({
  phone: function() {
    var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) // Number()
  }
})

Mock.setup({
  timeout: 100
})

// 获取产品列表
Mock.mock('/api/product/productList', 'get', {
  'data|20': [
    {
      id: '@id()',
      productName: '@cname',
      departureCity: '@county(true)',
      departureTime: '@date',
      'productPrice|1-5000': 50,
      productDesc: '@cword(20)',
      'productStatus|0-1': 0
    }
  ]
})

// 获取权限列表
Mock.mock('/api/role/roleList', 'get', {
  'data|6': [
    {
      id: '@id()',
      roleName: '@cname',
      roleDesc: '@cword(20)',
      'level|1-4': 1,
      'secondLevel|1-3': 1
    }
  ]
})

// 获取用户列表
Mock.mock('/api/user/userList', 'get', {
  'data|6': [
    {
      id: '@id()',
      username: '@cname',
      name: '@cname',
      email: '@email',
      phone: '@phone',
      'state|0-1': 0,
      'roles|2': [
        {
          id: '@id()',
          roleName: '@cname',
          roleDesc: '@cword(20)',
          'level|1-4': 1,
          'secondLevel|1-3': 1
        }
      ]
    }
  ]
})

// 获取订单列表
Mock.mock('/api/order/orderList', 'get', {
  'data|20': [
    {
      id: '@id',
      orderNo: '@id',
      orderTime: '@date',
      'peopleCount|1-500': 22,
      orderDesc: '@cword(20)',
      'payType|0-2': 0,
      'orderStatus|0-1': 0
    }
  ]
})

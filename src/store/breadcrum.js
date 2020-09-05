export default {
  state: {
    currentMenu: {
      name: '欢迎页',
      path: '/welcome',
      parent: 'none'
    }
  },
  mutations: {
    selectMenu(state, val) {
      state.currentMenu = val
    }
  },
  actions: {}
}

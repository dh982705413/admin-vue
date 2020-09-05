<template>
  <el-menu
    background-color="#545c64"
    text-color="#fff"
    :collapse="isCollapse"
    :collapse-transition="false"
    unique-opened
    router
    :default-active="activcPath"
  >
    <el-submenu
      :index="item.name"
      v-for="item in travellerList"
      :key="item.name"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.name }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="child.path"
          v-for="child in item.children"
          :key="child.path"
          @click="saveNavClick(child, item.name)"
          >{{ child.name }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  created() {
    this.activcPath = window.sessionStorage.getItem('activePath')
    this.currentMenu()
  },
  props: { isCollapse: Boolean },
  data() {
    return {
      travellerList: [
        {
          name: '商品管理',
          icon: 'goods',
          children: [
            { path: '/editProcudt', name: '添加商品' },
            { path: '/productList', name: '商品列表' }
          ]
        },
        {
          name: '用户管理',
          icon: 'user',
          children: [
            { path: '/userList', name: '用户列表' },
            { path: '/editUser', name: '编辑用户' }
          ]
        },
        {
          name: '权限管理',
          icon: 'help',
          children: [
            { path: '/roleList', name: '角色管理' },
            { path: '/editRole', name: '编辑角色' }
          ]
        },
        {
          name: '订单管理',
          icon: 'tickets',
          children: [
            { path: '/orderList', name: '订单列表' },
            { path: '/editOrder', name: '编辑订单' }
          ]
        }
      ],
      activcPath: ''
    }
  },
  methods: {
    saveNavClick(child, parent) {
      window.sessionStorage.setItem('activePath', child.path)
      this.activcPath = child.path
      child.parent = parent
      const currentMenu = JSON.stringify(child)
      window.sessionStorage.setItem('currentMenu', currentMenu)
      this.$store.commit('selectMenu', child)
    },
    currentMenu() {
      const current = JSON.parse(window.sessionStorage.getItem('currentMenu'))
      this.$store.commit('selectMenu', current)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
  height: 100%;
}
</style>

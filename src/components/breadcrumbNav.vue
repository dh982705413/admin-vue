<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }" :key="'index'">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item :key="currentMenu.parent">{{
          currentMenu.parent
        }}</el-breadcrumb-item>
        <el-breadcrumb-item :key="currentMenu.name">{{
          currentMenu.name
        }}</el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <el-divider></el-divider>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      current: state => state.breadcrum.currentMenu
    }),
    currentMenu() {
      return Object.assign(
        { name: '欢迎页', path: '/welcome', parent: 'none' },
        this.current
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin-bottom: 20px;
}
</style>

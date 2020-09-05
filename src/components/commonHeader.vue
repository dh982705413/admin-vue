<template>
  <div class="common-header">
    <div class="left-content">
      <span
        @click="collapse"
        class="collapse-btn"
        :class="{ 'collapse-btn-r': isCollapse }"
        >|||</span
      >
      <span>旅游订单管理系统</span>
    </div>
    <div class="right-content">
      <el-dropdown>
        <img :src="userIcon" v-if="userIcon" />
        <img src="../assets/image/user-default.png" v-else />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>切换账号</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    collapse: Function,
    isCollapse: Boolean
  },
  data() {
    return {
      userIcon: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.common-header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-content {
    display: flex;
    align-items: center;
    span {
      font-size: 18px;
      color: $header-text;
    }
    .collapse-btn {
      cursor: pointer;
      display: block;
      font-size: 18px;
      transition: 0.5s;
      letter-spacing: 0.2rem;
      font-weight: bold;
      transform: rotate(90deg);
      margin-right: 10px;
      &.collapse-btn-r {
        transition: 0.5s;
        transform: rotate(0deg) translateY(-2px);
      }
    }
  }
  .right-content {
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      outline: none;
      box-shadow: 1px 0px 2px rgba($color: #ffffff, $alpha: 0.5);
    }
  }
}
</style>

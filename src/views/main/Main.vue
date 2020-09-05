<template>
  <el-container class="main">
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <common-aside :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <common-header :collapse="collapse" :isCollapse="isCollapse" />
      </el-header>
      <el-scrollbar>
        <el-main>
          <el-card>
            <breadcrumb-nav v-show="$route.path !== '/welcome'" />
            <router-view :key="$route.path" />
          </el-card>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
import commonAside from '@/components/commonAside'
import commonHeader from '@/components/commonHeader'
import breadcrumbNav from '@/components/breadcrumbNav'
export default {
  components: {
    commonAside,
    commonHeader,
    breadcrumbNav
  },
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  .el-header {
    background-color: $header-color;
  }
}
</style>

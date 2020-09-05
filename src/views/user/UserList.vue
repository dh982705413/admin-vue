<template>
  <div>
    <div class="list-header">
      <h1>用户列表</h1>
      <div class="search-box">
        <el-input
          placeholder="请输入要查找的用户名"
          v-model="searchData"
          clearable
          prefix-icon="el-icon-search"
          @clear="clearSearchInput"
          @input="searchInput"
          @change="searchUser"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchUser"
          ></el-button>
        </el-input>
      </div>
    </div>
    <el-table :data="userList" stripe border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" class="demo-table-expand" inline>
            <el-form-item label="邮箱">
              <span>{{ scope.row.email }}</span>
            </el-form-item>
            <el-form-item label="电话">
              <span>{{ scope.row.phone }}</span>
            </el-form-item>
            <el-form-item label="权限信息">
              <role-list :roles="scope.row.roles">
                <template #tableLeft>
                  <el-table-column type="index" width="50"> </el-table-column>
                </template>
                <template #desc>
                  <el-table-column
                    label="角色描述"
                    prop="roleDesc"
                    width="200px"
                  ></el-table-column>
                </template>
              </role-list>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="昵称" prop="name"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="其他操作" width="200px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="editUser(scope.row.id)"
            size="mini"
            icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button
            type="danger"
            @click="removeUser(scope.row)"
            size="mini"
            icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserList } from '@/api/user'
import RoleList from '@/views/permission/RoleList'
export default {
  created() {
    this.fetchUserList()
  },
  data() {
    return {
      userList: [],
      searchData: ''
    }
  },
  methods: {
    // 获取用户信息
    async fetchUserList() {
      const res = await getUserList()
      console.log(res)
      this.userList = res.data
    },
    // 编辑用户
    editUser(id) {
      this.$router.push(`/editUser/${id}`)
    },
    // 搜索框查询
    searchUser() {
      this.userList = this.userList.filter(item => {
        return item.username.includes(this.searchData)
      })
    },
    // 搜索框清空
    clearSearchInput() {
      this.fetchUserList()
    },
    // 搜索框清空
    searchInput() {
      if (!this.searchData) {
        this.fetchUserList()
      }
    },
    // 删除用户
    async removeUser(item) {
      const confirm = await this.$confirm(
        `此操作将永久删除改用户"${item.username}", 是否继续?`,
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirm !== 'confirm') return this.$message.info('已经取消删除')
      this.$message.success('删除用户成功')
    }
  },
  components: {
    RoleList
  }
}
</script>

<style lang="scss">
.userlist-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 44px;
  .search-box {
    height: 100%;
    display: flex;
  }
}
</style>

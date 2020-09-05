<template>
  <div>
    <h1>{{ roles ? '' : '角色列表' }}</h1>
    <el-table :data="roleList" style="width: 100%" border stripe>
      <slot name="tableLeft">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand" inline>
              <el-form-item label="角色描述">
                <span>{{ props.row.roleDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </slot>
      <el-table-column label="角色ID" prop="id"></el-table-column>
      <el-table-column label="角色名" prop="roleName"></el-table-column>
      <el-table-column label="权限等级">
        <template slot-scope="scope">
          <el-tag effect="dark" :type="type[scope.row.level - 1]">
            {{ level[scope.row.level - 1] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="二级权限">
        <template slot-scope="scope">
          <el-tag :type="type[scope.row.secondLevel - 1]">
            {{ level[scope.row.secondLevel - 1] }}
          </el-tag>
        </template>
      </el-table-column>
      <slot name="desc"></slot>
      <el-table-column label="其他操作" v-if="!roles">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="editRole(scope.row.id)"
            icon="el-icon-edit"
            size="mini"
            >编辑</el-button
          >
          <el-button
            type="danger"
            @click="removeRole(scope.row)"
            icon="el-icon-delete"
            size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <slot name="diy"></slot>
    </el-table>
  </div>
</template>

<script>
import { getRoleList } from '@/api/role.js'
export default {
  props: {
    roles: Array
  },
  created() {
    this.roles ? this.setUserRolesList() : this.fetchRoleList()
  },
  data() {
    return {
      roleList: [],
      type: ['success', '', 'danger', 'warning'],
      level: ['一级', '二级', '三级', '四级']
    }
  },
  methods: {
    async fetchRoleList() {
      const res = await getRoleList()
      console.log(res)
      this.roleList = res.data
    },
    setUserRolesList() {
      this.roleList = this.roles
    },
    async removeRole(item) {
      const confirm = await this.$confirm(
        `此操作将永久删除角色"${item.roleName}", 是否继续?`,
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirm !== 'confirm') return this.$message.info('已经取消删除')
      this.$message.success('删除用户成功')
    },
    editRole(id) {
      this.$router.push(`/editRole/${id}`)
    }
  }
}
</script>

<style lang="scss"></style>

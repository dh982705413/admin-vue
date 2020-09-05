<template>
  <div>
    <h1>{{ id ? '编辑' : '添加' }}用户</h1>
    <el-form :model="form" label-width="70px" :rules="formRule" ref="formRef">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="baseConfig">
          <el-form-item label="用户名">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              style="width:25%"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              :type="isOpen ? 'text' : 'password'"
              style="width:25%"
            >
              <i
                slot="suffix"
                :class="
                  isOpen
                    ? 'iconfont icon-eyes_open'
                    : 'iconfont icon-eyes_close'
                "
                class="eyes"
                @click="isOpen = !isOpen"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input
              v-model="form.name"
              placeholder="请输入昵称"
              style="width:25%"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="form.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="可选配置" name="optionalConfig">
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="form.email"
              placeholder="请输入邮箱"
              style="width:25%"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="form.phone"
              placeholder="请输入手机号"
              style="width:25%"
            ></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="权限配置" name="roleConfig">
          <el-dropdown @command="addRole">
            <span class="el-dropdown-link addrole">
              <i class="el-icon-plus"></i>添加权限
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in rolesList"
                :key="item.id"
                :command="item"
                >{{ item.roleName }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <role-list :roles="showRoleList">
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
            <template #diy>
              <el-table-column label="其他操作">
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click="deleteRole(scope.$index)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </template>
          </role-list>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <el-button type="primary" style="margin-top:20px">{{
      id ? '提交编辑' : '添加用户'
    }}</el-button>
  </div>
</template>

<script>
import { getRoleList } from '@/api/role'
import RoleList from '@/views/permission/RoleList'
export default {
  props: {
    id: String
  },
  created() {
    this.getRole()
  },
  data() {
    const checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    const checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      form: {
        username: '',
        password: '',
        name: '',
        state: 0,
        roles: []
      },
      rolesList: [],
      activeName: 'baseConfig',
      isOpen: false,
      formRule: {
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async getRole() {
      const res = await getRoleList()
      this.rolesList = res.data
    },
    addRole(item) {
      this.form.roles.push(item)
    },
    deleteRole(index) {
      this.form.roles.splice(index, 1)
    }
  },
  computed: {
    showRoleList() {
      return this.form.roles
    }
  },
  components: {
    RoleList
  }
}
</script>

<style lang="scss" scoped>
.addrole {
  color: #409eff;
  cursor: pointer;
}
.eyes {
  cursor: pointer;
}
</style>

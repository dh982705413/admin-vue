<template>
  <div>
    <h1>{{ id ? '编辑' : '添加' }}角色</h1>
    <el-form :model="form">
      <el-form-item label="角色名称" label-width="70px">
        <el-row>
          <el-col :span="4">
            <el-input
              v-model="form.roleName"
              placeholder="请输入角色名"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="权限等级" label-width="70px">
        <el-select v-model="form.level" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级权限" label-width="70px">
        <el-select v-model="form.secondLevel" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色描述" label-width="70px">
        <vue-editor v-model="form.roleDesc" />
      </el-form-item>
      <el-form-item label-width="70px">
        <el-button type="primary" @click="editRole"
          >{{ id ? '编辑' : '添加' }}角色</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  props: {
    id: String
  },
  data() {
    return {
      form: {},
      options: [
        {
          value: 1,
          label: '一级'
        },
        {
          value: 2,
          label: '二级'
        },
        {
          value: 3,
          label: '三级'
        },
        {
          value: 4,
          label: '四级'
        }
      ],
      options2: [
        {
          value: 1,
          label: '一级'
        },
        {
          value: 2,
          label: '二级'
        },
        {
          value: 3,
          label: '三级'
        }
      ]
    }
  },
  methods: {
    editRole() {
      console.log(this.form)
    }
  },
  components: {
    VueEditor
  }
}
</script>

<style lang="scss" scoped></style>

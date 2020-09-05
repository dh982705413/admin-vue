<template>
  <div>
    <h1>{{ id ? '编辑' : '添加' }}订单</h1>
    <el-form :model="form" label-width="70px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="baseConfig">
          <el-form-item label="旅客名">
            <el-row>
              <el-col :span="5">
                <el-input
                  v-model="form.travellers"
                  placeholder="请输入旅客名"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="出行人数">
            <el-row>
              <el-col :span="5">
                <el-input
                  v-model.trim.number="form.peopleCount"
                  placeholder="请输入出行人数"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-date-picker
              v-model="form.orderTime"
              type="datetime"
              placeholder="选择日期时间"
              format="yyyy/MM/dd HH:mm:ss"
              value-format="yyyy/MM/dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-select v-model="form.payType" placeholder="请选择支付方式">
              <el-option
                v-for="item in paytype"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="form.orderStatus" placeholder="是否支付">
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单详情">
            <vue-editor v-model="form.orderDesc" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="其他信息" name="anoterConfig">
          <el-form-item label="产品名称"> </el-form-item>
          <el-form-item label="用户名称"> </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" @click="addOrder"
        >{{ id ? '编辑' : '添加' }}订单</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { getUserList } from '@/api/user'
import { getProductList } from '@/api/product'
export default {
  props: {
    id: String
  },
  created() {
    this.fetchUserList()
    this.fetchProductList()
  },
  data() {
    return {
      form: {},
      paytype: [
        { name: '支付宝', value: 0 },
        { name: '微信支付', value: 1 },
        { name: '其他', value: 2 }
      ],
      status: [
        { name: '未支付', value: 0 },
        { name: '已支付', value: 1 }
      ],
      userList: [],
      productList: [],
      activeName: 'baseConfig'
    }
  },
  methods: {
    async fetchUserList() {
      const res = await getUserList()
      this.userList = res.data
      console.log(this.userList)
    },
    async fetchProductList() {
      const res = await getProductList()
      this.productList = res.data
      console.log(this.productList)
    },
    addOrder() {
      console.log(this.form)
    }
  },
  components: {
    VueEditor
  }
}
</script>

<style lang="scss" scoped></style>

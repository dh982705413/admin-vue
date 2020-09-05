<template>
  <div>
    <h1>{{ id ? '编辑' : '添加' }}商品</h1>
    <el-form ref="form" :model="form" label-width="80px" :rules="formRule">
      <el-form-item label="产品名称" prop="productName">
        <el-row>
          <el-col :span="5">
            <el-input
              v-model="form.productName"
              placeholder="请输入产品名"
              maxlength="12"
              show-word-limit
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="出发城市" prop="departureCity">
        <el-cascader
          placeholder="选择出发城市"
          size="large"
          :options="options"
          v-model="selectedOptions"
          @change="handleCityChange"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="出发时间" prop="departureTime">
        <el-date-picker
          v-model="form.departureTime"
          type="datetime"
          placeholder="选择日期时间"
          format="yyyy/MM/dd HH:mm:ss"
          value-format="yyyy/MM/dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="产品价格" prop="productPrice">
        <el-row>
          <el-col :span="4">
            <el-input
              v-model.trim.number="form.productPrice"
              placeholder="请输入价格"
              suffix-icon="el-icon-money"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="产品描述">
        <vue-editor v-model="form.productDesc" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editProduct"
          >{{ id ? '编辑' : '添加' }}产品</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { regionDataPlus, CodeToText } from 'element-china-area-data'
import { addProduct, findProductById } from '@/api/product'

export default {
  props: {
    id: String
  },
  created() {
    this.id && this.getForm()
  },
  data() {
    return {
      form: {
        productName: '',
        departureCity: '',
        departureTime: '',
        productPrice: null,
        productDesc: '',
        productStatus: 1
      },
      options: regionDataPlus,
      selectedOptions: [],
      formRule: {
        productName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
        ],
        departureCity: [
          { required: true, message: '请选择出发城市', trigger: 'blur' }
        ],
        departureTime: [
          { required: true, message: '请选择出发时间', trigger: 'blur' }
        ],
        productPrice: [
          { required: true, message: '请输入产品价格', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleCityChange(value) {
      this.form.departureCity = value.map(item => CodeToText[item]).join('')
    },
    async editProduct() {
      console.log(this.form)
      const res = await addProduct(this.form)
      console.log(res)
    },
    async getForm() {
      const res = await findProductById(this.id)
      console.log(res)
    }
  },
  components: {
    VueEditor
  }
}
</script>

<style lang="scss" scoped></style>

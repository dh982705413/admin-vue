<template>
  <div>
    <h1>商品列表</h1>
    <el-table :data="productList" border style="width: 100%" stripe>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand" inline>
            <el-form-item label="出发城市">
              <span>{{ props.row.departureCity }}</span>
            </el-form-item>
            <el-form-item label="出发时间">
              <span>{{ props.row.departureTime }}</span>
            </el-form-item>
            <el-form-item label="产品描述">
              <span v-html="props.row.productDesc"></span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="产品名称" prop="productName"></el-table-column>
      <el-table-column label="产品价格" prop="productPrice"></el-table-column>
      <el-table-column label="产品状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.productStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="stateChanged(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="其他操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="edit(scope.row.id)"
            icon="el-icon-edit"
            size="mini"
            >编辑</el-button
          >
          <el-button
            type="danger"
            @click="reomve(scope.row)"
            icon="el-icon-delete"
            size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
  </div>
</template>

<script>
import { getProductList } from '@/api/product.js'
export default {
  created() {
    this.fetchProduct()
  },
  data() {
    return {
      productList: []
    }
  },
  methods: {
    async fetchProduct() {
      const res = await getProductList()
      console.log(res)
      this.productList = res.data
    },
    stateChanged(v) {
      console.log(v)
    },
    async reomve(item) {
      const confirm = await this.$confirm(
        `此操作将永久删除商品"${item.productName}", 是否继续?`,
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
    edit(id) {
      this.$router.push(`/editProcudt/${id}`)
    }
  }
}
</script>

<style lang="scss"></style>

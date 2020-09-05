<template>
  <div>
    <div class="list-header">
      <h1>订单列表</h1>
      <div class="search-box">
        <el-input
          placeholder="请输入要查找订单的订单号"
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
    <el-table :data="orderList" stripe border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand" inline>
            <el-form-item label="订单详情">
              <span>{{ props.row.orderDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" prop="orderNo"></el-table-column>
      <el-table-column label="下单时间" prop="orderTime"></el-table-column>
      <el-table-column label="出行人数" prop="peopleCount"></el-table-column>
      <el-table-column label="支付方式">
        <template slot-scope="scope">
          <i
            v-if="scope.row.payType != 2"
            class="pay-icon"
            :class="'iconfont ' + icon[scope.row.payType]"
            :style="scope.row.payType == 0 ? 'color:blue' : 'color:green'"
          ></i>
          <span v-else>其他</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          <el-tag :type="tagType[scope.row.orderStatus]" effect="dark">
            {{ scope.row.orderStatus == 0 ? '未支付' : '已支付' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="其他操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="editOrder(scope.row.id)"
            size="mini"
            icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button
            type="danger"
            @click="removeOrder(scope.row)"
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
import { getOrderList } from '@/api/order'
export default {
  created() {
    this.fetchOrderList()
  },
  data() {
    return {
      orderList: [],
      icon: ['icon-zfb', 'icon-wx'],
      tagType: ['danger', 'success'],
      searchData: ''
    }
  },
  methods: {
    async fetchOrderList() {
      const res = await getOrderList()
      this.orderList = res.data
    },
    async removeOrder(item) {
      const confirm = await this.$confirm(
        '此操作将永久删除该订单, 是否继续?',
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
    editOrder(id) {
      this.$router.push(`/editOrder/${id}`)
    },
    // 搜索框查询
    searchUser() {
      this.orderList = this.orderList.filter(item => {
        return item.orderNo.includes(this.searchData)
      })
    },
    // 搜索框清空
    clearSearchInput() {
      this.fetchOrderList()
    },
    // 搜索框清空
    searchInput() {
      if (!this.searchData) {
        this.fetchOrderList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-icon {
  font-size: 23px;
}
</style>

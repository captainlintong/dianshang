<template>
  <div class="box-card">
       <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="searchText" @keyup.enter.native="search">
            <el-button slot="append" icon="el-icon-search" @click.native.prevent="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button plain @click="addUser">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="shopList"
        border
        stripe
        style="width: 100%">
        <el-table-column type="index" label="编号" width="60"></el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
          width="400">
        </el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格"
          width="100">
        </el-table-column>
        <!--
          el-table-column 是表格的列
          template 是自定义列的内容模板
          slot-scope 是你自定义这一列内容使用的数据
          scope 就是你用来渲染表格时候的那个数据（也就是你写在 el-table 里面的 data 中的那个数组）
          row 就是在循环渲染中的每一行的当前数据（就是一个类似我们 v-for 的时候的 item）
          插槽
        -->
        <el-table-column label="商品状态" width="100px">
          <template slot-scope="scope">
            {{ ['未通过', '审核中', '已审核'][scope.row.goods_state] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_weight"
          width="100"
          label="商品重量">
        </el-table-column>
        <el-table-column
          prop="add_time"
          width="150"
          label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              plain
              icon="el-icon-edit"
              size="small"
              title="编辑用户"
              @click="$refs.editFormEl.editUserShow(scope.row)"
              ></el-button>
            <el-button
              size="small"
              plain
              title="删除商品"
              icon="el-icon-delete"
              @click='handelDelShop(scope.row)'
              ></el-button>
              <el-button
              plain
              size="small"
              title="分配角色"
              icon="el-icon-star-off"
              @click="$refs.roleFormEl.rolesUserShow(scope.row)"
              ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
       <el-pagination
        background
        @size-change="loadShopList"
        @current-change="loadShopList"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="5"
        :pager-count="5"
        :total="total">
      </el-pagination>
      <!-- /分页组件 -->
  </div>
</template>

<script>
import * as Shop from '@/api/shop'
export default {
  async created () {
    this.loadShopList()
  },
  name: 'ShopList',
  data () {
    return {
      shopList: [],
      searchText: '',
      addFormVisible: false,
      visible: false,
      tableLoading: true,
      total: 0
    }
  },
  methods: {
    async loadShopList (page = 1, pagesize = 5) { // 渲染商品列表
      this.tableLoading = true
      const { data } = await Shop.getShopList({ pagenum: page, pagesize: pagesize, query: this.searchText })
      console.log(data);

      this.shopList = data.goods
      this.total = data.total
      this.tableLoading = false
    },
    remove () {
      this.visible = false
      this.$notify({
        title: '警告',
        message: '你已取消添加用户',
        type: 'warning'
      })
      this.$refs.addFormEl.resetFields()
      this.addFormVisible = false
    },
    addUser () { // 显示添加用户框
      this.$notify.info({
        title: '消息',
        message: '你将添加商品'
      })
      this.addFormVisible = true
    },
    handelDelShop (item) { // 删除单个商品
      this.$confirm('是否确定删除商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { meta } = await Shop.delShop(item.goods_id)
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除商品成功!'
          })
          this.loadShopList()
        }
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    search () { // 搜索用户
      this.loadShopList()
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 15px;
}
.el-dialog__body {
  padding: 0;
}
.sure {
  margin-left: 20px;
}
.el-card {
  overflow: visible;
}
.el-table {
  margin-bottom: 20px;
}
.el-card__header {
  background-color: red;
  padding: 0;
}
</style>

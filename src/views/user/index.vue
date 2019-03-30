<template>
  <div class="box-card">
       <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="searchText" @keyup.enter.native="search">
            <el-button slot="append" icon="el-icon-search" @click.native.prevent="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button plain @click="addUser">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="users"
        border
        stripe
        style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
        <!--
          el-table-column 是表格的列
          template 是自定义列的内容模板
          slot-scope 是你自定义这一列内容使用的数据
          scope 就是你用来渲染表格时候的那个数据（也就是你写在 el-table 里面的 data 中的那个数组）
          row 就是在循环渲染中的每一行的当前数据（就是一个类似我们 v-for 的时候的 item）
          插槽
        -->
        <el-table-column label="用户状态" width="100px">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="setState(scope.row)"></el-switch>
          </template>
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
              title="删除用户"
              icon="el-icon-delete"
              @click='handelDelUser(scope.row)'
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
      <!-- 分页组件   @size-change="abcd"-->
       <el-pagination
        background

        @current-change="loadUsers"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="5"
        :pager-count="5"
        :total="total">
      </el-pagination>
      <!-- /分页组件 -->
    <el-dialog :visible.sync="addFormVisible" width="34%" center>
      <el-form :model="addFormData" size="medium" label-position="left" :rules="addFormRules" status-icon ref="addFormEl">
        <el-form-item label="用户名" label-width="70px" prop="username">
          <el-input v-model="addFormData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px" prop="password">
          <el-input v-model="addFormData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="70px" prop="email">
          <el-input v-model="addFormData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="70px" prop="mobile">
          <el-input v-model="addFormData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-popover
          placement="top"
          width="160"
          v-model="visible">
          <p>确定取消吗</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click.prevent="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click.prevent="remove">确定</el-button>
          </div>
          <el-button slot="reference">取消</el-button>
        </el-popover>
        <el-button type="primary" @click.prevent="handleAdd" class="sure">确 定</el-button>
      </div>
    </el-dialog>
    <Edit ref="editFormEl" v-on:edit-success="loadUsers"></Edit>
    <EditRole ref="roleFormEl"></EditRole>
  </div>
</template>

<script>
import * as User from '@/api/user'
import Edit from './edit'
import EditRole from './role'

export default {
  async created () {
    this.loadUsers()
  },
  name: 'UserList',
  components: {
    Edit,
    EditRole
  },
  data () {
    return {
      users: [],
      searchText: '',
      addFormVisible: false,
      visible: false,
      addFormData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      tableLoading: true,
      addFormRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: ['blur', 'change'] }
        ],
        password: [
          { min: 6, max: 10, message: '请输入 6 到 11 个字符', trigger: ['blur', 'change'] },
          { required: true, message: '密码不能为空', trigger: ['blur', 'change'] }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
          { required: true, message: '邮箱不能为空', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '号码不能为空', trigger: ['blur', 'change'] },
          // { type: 'number', message: '号码必须为数字值', trigger: ['blur', 'change'] },
          { min: 11, max: 11, message: '请输入正确的号码', trigger: ['blur', 'change'] }
        ]
      },
      total: 0,
      // userListInfo: {
      //   pagenum: 1,
      //   pagesize: 5,
      //   query: ''
      // }
    }
  },
  methods: {
    // abcd (size) {
    //   console.log(size)
    //   this.loadUsers(1, size)
    // },
    async loadUsers (page = 1, pagesize = 5) { // 渲染用户列表
      this.tableLoading = true
      const { data } = await User.getUserList({ pagenum: page, pagesize: pagesize, query: this.searchText })
      this.users = data.users
      this.total = data.total
      this.tableLoading = false
    },
    // 表单验证
    async handleAdd () {
      this.$refs.addFormEl.validate(valid => {
        if (!valid) {
          this.$notify.error({
            title: '错误',
            message: '请填写完毕后提交'
          })
          return
        }
        this.submitAdd()
      })
    },
    // 添加用户
    async submitAdd () {
      const { meta } = await User.addUser(this.addFormData)
      if (meta.status === 201) {
        this.$refs.addFormEl.resetFields()
        this.addFormVisible = false
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.loadUsers()
      }
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
        message: '你将添加用户'
      })
      this.addFormVisible = true
    },
    async setState (item) { // 设置用户状态
      const { data, meta } = await User.getUsermsg(item.id, item.mg_state)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: `${data.mg_state ? '启用' : '禁用'} 用户状态成功`
        })
      }
    },
    handelDelUser (item) { // 删除单个用户
      this.$confirm('是否确定删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { meta } = await User.delUser(item.id)
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadUsers()
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
      this.loadUsers()
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

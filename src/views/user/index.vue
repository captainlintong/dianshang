<template>
  <div class="box-card">
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
       <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="searchText">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="info" @click="addUser">添加用户</el-button>
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
      </el-table>
    </el-card>
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
  </div>
</template>

<script>

import { getUserList, addUser } from '@/api/user'

export default {
  async created () {
    this.loadUsers()
  },
  name: 'UserList',
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
      }
    }
  },
  methods: {
    async loadUsers () {
      this.tableLoading = true
      const { data } = await getUserList({ pagenum: 1, pagesize: 100 })
      this.users = data.users
      this.tableLoading = false
    },
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
    async submitAdd () {
      const { meta } = await addUser(this.addFormData)
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
    addUser () {
      this.$notify.info({
        title: '消息',
        message: '你将添加用户'
      })
      this.addFormVisible = true
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
/* .box-card {
  height: 100%;
}
.el-main {
  height: 100%;
}
.el-container {
  height: 100%;
} */
</style>
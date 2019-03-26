<template>
  <div>
    <el-dialog :visible.sync="editFormVisible" width="34%" title="编辑用户">
      <el-form :model="editFormData" size="medium" label-position="left" :rules="addFormRules" status-icon ref="editFormEl">
        <el-form-item label="用户名" label-width="70px" prop="username">
          <el-tag type="info" v-text="editFormData.username"></el-tag>
        </el-form-item>
        <el-form-item label="邮箱" label-width="70px" prop="email">
          <el-input v-model="editFormData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="70px" prop="mobile">
          <el-input v-model="editFormData.mobile" autocomplete="off"></el-input>
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
        <el-button type="primary" @click.prevent="handleEdit" class="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as User from '@/api/user'
export default {
  name: 'Edit',
  data () {
    return {
      editFormVisible: false,
      visible: false,
      editFormData: {
        username: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
          { required: true, message: '邮箱不能为空', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '号码不能为空', trigger: ['blur', 'change'] },
          { min: 11, max: 11, message: '请输入正确的号码', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    async handleEdit () {
      this.$refs.editFormEl.validate(valid => {
        if (!valid) {
          this.$notify.error({
            title: '错误',
            message: '请填写完毕后提交'
          })
          return
        }
        this.editUser()
      })
    },
    async editUser () {
      const { id, email, mobile } = this.editFormData
      const { meta } = await User.updataEdit(id, email, mobile)
      if (meta.status === 200) {
        this.$emit('edit-success')
        this.editFormVisible = false
        this.$message({
          type: 'success',
          message: '编辑用户成功'
        })
      }
    },
    remove () {
      this.visible = false
      this.$notify({
        title: '警告',
        message: '你已取消编辑用户',
        type: 'warning'
      })
      this.$refs.editFormEl.resetFields()
      this.editFormVisible = false
    },
    async editUserShow (item) {
      const { data, meta } = await User.setEdit(item.id, item.email, item.mobile)
      console.log(data)
      if (meta.status === 200) {
        this.editFormVisible = true
        this.editFormData = data
      }
    }
  }
}
</script>

<style scoped>
.sure {
  margin-left: 20px;
}
</style>

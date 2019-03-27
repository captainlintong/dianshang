<template>
  <div>
    <el-dialog :visible.sync="rolesFormVisible" width="34%" title="添加角色">
      <el-form :model="rolesFormData" size="medium" label-position="left" :rules="addFormRules" status-icon ref="rolesFormEl">
        <el-form-item label="角色名称" label-width="90px" prop="roleName">
          <el-input v-model="rolesFormData.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="90px" prop="roleDesc">
          <el-input v-model="rolesFormData.roleDesc" autocomplete="off"></el-input>
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
        <el-button type="primary" @click.prevent="handleRoles" class="sure">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addRoles } from '@/api/role'
export default {
  name: 'addRoles',
  data () {
    return {
      rolesFormVisible: false,
      visible: false,
      rolesFormData: {
        roleName: '',
        roleDesc: ''
      },
      addFormRules: {
        roleName: [
          { required: true, message: '角色不能为空', trigger: ['blur', 'change'] }
        ],
        roleDesc: [
          { required: true, message: '角色描述不能为空', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    async handleRoles () { // 添加用户角色表单验证
      this.$refs.rolesFormEl.validate(valid => {
        if (!valid) {
          this.$notify.error({
            title: '错误',
            message: '请填写完毕后提交'
          })
          return
        }
        this.sureRoles()
      })
    },
    async sureRoles () {
      const { roleName, roleDesc } = this.rolesFormData
      const { meta } = await addRoles(roleName, roleDesc)
      if (meta.status === 201) {
        this.$emit('addRoles-success')
        this.rolesFormVisible = false
        this.$refs.rolesFormEl.resetFields()
        this.$message({
          message: '添加角色成功',
          type: 'success'
        })
      }
    },
    remove () { // 取消编辑
      this.visible = false
      this.$notify({
        title: '警告',
        message: '你已取消添加角色',
        type: 'warning'
      })
      this.$refs.rolesFormEl.resetFields()
      this.rolesFormVisible = false
    },
    rolesShow () { // 显示添加框
      this.rolesFormVisible = true
    }
  }
}
</script>

<style scoped>
.sure {
  margin-left: 20px;
}
</style>

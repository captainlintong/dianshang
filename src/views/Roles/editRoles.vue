<template>
  <div>
    <el-dialog :visible.sync="editRolesFormVisible" width="34%" title="编辑角色">
      <el-form :model="editRolesFormData" size="medium" label-position="left" :rules="editFormRules" status-icon ref="editRolesFormEl">
        <el-form-item label="角色名称" label-width="90px" prop="roleName">
          <el-input v-model="editRolesFormData.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="90px" prop="roleDesc">
          <el-input v-model="editRolesFormData.roleDesc" autocomplete="off"></el-input>
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
import { getRoles, sureEdit } from '@/api/role'
export default {
  name: 'addRoles',
  data () {
    return {
      editRolesFormVisible: false,
      visible: false,
      editRolesFormData: {
        roleName: '',
        roleDesc: '',
        roleId: '0'
      },
      editFormRules: {
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
      this.$refs.editRolesFormEl.validate(valid => {
        if (!valid) {
          this.$notify.error({
            title: '错误',
            message: '请填写完毕后提交'
          })
          return
        }
        this.sureSetRoles()
      })
    },
    async sureSetRoles () {
      const { roleId, roleName, roleDesc } = this.editRolesFormData
      const { meta } = await sureEdit(roleId, roleName, roleDesc)
      if (meta.status === 200) {
        this.$emit('editRoles-success')
        this.editRolesFormVisible = false
        this.$refs.editRolesFormEl.resetFields()
        this.$message({
          message: '编辑角色成功',
          type: 'success'
        })
      }
    },
    remove () { // 取消编辑
      this.visible = false
      this.$notify({
        title: '警告',
        message: '你已取消编辑角色',
        type: 'warning'
      })
      this.$refs.editRolesFormEl.resetFields()
      this.editRolesFormVisible = false
    },
    async editRolesShow (item) { // 显示编辑框和角色信息
      this.editRolesFormVisible = true
      const { data, meta } = await getRoles(item.id)
      if (meta.status === 200) {
        this.editRolesFormData = data
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

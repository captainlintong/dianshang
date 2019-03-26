<template>
  <div>
    <el-dialog :visible.sync="editFormVisible" width="34%" title="分配角色">
      <el-form :model="rolesFormData" size="medium" label-position="left" status-icon ref="roleFormEl">
        <el-form-item label="当前用户" label-width="70px" prop="username">
          <el-tag type="info" v-text="rolesFormData.username"></el-tag>
        </el-form-item>
        <el-form-item label="分配角色" label-width="70px">
            <el-select v-model="rolesFormData.rid">
              <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.roleName"
              :value="item.id">
              </el-option>
              <el-option :value="-1" label="请选择角色"></el-option>
            </el-select>
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
        <el-button type="primary" class="sure" @click.prevent="setRoles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as User from '@/api/user'
import { rolesList, setUserRoles } from '@/api/role'
export default {
  name: 'EditRole',
  data () {
    return {
      editFormVisible: false,
      visible: false,
      rolesFormData: {
        username: '',
        rid: 0
      },
      roles: []
    }
  },
  methods: {
    remove () { // 取消分配角色
      this.visible = false
      this.$notify({
        title: '警告',
        message: '你已取消分配角色',
        type: 'warning'
      })
      this.editFormVisible = false
    },
    async setRoles () {  // 设置角色
      const { id, rid } = this.rolesFormData
      const { meta } = await setUserRoles(id, rid)
      if (meta.status === 200) {
        this.editFormVisible = false
        this.$message({
          type: 'success',
          message: meta.msg
        })
      }
    },
    async rolesUserShow (item) {  // 显示角色框
      const { data, meta } = await User.setEdit(item.id, item.email, item.mobile)
      if (meta.status === 200) {
        this.editFormVisible = true
        this.rolesFormData = data
      }
      const { data: rolesData, meta: rolesMeta } = await rolesList()
      if (rolesMeta.status === 200) {
        this.roles = rolesData
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

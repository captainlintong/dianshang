<template>
  <div>
    <el-dialog :visible.sync="setRolesFormVisible" width="34%" title="授权角色">
      <el-tree
        :data="rolesData"
        show-checkbox
        default-expand-all
        :default-checked-keys="defaultChecked"
        node-key="id"
        :props="defaultProps">
      </el-tree>
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
        <el-button type="primary" class="sure">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRithts } from '@/api/rights'
export default {
  name: 'setRoles',
  data () {
    return {
      setRolesFormVisible: false,
      visible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rolesData: [],
      defaultChecked: []
    }
  },
  methods: {
    remove () { // 取消设置角色
      this.visible = false
      this.$notify({
        title: '警告',
        message: '你已取消设置角色',
        type: 'warning'
      })
      this.setRolesFormVisible = false
    },
    async setRolesShow (item) { // 显示角色信息框
      this.setRolesFormVisible = true
      this.loadRoles()
      this.getRolesRights(item.children)
    },
    getRolesRights (rolesRights) { // 获取默认的权限id
      const tmp = []
      rolesRights.forEach(first => {
        first.children.forEach(second => {
          second.children.forEach(third => tmp.push(third.id))
        })
      })
      this.defaultChecked = tmp
    },
    async loadRoles () {
      const { data, meta } = await getRithts('tree')
      if (meta.status === 200) {
        this.rolesData = data
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

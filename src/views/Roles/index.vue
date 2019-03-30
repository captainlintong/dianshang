<template>
<div>
  <el-col :span="4">
    <el-button plain class="btn" @click="showAddRoles">添加角色</el-button>
  </el-col>
  <el-table
    :data="rolesData"
    border
    stripe
    size="mini"
    style="width: 100%">
    <!-- 展开 -->
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-row v-for="first in scope.row.children" :key="first.id">
          <el-col :span="3">
            <el-tag closable @close="delRights(scope.row, first)">{{ first.authName }}</el-tag>
             <i class="el-icon-arrow-right"></i>
          </el-col>
          <el-col :span="21">
            <el-row v-for="second in first.children" :key="second.id" class="xian">
              <el-col :span="4">
                <el-tag type="success" closable @close="delRights(scope.row, second)">{{ second.authName }}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-tag type="danger" closable v-for="third in second.children" :key="third.id" class="right" @close="delRights(scope.row, third)">{{ third.authName }}</el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <!-- /展开 -->
    <el-table-column type="index"></el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="描述"
      width="580">
    </el-table-column>
     <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              plain
              icon="el-icon-edit"
              size="small"
              title="编辑角色"
              @click.prevent='handelEditRoles(scope.row)'
              ></el-button>
            <el-button
              size="small"
              plain
              title="删除角色"
              @click.prevent="handleDelRoles(scope.row)"
              icon="el-icon-delete"
              ></el-button>
              <el-button
              plain
              size="small"
              title="分配角色"
              @click.prevent="handleSetRoles(scope.row)"
              icon="el-icon-star-off"
              ></el-button>
          </template>
        </el-table-column>
  </el-table>
  <AddRoles ref="rolesEl" v-on:addRoles-success="loadRoles()" />
  <EditRoles ref="editRolesEl" v-on:editRoles-success="loadRoles()" />
  <SetRoles ref="setRolesEl" v-on:set-rights-success="loadRoles()" />
</div>
</template>

<script>
import { rolesList, delRoles, delRolesRights } from '@/api/role'
import AddRoles from './addroles'
import EditRoles from './editRoles'
import SetRoles from './setRoles'
export default {
  name: 'Roles',
  data () {
    return {
      rolesData: []
    }
  },
  components: {
    AddRoles,
    EditRoles,
    SetRoles
  },
  created () {
    this.loadRoles()
  },
  methods: {
    async loadRoles () {
      const { data, meta } = await rolesList()
      if (meta.status === 200) {
        this.rolesData = data
      }
    },
    showAddRoles () {
      this.$refs.rolesEl.rolesShow()
    },
    handelEditRoles (item) {
      this.$refs.editRolesEl.editRolesShow(item)
    },
    async handleDelRoles (item) {
      this.$confirm('是否确定删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { meta } = await delRoles(item.id)
        if (meta.status === 200) {
          this.$message({
            message: '删除角色成功',
            type: 'success'
          })
          this.loadRoles()
        }
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSetRoles (item) {
      this.$refs.setRolesEl.setRolesShow(item)
    },
    async delRights (role, right) {
      const { data, meta } = await delRolesRights(role.id, right.id)
      if (meta.status === 200) {
        role.children = data
      }
    }
  }
}
</script>

<style scoped>
.btn {
  margin-bottom: 15px;
}
.el-tag {
  margin-bottom: 10px;
}
.right {
  margin-right: 5px;
}
.xian {
  border-top: 1px solid #ccc;
}
</style>

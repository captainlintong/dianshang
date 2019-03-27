<template>
<div>
  <el-col :span="4">
    <el-button plain class="btn">添加用户</el-button>
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
            <el-tag closable>{{ first.authName }}</el-tag>
             <i class="el-icon-arrow-right"></i>
          </el-col>
          <el-col :span="21">
            <el-row v-for="second in first.children" :key="second.id" class="xian">
              <el-col :span="4">
                <el-tag type="success" closable>{{ second.authName }}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-tag type="danger" closable v-for="third in second.children" :key="third.id" class="right">{{ third.authName }}</el-tag>
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
              title="编辑用户"
              ></el-button>
            <el-button
              size="small"
              plain
              title="删除用户"
              icon="el-icon-delete"
              ></el-button>
              <el-button
              plain
              size="small"
              title="分配角色"
              icon="el-icon-star-off"
              ></el-button>
          </template>
        </el-table-column>
  </el-table>
</div>
</template>

<script>
import { rolesList } from '@/api/role'
export default {
  name: 'Roles',
  data () {
    return {
      rolesData: []
    }
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

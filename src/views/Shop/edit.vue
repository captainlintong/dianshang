<template>
  <div>
    <el-row>编辑商品信息</el-row>
    <el-steps :active="1">
      <el-step title="步骤 1" icon="el-icon-edit"></el-step>
      <el-step title="步骤 2" icon="el-icon-upload"></el-step>
      <el-step title="步骤 3" icon="el-icon-picture"></el-step>
      <el-step title="步骤 4" icon="el-icon-upload"></el-step>
      <el-step title="步骤 5" icon="el-icon-picture"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: 'editShop',
  data () {
    return {}
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>

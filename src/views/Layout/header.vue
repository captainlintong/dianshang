<template>
  <div>
    <el-row class="app-header">
        <el-col :span="3">
          <img src="./logo.png" alt="黑马程序员">
        </el-col>
        <el-col :span="17" class="pin">品 优 购 后 台 管 理 系 统</el-col>
        <el-col :span="4">
          <a href="#">退出</a>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {}
  }
}
</script>

<style scoped>
.el-header {
  background-color: #ccc;
  padding: 0;
}
.app-header {
  display: flex;
  align-items: center;
  height: 100%;
}
.el-col {
  text-align: center;
  height: 100px;
  line-height: 100px;
  background-color: rgb(84, 92, 100);
  color: rgb(255, 255, 255);
}
.pin {
  font-size: 48px;
  font-family: "华文行楷";
}
.layout-box {
  height: 100%;
}
.el-aside {
  height: 100%;
}
.el-main {
  background-color: #ccc;
}
.el-menu {
  height: 100%;
  background-color: rgb(117, 188, 216);
  border: none;
}
.el-col-3 {
  background-color: #ccc;
  overflow: hidden;
  margin-left: 11px;
  padding: 24px 0;
}
</style>

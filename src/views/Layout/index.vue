<template>
  <el-container class="layout-box">
    <el-header style="height: 100px">
       <AppHeader />
    </el-header>
    <el-container>
      <AppAside />
      <el-main>
        <el-card>
          <div slot="header" class="clearfix header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
              <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <router-view />
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppHeader from './header'
import AppAside from './aside'
export default {
  name: 'Layout',
  data () {
    return {}
  },
  components: {
    AppHeader,
    AppAside
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

.el-col-3 {
  background-color: #ccc;
  overflow: hidden;
  margin-left: 11px;
  padding: 24px 0;
}
.el-container {
  height: 100%;
}
</style>

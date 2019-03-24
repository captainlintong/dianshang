<template>
  <el-container class="layout-box">
    <el-header style="height: 100px">
       <el-row class="app-header">
        <el-col :span="3">
          <img src="./logo.png" alt="黑马程序员">
        </el-col>
        <el-col :span="17" class="pin">品 优 购 后 台 管 理 系 统</el-col>
        <el-col :span="4">
          <a href="#">退出</a>
        </el-col>
    </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-yonghuguanli"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="iconfont icon-ico-"></i>
                用户列表
                </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-quanxianguanli"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="2-1">
                  <i class="iconfont icon-jiaoseliebiao"></i>
                  角色列表
                </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="2-2">
                <i class="iconfont icon-quanxianliebiao"></i>
                权限列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-shangpinguanli"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <i class="iconfont icon-shangpinliebiao"></i>
                商品列表
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-2">
                <i class="iconfont icon-canshu"></i>
                分类参数
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-3">
                <i class="iconfont icon-shangpinfenlei"></i>
                商品分类
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="iconfont icon-dingdanguanli"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">
                <i class="iconfont icon-dingdanliebiao"></i>
                订单列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="iconfont icon-shujutongji"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="-1">
                <i class="iconfont icon-dingdanliebiao"></i>
                数据报表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
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

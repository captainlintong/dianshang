<template>
  <div>
    <el-aside width="200px">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true">
        <el-submenu :index="first.path" v-for="first in menus" :key="first.id">
          <template slot="title">
            <i class="iconfont icon-yonghuguanli"></i>
            <span>{{ first.authName }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="`/${second.path}`" v-for="second in first.children" :key="second.id">
              <i class="iconfont icon-ico-"></i>
              {{ second.authName}}
              </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- <el-submenu index="2">
          <template slot="title">
            <i class="iconfont icon-quanxianguanli"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item-group>
              <el-menu-item index="/roles">
                <i class="iconfont icon-jiaoseliebiao"></i>
                角色列表
              </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/rights">
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
            <el-menu-item index="/shop">
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
        </el-submenu> -->
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import { getRithtMenus } from '@/api/rights'
export default {
  name: 'Aside',
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadRightMenus()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    async loadRightMenus () {
      const { data, meta } = await getRithtMenus()
      if (meta.status === 200) {
        this.menus = data
      }
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
.el-menu li {
  overflow: hidden;
}
.el-col-3 {
  background-color: #ccc;
  overflow: hidden;
  margin-left: 11px;
  padding: 24px 0;
}
</style>

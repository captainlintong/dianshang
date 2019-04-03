<template>
  <div>
    <el-row class="edit">添加商品信息</el-row>
    <el-steps finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!-- 侧边导航 -->
    <el-tabs tab-position="left" @tab-click="handleTabChange">
      <el-tab-pane label="基本信息">
        <el-form :model="formData" label-width="80px" class="form">
          <el-form-item label="商品名称">
            <el-input v-model="formData.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="formData.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="formData.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="formData.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              expand-trigger="hover"
              :options="goodsCategories"
              :props="{
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
              }"
              v-model="formData.goods_cat">
            </el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio-group v-model="formData.is_promote">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">
        <el-row class="attr-row" v-for="attr in goodsCategoryAttrs" :key="attr.attr_id">
          <el-col :span="2">{{ attr.attr_name }}</el-col>
          <el-col :span="22">
          <el-checkbox-group v-model="attr.attr_selected_vals" size="small">
            <el-checkbox
              :label="val"
              border
              v-for="val in attr.attr_vals.split(',')" :key="val.id"></el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-tab-pane>
      <!-- 商品属性 -->
      <el-tab-pane label="商品属性">
        <el-form label-width="150px" >
          <el-form-item :label="item.attr_name" v-for="item in goodsCategoryParams" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 商品属性 -->
      <!-- action是上传打接口地址
            on-preview预览成功的处理函数
            on-remove删除图片树立函数
            :on-preview="handlePreview"
          :on-remove="handleRemove"
       -->
      <el-tab-pane label="商品图片">
        <el-upload
          action="http://localhost:8888/api/private/v1/upload"
          :headers="uploadHeaders"
          :file-list="fileList"
          :on-success="handleUploadSuccess"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容"></el-tab-pane>
    </el-tabs>
    <!-- /侧边导航 -->

    <el-button @click.prevent="remove">取消</el-button>
    <el-button type="primary" @click.prevent="handelSubmit">保存</el-button>

  </div>
</template>

<script>
import { getGoodsCategoryList } from '@/api/goods-categories'
import { addGoods } from '@/api/goods'
import { getGoodsCategoryAttrs } from '@/api/goods-categories-attr'
import { getToken } from '@/until/auth'
export default {
  name: 'addGoods',
  data () {
    return {
      formData: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        is_promote: ''
      },
      goodsCategories: [], // 商品分类数据
      goodsCategoryAttrs: [], // 商品参数
      goodsCategoryParams: [], // 商品属性
      uploadHeaders: { // 上传组件自定义请求头
        Authorization: getToken()
      },
      fileList: []
    }
  },
  created () {
    this.loadGoodsCategories()
  },
  methods: {
    async loadGoodsCategories () { // 级联样式表显示数据
      const { data, meta } = await getGoodsCategoryList()
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    },
    remove () { // 取消添加商品
      this.$router.replace('/goods')
    },
    async handleTabChange (currentTab) { // 标签改变处理
      const { label } = currentTab
      if (label === '商品参数' || label === '商品属性') {
        const { goods_cat } = this.formData
        if (goods_cat.length === 0) {
          return this.$message({
            type: 'waring',
            message: '请选择商品分类'
          })
        }
      }
      if (currentTab.label === '商品参数') {
        this.loadGoodsCategoryAttrs()
      } else if (currentTab.label === '商品属性') {
        this.loadGoodsCategoryParams()
      }
    },
    async loadGoodsCategoryAttrs () { // 加载商品参数数据
      const { goods_cat } = this.formData
      const { data, meta } = await getGoodsCategoryAttrs(goods_cat[goods_cat.length - 1])
      if (meta.status === 200) {
        data.forEach(attr => {
          attr.attr_selected_vals = attr.attr_vals.split(',')
        })
        this.goodsCategoryAttrs = data // 商品参数
      }
    },
    async loadGoodsCategoryParams () { // 加载商品属性
      const { goods_cat } = this.formData
      const { data, meta } = await getGoodsCategoryAttrs(goods_cat[goods_cat.length - 1], 'only')
      if (meta.status === 200) {
        this.goodsCategoryParams = data // 商品属性
      }
    },
    handleUploadSuccess (response, file, fileList) { // 图片上传成功处理函数
      this.fileList.push({
        name: file.name,
        url: `http://localhost:8888/${response.data.tmp_path}`
      })

    },
    async handelSubmit () { // 添加商品
      const { goods_name, goods_price, goods_weight, goods_number, goods_cat } = this.formData
      // 处理商品属性
      const categoryAttrs = this.goodsCategoryAttrs
        .map(attr => {
          return {
            attr_id: attr.attr_id,
            attr_value: attr.attr_selected_vals.join(',')
          }
        })
        .filter(attr => attr.attr_value.length > 0)
      // 处理商品参数
      const categoryParams = this.goodsCategoryParams.map(attr => {
        return {
          attr_id: attr.attr_id,
          attr_value: attr.attr_vals
        }
      })
      // 处理商品图片
      const pics = this.fileList.map(item => {
        const a = document.createElement('a')
        a.href = item.url
        return {
          pic: a.pathname
        }
      })
      // 将商品属性和商品参数合并为一个数组提交给接口
      const attrs = [...categoryAttrs, ...categoryParams]
      const { data, meta } = await addGoods({ goods_name, goods_price, goods_weight, goods_number, goods_cat: goods_cat.join(','), attrs, pics })
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加商品成功'
        })
        this.$router.replace('/goods')
      }
    }
  }
}
</script>

<style scoped>
.edit{
  margin-bottom: 20px;
  background-color: #D7E2EF;
  height: 35px;
  line-height: 35px;
  padding-left: 20px;
}
.form {
  margin-right: 20px;
}
.el-steps {
  margin-bottom: 20px;
}
.attr-row {
  margin-bottom: 15px;
}
.el-checkbox {
  margin-bottom: 10px;
}
</style>

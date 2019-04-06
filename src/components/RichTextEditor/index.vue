<template>
  <div ref="editor" style="text-align:left"></div>
</template>

<script>
import E from 'wangeditor'
import { upload } from '@/api'
export default {
  name: 'RichTextRditor',
  props: ['content'],
  data () {
    return {
      // editorContent: ''
    }
  },
  mounted () {
    var editor = new E(this.$refs.editor)
    // 配置服务器端地址
    editor.customConfig.uploadImgServer = ''
    editor.customConfig.customUploadImg = async (files, insert) => {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      const { data, meta } = await upload(files)
      if (meta.status === 200) {
        insert(`http://localhost:8888/${data.tmp_path}`)
      }
      // 上传代码返回结果之后，将图片插入到编辑器中
      // insert(imgUrl)
    }

    // // 自定义 fileName
    // editor.customConfig.uploadFileName = 'file'
    // // 配置请求上传自定义请求头 添加token
    // editor.customConfig.uploadImgHeaders = {
    //   Authorization: getToken()
    // }
    editor.customConfig.onchange = html => {
      // this.editorContent = html

      // 发布自定义事件--可以传参
      // this.$emit('editor-change', html)

      // this.$emit('update', html)

      this.$emit('update:content', html)
    }
    editor.create()
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    我是用户列表
  </div>
</template>

<script>
import request from '@/until/request'
export default {
  async created () {
    const res = await request({
      methods: 'get',
      url: '/users?pagenum=1&pagesize=5',
    })
    if (res.data.meta.staus === 401) {
      this.$router.push('/login')
    } else {
      console.log(res.data.data);
    }
  },
  name: 'UserList',
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>

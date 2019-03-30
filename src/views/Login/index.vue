<template>
  <div class="login-wrap">
    <div class="login-container">
      <el-form
      label-position="top"
      label-width="80px"
      :model="loginForm"
      :rules="loginFormRules"
      ref="loginFormEl">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="onSubmit" class="login-btn">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAdress } from '@/api'
import { setToken } from '@/until/auth'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.loginFormEl.validate(valid => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    async login () {
      var { data, meta } = await loginAdress(this.loginForm)
      if (meta.status === 200) {
        this.$message({
          message: `管理员${this.loginForm.username}，您登录成功`,
          type: 'success'
        })
        setToken(data.token)
        localStorage.setItem('username', this.loginForm.username)
        // this.$router.replace(`/?username=${this.loginForm.username}`)
        this.$router.replace('/')
      } else {
        this.$message.error(`登录失败${meta.msg}`)
      }
    }
  }
}
</script>

<style scoped>
.login-wrap {
  height: 100%;
  background-color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container {
  width: 500px;
  height: 280px;
  background-color: rgb(122, 190, 218);
  border-radius: 20px;
  padding: 50px;
}
.login-btn {
  width: 100%;
}
</style>

<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名" name="username" type="text" auto-complete="on"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" name="password" type="password" auto-complete="on" @keyup.enter.native="handleLogin"/>
      </el-form-item>
      <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { stringify } from 'querystring';
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm:{
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading:false
    }
  },
  methods:{
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
            this.loading = false;
            if(!res.data.success) return alert(res.data.message || '登录失败')            
            this.$router.replace({path: '/userIndex'})             
          }).catch((err) => {
            this.loading = false;
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted(){
    if(localStorage.getItem('last_login_name')) this.loginForm.username = localStorage.getItem('last_login_name');
    if(localStorage.getItem(this.loginForm.username)) this.loginForm.password = decodeURIComponent(localStorage.getItem(this.loginForm.username));
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login{
  width:100%;
  height:100%;
  background:#f00;
  .login-form{
    width:300px;
    background: rgba(255,255,255,.2);
    position:fixed;
    right:100px;
    top:50%;
    transform:translateY(-50%);
    padding:30px;
  }
  .el-input__inner{
    height:36px;
  }
  .el-button{
    width:100%;
    padding: 10px 20px;
  }
}
</style>

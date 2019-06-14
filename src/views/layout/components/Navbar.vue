<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="isCollapse" class="hamburger-container"/>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">      
      <el-popover
        placement="bottom"
        width="200"
        trigger="click">
        <div>123</div>
        <span slot="reference" class="iconfont nav-ico icon-iconfonterweima"></span>
      </el-popover>
      <router-link class="iconfont nav-ico icon-xiaoxi" :to="{ path: '/updateMessage' }"></router-link>
      <el-dropdown class="avatar-container right-menu-item" @command="handleCommand">
        <div class="avatar-wrapper">
          <i class="iconfont icon-user"></i>{{userInfor.userName}}
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="changeName"><i class="iconfont icon-user"></i>&nbsp;&nbsp;修改登录名</el-dropdown-item>
          <el-dropdown-item command="changePass"><i class="iconfont icon-mima"></i>&nbsp;&nbsp;修改密码</el-dropdown-item>
          <a target="_blank" href="http://help.tiantianzaixian.net/book/shisheng/55.html">
            <el-dropdown-item><i class="iconfont icon-ziliaoshouce"></i>&nbsp;&nbsp;帮助手册</el-dropdown-item>
          </a>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改登录名 -->
    <el-dialog title="修改登录名" :visible.sync="change_name_open" width="500px">
      <ul class="change-dialog">
        <li class="plist">
          <div class="plist-left"><span class="must-fill">*</span>现登录名：</div>
          <div class="plist-right">ss</div>
        </li>
        <li class="plist">
          <div class="plist-left"><span class="must-fill">*</span>新登录名：</div>
          <div class="plist-right"><el-input v-model="newName" clearable placeholder="请输入新用户名"></el-input></div>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="change_name_open = false">取 消</el-button>
        <el-button type="primary" @click="changeName">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="change_pass_open" width="500px">
      <ul class="change-dialog">
        <li class="plist">
          <div class="plist-left"><span class="must-fill">*</span>原始密码：</div>
          <div class="plist-right"><el-input v-model="oldPass" type="password" clearable placeholder="请输入原始密码"></el-input></div>
        </li>
        <li class="plist">
          <div class="plist-left"><span class="must-fill">*</span>新密码：</div>
          <div class="plist-right"><el-input v-model="newPass" type="password" clearable placeholder="请输入新密码"></el-input></div>
        </li>
        <li class="plist">
          <div class="plist-left"><span class="must-fill">*</span>确认密码：</div>
          <div class="plist-right"><el-input v-model="confirmPass" type="password" clearable placeholder="请输入确认密码"></el-input></div>
        </li>
        <li style="color:#f00; padding-left:20px; height:30px;">{{message}}</li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="change_pass_open = false">取 消</el-button>
        <el-button type="primary" @click="changePass">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import Cookies from 'js-cookie'

export default {
  data(){
    return{
      change_name_open:false,
      newName:'',
      change_pass_open:false,
      oldPass:'',
      newPass:'',
      confirmPass:'',
      message:''
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
  computed: {
    isCollapse(){
      return this.$store.state.sidebar.opened;
    },
    userInfor(){
      return this.$store.state.user.userInfor;
    }
  },
  methods: {
    handleCommand(key){
      if(key==="changeName") {
        this.newName = '';
        this.change_name_open = true;
        this.message = '';
        return
      } 
      if(key==="changePass"){
        this.change_pass_open = true;
        this.oldPass = '';
        this.newPass = '';
        this.confirmPass = '';
        this.message = '';
        return
      }  
    },
    changeName(){
      this.change_name_open = false;
    },
    changePass(){
      if(this.newPass !== this.confirmPass) return this.message = '密码不一致';
      localStorage.setItem(Cookies.get('login_name'), this.newName)
      this.change_pass_open = false;
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .change-dialog{
    padding:40px 20px;
    .plist{
      padding:10px;
      line-height:36px;
      .plist-left{
        width:100px;
      }
      input{
        width:100%;
      }
    }
  }
  .nav-ico{
    font-size:16px;
    margin:0 15px;
    color:#666;
    cursor: pointer;
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      padding-right: 30px;
      border-left: 1px solid #d8dce5;
      padding-left:10px;
      cursor: pointer;
      .iconfont{
        margin-right:5px;
      }
      .avatar-wrapper {
        position: relative;
        .user-avatar {          
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

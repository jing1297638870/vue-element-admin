import userApi from '@/api/user'
import Cookies from 'js-cookie'
const user = {
  state: {
    loginName:Cookies.get('login_name') || '', //登录名
    userInfor:{}, //用户信息
  },
  mutations: {
    GET_USER_INFOR: (state, infor) => {     
      state.userInfor = infor;
    }
  },
  actions: {
    // 用户名登录
    LoginByUsername({ commit }, params) {
      return new Promise((resolve, reject) => {
        userApi.login(params).then(res => {
          localStorage.setItem(params.username, encodeURIComponent(params.password));
          localStorage.setItem('last_login_name', params.username);
          Cookies.set('login_name', params.username, { expires: 0.01 });
          resolve(res)
        }).catch(error => reject(error))
      })     
    },
    // 获取用户信息
    GetUserInfo({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        userApi.getUserInfo(params).then(res => {
          commit('GET_USER_INFOR', res.data.result);
          resolve(res)
        }).catch(error => reject(error))
      }) 
    },
    // 退出登录
    LogOut({ commit, state }) {
      Cookies.remove('login_name')
      location.reload()
    },
  }
}

export default user

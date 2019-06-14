import axios from 'axios'

export default {
  //登陆
  login(params) {
    return axios.post('/api/act/login.json', params)
  },
  //获取用户信息
  getUserInfo(params) {
    return axios.post('/api/act/user-infor.json', params)
  }
}


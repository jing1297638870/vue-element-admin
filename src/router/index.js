import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/index'
import manageNav from '@/router/modules/manageNav'

Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
    //登录页
    {
      path: '/',
      component: () => import('@/views/login/index')
    },
    //用户首页
    {
      path: '',
      component: Layout,
      redirect: 'userIndex',
      children: [
        {
          path: '/userIndex',
          component: () => import('@/views/userIndex/index'),
          name: '/userIndex',
          meta: { title: '首页', icon: '', noCache: true }
        }
      ]
    },
    // //更新说明
    {
      path: '',
      component: Layout,
      redirect: 'updateMessage',
      children: [
        {
          path: 'updateMessage',
          component: () => import('@/views/updateMessage/index'),
          name: 'updateMessage',
          meta: { title: '更新说明', icon: '', noCache: true }
        }
      ]
    },
    ...manageNav
  ]
})
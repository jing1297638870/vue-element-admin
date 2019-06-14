import Layout from '@/views/layout/index'
const manageNav = [
  {
    path: '',
    component: Layout,
    redirect: 'form',
    children: [
      {
        path: 'form',
        component: () => import('@/views/form/index'),
        name: 'form',
        meta: { title: '表单', icon: 'xuexiao', noCache: true }
      }
    ]
  }
]

export default manageNav
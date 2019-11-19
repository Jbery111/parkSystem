import Layout from '@/layout'

const carmanageRouter = {
  path: '/carmanage/index',
  component: Layout,
  hidden: false,
  name: 'carmanage',
  meta: {
    title: '车辆车位管理',
    icon: 'car',
    auth_id: 56
  }
  // children: [
  //   {
  //     path: 'index',
  //     hidden: true,
  //     component: () => import('@/views/income/index')
  //   }
  // ]
}
export default carmanageRouter

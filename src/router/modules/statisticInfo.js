import Layout from '@/layout'

const statisticInfoRouter = {
  path: '/statisticInfo/index',
  component: Layout,
  hidden: false,
  name: 'statisticInfo',
  meta: {
    title: 'xxtj',
    icon: 'xinxitongji',
    auth_id: 58
  }
  // children: [
  //   {
  //     path: 'index',
  //     hidden: true,
  //     component: () => import('@/views/income/index')
  //   }
  // ]
}
export default statisticInfoRouter

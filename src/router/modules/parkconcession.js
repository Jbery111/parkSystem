import Layout from '@/layout'

const parkconcessionRouter = {
  path: '/parkconcession/index',
  component: Layout,
  hidden: false,
  name: 'parkconcession',
  meta: {
    title: '停车场优惠',
    icon: 'tcyh',
    auth_id: 55
  }
  // children: [
  //   {
  //     path: 'index',
  //     hidden: true,
  //     component: () => import('@/views/income/index')
  //   }
  // ]
}
export default parkconcessionRouter

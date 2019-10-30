import Layout from '@/layout'

const cooperationRouter = {
  path: '/cooperation',
  component: Layout,
  name: 'cooperation',
  redirect: 'cooperation/EnterpriseInfo',
  meta: {
    title: '合作企业',
    icon: 'cooper3',
    auth_id: 32
  },
  children: [
    {
      path: 'EnterpriseInfo',
      name: 'EnterpriseInfo',
      hidden: true,
      component: () => import('@/views/Cooperation/EnterpriseInfo/index'),
      meta: { title: '企业信息', auth_id: 33 }
    },
    {
      path: 'CompCharge',
      name: 'CompCharge',
      hidden: true,
      redirect: '/cooperation/CompCharge/DepositList',
      component: () => import('@/views/Cooperation/CompCharge/index'),
      meta: { title: '企业收费', auth_id: 34 },
      children: [
        {
          path: 'DepositList',
          component: () => import('@/views/Cooperation/CompCharge/DepositList/index'),
          name: 'DepositList',
          meta: { title: '押金列表', auth_id: 37 }
        }
      ]
    },
    {
      path: 'ReviewList',
      name: 'ReviewList',
      hidden: true,
      component: () => import('@/views/Cooperation/ReviewList/index'),
      meta: { title: '审核列表', auth_id: 36 }
    },

    {
      path: 'RefundList',
      name: 'RefundList',
      hidden: true,
      component: () => import('@/views/Cooperation/RefundList/index'),
      meta: { title: '退款列表', auth_id: 35 }
    }
  ]
}
export default cooperationRouter

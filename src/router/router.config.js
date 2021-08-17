/**
 * 基础路由
 * @type { *[] }
 */
import app from '@/store/modules/app'

export const constantRouterMap = [
  // {
  //   path: '/',
  //   component: () => import('@/views/tabBar/welcome'),
  //   name: 'welcome',
  //   meta: { title: '福恋', keepAlive: false }
  // },
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/language',
    name: 'language',
    component: () => import('@/views/language'),
    meta: {
      title: '选择语言',
      keepAlive: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      title: '注册账号',
      keepAlive: false
    }
  }
]

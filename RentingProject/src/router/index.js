import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/userLogin', name: 'userLogin', component: () => import('@/views/userLogin/index'), hidden: true },
  { path: '/login', name: 'login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/userIndex',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/',
    component: () => import('@/views/index/index'),
    redirect: '/index',
    hidden: true,
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/index/components/index')
      },
      {
        path: '/details',
        name: 'details',
        component: () => import('@/views/details/index')
      },
      {
        path: '/houseList',
        name: 'houseList',
        component: () => import('@/views/houseList/index')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/mySelf/index')
      }
    ]
  },

  {
    path: '/details',
    component: () => import('@/views/details/index'),
    name: 'details',
    hidden: true
  },

  {
    path: '/houserManager',
    component: Layout,
    children: [
      {
        path: 'houserManager',
        name: 'houserManager',
        component: () => import('@/views/houserManager/index'),
        meta: { title: '房屋管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '统计管理', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


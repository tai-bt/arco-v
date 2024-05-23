import { createRouter, createWebHistory } from 'vue-router'
import { menuViews } from './modules/menu-views'
import { noMenuViews } from './modules/nomenu-views'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/layout',
      name: 'layout',
      component: () => import('../views/HomeView.vue'),
      children: menuViews
    },
    ...noMenuViews
  ]
})

// 路由白名单
const ROUTER_WHITE_LIST: string[] = ['/', '/login', '/about'];
/**
 * @description 路由拦截 beforeEach
 * 
*/
router.beforeEach(async (to, form, next) => {

  // 动态设置标题
  const title = '这是一个系统'
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  // 如果当前是要去白名单，则直接放行
  // if (ROUTER_WHITE_LIST.includes(to.path)) {
  //   next()
  // }

  next()
})

export default router

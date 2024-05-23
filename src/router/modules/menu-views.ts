// 显示时需要路由
import { RouteRecordRaw } from "vue-router";

export const menuViews: RouteRecordRaw[] = [
    {
        path: '/test/test1',
        name: 'test1',
        meta: {
          title: '测试1', // 标题
          isLink: '', // 是否是外链
          isHide: false, // 是否在菜单中隐藏
          isKeepAlive: true, // 是否缓存
          isIframe: false, // 是否是内嵌页面
          icon: 'iconfont icon-shouye' // 图标
        },
        component: () => import('@/views/AboutView.vue')
    }
]
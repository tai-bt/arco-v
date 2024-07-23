// 显示时需要路由
import { RouteRecordRaw } from "vue-router";

export const menuViews: RouteRecordRaw[] = [
  {
    path: '/test/test3',
    name: 'test3',
    meta: {
      title: '测试3', // 标题
      isLink: '', // 是否是外链
      isHide: false, // 是否在菜单中隐藏
      isKeepAlive: true, // 是否缓存
      isIframe: false, // 是否是内嵌页面
      icon: 'iconfont icon-shouye' // 图标
    },
    component: () => import('@/views/AboutView.vue')
  },
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
    // component: () => import('@/views/AboutView.vue')
    children: [
      {
        path: '/test/test4',
        name: 'test4',
        meta: {
          title: '测试4', // 标题
          isLink: '', // 是否是外链
          isHide: false, // 是否在菜单中隐藏
          isKeepAlive: true, // 是否缓存
          isIframe: false, // 是否是内嵌页面
          icon: 'iconfont icon-shouye' // 图标
        },
        component: () => import('@/views/AboutView.vue'),
      }
    ]
  },
  {
    path: '/test/test2',
    name: 'test2',
    meta: {
      title: 'D3主菜单', // 标题
      isLink: '', // 是否是外链
      isHide: false, // 是否在菜单中隐藏
      isKeepAlive: true, // 是否缓存
      isIframe: false, // 是否是内嵌页面
      icon: 'iconfont icon-shouye' // 图标
    },
    children: [
      {
        path: '/test/D3',
        name: 'D3',
        meta: {
          title: 'D3', // 标题
          isLink: '', // 是否是外链
          isHide: false, // 是否在菜单中隐藏
          isKeepAlive: true, // 是否缓存
          isIframe: false, // 是否是内嵌页面
          icon: 'iconfont icon-shouye' // 图标
        },
        component: () => import('@/views/d3.vue'),
      }
    ]
  },
  {
    path: 'lazy',
    name: 'lazy',
    meta: {
      title: '懒加载', // 标题
      isLink: '', // 是否是外链
      isHide: false, // 是否在菜单中隐藏
      isKeepAlive: true, // 是否缓存
      isIframe: false, // 是否是内嵌页面
      icon: 'iconfont icon-shouye' // 图标
    },
    children: [
      {
        path: '/layz/ing',
        name: 'ing',
        meta: {
          title: '懒加载', // 标题
          isLink: '', // 是否是外链
          isHide: false, // 是否在菜单中隐藏
          isKeepAlive: true, // 是否缓存
          isIframe: false, // 是否是内嵌页面
          icon: 'iconfont icon-shouye' // 图标
        },
        component: () => import('@/views/lazy.vue'),
      }
    ]
  },
  {
    path: 'upload',
    name: 'upload',
    meta: {
      title: '上传', // 标题
      isLink: '', // 是否是外链
      isHide: false, // 是否在菜单中隐藏
      isKeepAlive: true, // 是否缓存
      isIframe: false, // 是否是内嵌页面
      icon: 'iconfont icon-shouye' // 图标
    },
    children: [
      {
        path: '/upload/compress',
        name: 'compress',
        meta: {
          title: '压缩', // 标题
          isLink: '', // 是否是外链
          isHide: false, // 是否在菜单中隐藏
          isKeepAlive: true, // 是否缓存
          isIframe: false, // 是否是内嵌页面
          icon: 'iconfont icon-shouye' // 图标
        },
        component: () => import('@/views/compress.vue'),
      }
    ]
  },
  {
    path: 'editor',
    name: 'editor',
    meta: {
      title: '富文本编辑器', // 标题
      isLink: '', // 是否是外链
      isHide: false, // 是否在菜单中隐藏
      isKeepAlive: true, // 是否缓存
      isIframe: false, // 是否是内嵌页面
      icon: 'iconfont icon-shouye' // 图标
    },
    children: [
      {
        path: '/editor/wangeditor',
        name: 'wangeditor',
        meta: {
          title: '压缩', // 标题
          isLink: '', // 是否是外链
          isHide: false, // 是否在菜单中隐藏
          isKeepAlive: true, // 是否缓存
          isIframe: false, // 是否是内嵌页面
          icon: 'iconfont icon-shouye' // 图标
        },
        component: () => import('@/views/editor/wangEditor.vue'),
      }
    ]
  }
]
import { createApp } from 'vue'
import pinia from './stores'

import App from './App.vue'
import router from './router'

// 公共css
import './styles/index.scss'
import './styles/t-lib.scss'
import './styles/t-reset.scss'

// svg icons
import "virtual:svg-icons-register";
// Arco
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

// 多语言
import i18n from './i18n';

const app = createApp(App)
app.use(pinia)

// 自定义指令（用来loading的，详见文件内注释）
import { axiosLoadingDirective } from './directives/axiosLoading'
// 注册自定义指令
app.directive('axios-loading', axiosLoadingDirective)

app.use(i18n)

app.use(router)
app.use(ArcoVue, {
    /**
     * 用来配置组件名前缀   默认值为 a-button   可以修改为 **-button(改完之后所有用到的组件都需要同步修改，否则组件琺使用)
    */
    // componentPrefix: 'dpl'
})

app.mount('#app')

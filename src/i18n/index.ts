import { createI18n } from 'vue-i18n';

import { en } from './language/en';
import { zh } from './language/zh';

// 创建 Vue I18n 实例
const i18n = createI18n({
    locale: 'zh', // 设置默认语言
    // fallbackLocale: 'zh', // 设置回退语言
    // allowComposition: true,
    // legacy: false,
    messages: {
      en,
      zh,
    },
});
  
export default i18n;
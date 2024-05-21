import type { DirectiveBinding } from 'vue'
import { computed, watch } from 'vue'
import { axiosCounterStore } from '@/stores/modules/axios'
import loadingSvg from '../assets/svgIcon/loading.svg'

// 使用计算属性，否则会报再pinia未注册前就使用了
const axiosCounter:any = computed(() => {
  return axiosCounterStore().couaxiosStateMapnt
})

interface LoadingElement extends HTMLElement {
  __originalDisplay?: string;
  loadingElement: any
}


const setLoading = (el: LoadingElement, isLoading: boolean) => {
  if (window.getComputedStyle(el).getPropertyValue('position') == 'static') {
    el.style.position = 'relative';
  }
  
  const showLoading = () => {
    // 创建loading元素
    let loadingElement = el.loadingElement;
    if (loadingElement) {
      loadingElement.style.display = 'flex';
    } else {
      loadingElement = document.createElement('span');
      loadingElement.classList.add('loadingElementDirectives')
      loadingElement.style.position = 'absolute';
      loadingElement.style.top = '0';
      loadingElement.style.left = '0';
      loadingElement.style.width = '100%';
      loadingElement.style.height = '100%';
      loadingElement.style.display = 'flex';
      loadingElement.style.alignItems = 'center';
      loadingElement.style.justifyContent = 'center';
      loadingElement.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
      loadingElement.style.zIndex = '9999';
      loadingElement.innerHTML = `<img src="${loadingSvg}" alt="loading" class='loading-spinner' />`;
      el.appendChild(loadingElement);
      el.loadingElement = loadingElement;
    }

  };

  const hideLoading = () => {
    const loadingElement = el.loadingElement;
    if (loadingElement) {
      loadingElement.parentNode?.removeChild(loadingElement);
      delete el.loadingElement;
    }
    el.style.position = 'static';
  };
  
  if (isLoading) {
    showLoading()
  } else {
    hideLoading()
  }
};
/**
 * 使用方式  v-axios-loading="'/brandArchives/getInternalBrandList'"
 * 具体逻辑：
 *    在axios请求拦截器那以当前接口为key给pinia的axiosCounterStore添加一个值，值为true，然后再指令中监听变化，如果有相应的接口，则进行loading
 *    在axios响应拦截器那删除相应的key，然后再指令中监听变化，如果没找到，证明完事了
*/
export const axiosLoadingDirective = {
  mounted(el: LoadingElement, binding: DirectiveBinding) {
    // 初始化状态
    setLoading(el, false);

    watch(
      () => axiosCounter.value,
      (newVal) => {
        // 初始化状态
        if (typeof binding.value == 'string') {
          setLoading(el, newVal[binding.value]);
        } else if (Array.isArray(binding.value)) {
          let is = binding.value.some((item) => {
            return newVal[item]
          })
          setLoading(el, is);
        }
      }
    )
  }
};
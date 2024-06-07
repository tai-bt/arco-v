import { computed } from 'vue'
import axios from "axios";
import { axiosCounterStore } from '@/stores/modules/axios'
import { Message } from '@arco-design/web-vue';

const axiosCounter:any = computed(() => {
	return axiosCounterStore()
})

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_AXIOX_BASEURL, // API 请求的默认前缀
	timeout: 1000 * 60 *5, // 设置请求超时时间
	withCredentials: true, // 跨域时候允许携带凭证
});

// 请求拦截器
axiosInstance.interceptors.request.use(
	config => {
		// 记录当前Url，用来判断是否显示loading
		axiosCounter.value.addKey(config.url)
		// 设置hearder
		config.headers.token = window.localStorage.getItem('token') || "5063007c-8401-49ab-8240-a29407478e1d";
		return config;
	},
	error => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 响应拦截器
axiosInstance.interceptors.response.use(
	response => {
		// 移除当前Url
		axiosCounter.value.delKey(response.config.url)
		// 响应数据
		if (response.data.subCode && response.data.subCode !== 10002) {
			Message.error(response.data.subMessage)
			return Promise.reject(response.data);
		}
		return response.data;
	},
	error => {
		// 对响应错误做些什么
		switch (error.response.status) {
			// 未找到服务
			case 404:
				Message.error("服务未找到:" + error.response.config.url);
				break;
			//
			case 504:
				Message.error("网关超时:" + error.response.config.url);
				break;
			default:
				console.log(error.response);
			break;
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;

import { computed } from 'vue'
import axios from "axios";
import { axiosCounterStore } from '@/stores/modules/axios'
const axiosCounter:any = computed(() => {
	return axiosCounterStore()
})

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_AXIOX_BASEURL, // 替换为你的 API 基地址
	timeout: 1000 * 60 *5, // 设置请求超时时间
	withCredentials: true, // 跨域时候允许携带凭证
	headers: {
		token: "5063007c-8401-49ab-8240-a29407478e1d"
	}
});

// 请求拦截器
axiosInstance.interceptors.request.use(
	config => {
		// 在发送请求之前做些什么
		axiosCounter.value.addKey(config.url)
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
		axiosCounter.value.delKey(response.config.url)
		// 对响应数据做些什么
		return response.data;
	},
	error => {
		// 对响应错误做些什么
		return Promise.reject(error);
	}
);

export default axiosInstance;

import Axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';
import storage from '@/utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
	const token = storage.getToken();
	if (token) {
		(config.headers as AxiosHeaders).set('authorization', `${token}`);
	}

	return config;
}

const axios = Axios.create({
	// baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
});

// TODO: Cookie 설정을 위한 영휘 님과 백엔드 논의 (이후 withCredentials 설정)
axios.defaults.withCredentials = true;

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axios;

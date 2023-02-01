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
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

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

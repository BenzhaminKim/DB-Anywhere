// eslint-disable-next-line import/no-extraneous-dependencies
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';
import storage from '@/utils/storage';

class ApiService {
	public session: AxiosInstance;

	private static instance: ApiService;

	constructor() {
		this.session = axios.create({
			baseURL: `${API_URL}`,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json;charset=UTF-8',
			},
		});

		this.session.interceptors.request.use((config) => {
			const newAxiosRequestConfig = config;
			const token = storage.getToken();
			if (token) {
				newAxiosRequestConfig.headers.authorization = `${token}`;
			}
			newAxiosRequestConfig.headers.Accept = 'application/json';
			return config;
		});
	}

	static getInstance() {
		if (!ApiService.instance) {
			ApiService.instance = new ApiService();
		}
		return ApiService.instance;
	}

	get<T>(url: string, config?: AxiosRequestConfig) {
		return this.session.get<T>(url, config);
	}

	post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
		return this.session.post<T>(url, data, config);
	}

	put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
		return this.session.put<T>(url, data, config);
	}

	patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
		return this.session.patch<T>(url, data, config);
	}

	delete<T>(url: string, config?: AxiosRequestConfig) {
		return this.session.delete<T>(url, config);
	}
}

export default ApiService.getInstance();

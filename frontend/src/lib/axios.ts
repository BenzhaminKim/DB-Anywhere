// eslint-disable-next-line import/no-extraneous-dependencies
import axios, { AxiosInstance } from 'axios';

import { API_URL } from '@/config';
import storage from '@/utils/storage';

class ApiService {
	public session: AxiosInstance;

	private static instance: ApiService;

	constructor() {
		this.session = axios.create({
			baseURL: `${API_URL}/api`,
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
}

export default ApiService.getInstance();

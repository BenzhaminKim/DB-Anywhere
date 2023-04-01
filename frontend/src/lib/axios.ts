import Axios from 'axios';

const axios = Axios.create({
	// baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
});

// TODO: Cookie 설정을 위한 영휘 님과 백엔드 논의 (이후 withCredentials 설정)
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axios;

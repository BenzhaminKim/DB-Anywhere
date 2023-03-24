import axios from '@/lib/axios';

const logout = (): Promise<undefined> => {
	return axios.post('/api/v1/users/logout');
};

export default logout;

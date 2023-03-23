import axios from '@/lib/axios';
import { AuthUser } from '../types';

const getUser = (): Promise<AuthUser> => {
	return axios.get('/api/v1/users/profile');
};

export default getUser;

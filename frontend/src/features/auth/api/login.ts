import axios from '@/lib/axios';
import { LoginResponse } from '../types';

export type LoginCredentialsDTO = {
	email: string;
	password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<LoginResponse> => {
	return axios.post('/api/v1/users/login', data);
};

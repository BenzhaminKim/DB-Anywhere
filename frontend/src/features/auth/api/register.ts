import axios from '@/lib/axios';
import { LoginResponse } from '../types';

export type RegisterCredentialsDTO = {
	name: string;
	email: string;
	password: string;
};

export const registerWithEmailAndPassword = (data: RegisterCredentialsDTO): Promise<LoginResponse> => {
	return axios.post('/v1/users/register', data);
};

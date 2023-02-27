// eslint-disable-next-line import/no-extraneous-dependencies
import { configureAuth } from 'react-query-auth';
import storage from '@/utils/storage';
import {
	getUser,
	LoginCredentialsDTO,
	loginWithEmailAndPassword,
	RegisterCredentialsDTO,
	registerWithEmailAndPassword,
} from '@/features/auth';
import axios from '@/lib/axios';

async function userFn() {
	if (axios.defaults.headers.common.Authorization) {
		const data = await getUser();
		return data;
	}
	return null;
}

async function loginFn(data: LoginCredentialsDTO) {
	const response = await loginWithEmailAndPassword(data);
	// accessToken 설정
	axios.defaults.headers.common.Authorization = `Bearer ${response.token}`;
	const user = await userFn();
	return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
	await registerWithEmailAndPassword(data);
	return null;
}

async function logoutFn() {
	storage.clearToken();
	window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
	userFn,
	loginFn,
	registerFn,
	logoutFn,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } = configureAuth(authConfig);

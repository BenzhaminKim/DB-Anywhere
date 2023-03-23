// eslint-disable-next-line import/no-extraneous-dependencies
import { configureAuth } from 'react-query-auth';
import {
	getUser,
	LoginCredentialsDTO,
	loginWithEmailAndPassword,
	RegisterCredentialsDTO,
	registerWithEmailAndPassword,
	logout,
} from '@/features/auth';
import axios from '@/lib/axios';
import USER_QUERY_KEY from '@/features/auth/constants/auth';

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
	await logout();
	axios.defaults.headers.common.Authorization = undefined;
}

const authConfig = {
	userFn,
	userKey: USER_QUERY_KEY,
	loginFn,
	registerFn,
	logoutFn,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } = configureAuth(authConfig);

import axios from '@/lib/axios';
import { LoginResponse } from '../types';
import { useQuery } from '@tanstack/react-query';
import { ExtractFnReturnType } from '@/lib/react-query';

export const silentRefreshWithToken = (): Promise<LoginResponse> => {
	return axios.post('/api/v1/users/refresh');
};

type QueryFnType = typeof silentRefreshWithToken;

export const requestTokenWithRefresh = () => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['refreshToken'],
	});
};

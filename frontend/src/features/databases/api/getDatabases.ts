import { useQuery } from '@tanstack/react-query';

import axios from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Database } from '../types';

export const getDatabases = (): Promise<{ databases: Database[] }> => {
	return axios.get('/api/v1/databases');
};

type QueryFnType = typeof getDatabases;

type UseDatabasesOptions = {
	config?: QueryConfig<QueryFnType>;
};

export const useDatabases = ({ config }: UseDatabasesOptions = {}) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		...config,
		queryKey: ['databases'],
		queryFn: () => getDatabases(),
	});
};

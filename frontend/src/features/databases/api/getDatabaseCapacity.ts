import { useQuery } from '@tanstack/react-query';

import axios from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { DatabaseCapacity } from '../types';

export const getDatabaseCapacity = (): Promise<DatabaseCapacity> => {
	return axios.get('/api/v1/databases/capacity');
};

type QueryFnType = typeof getDatabaseCapacity;

type UseDatabaseCapacityOptions = {
	config?: QueryConfig<QueryFnType>;
};

export const useDatabaseCapacity = ({ config }: UseDatabaseCapacityOptions = {}) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		...config,
		queryKey: ['databaseCapacity'],
		queryFn: () => getDatabaseCapacity(),
	});
};

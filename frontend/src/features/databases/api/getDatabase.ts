import { useQuery } from '@tanstack/react-query';

import axios from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Database } from '../types';

export const getDatabase = ({ databaseId }: { databaseId: string }): Promise<Database> => {
	return axios.get(`/api/v1/databases/${databaseId}`);
};

type QueryFnType = typeof getDatabase;

type UseDatabaseOptions = {
	databaseId: string;
	config?: QueryConfig<QueryFnType>;
};

export const useDatabase = ({ databaseId, config }: UseDatabaseOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		...config,
		queryKey: ['database', databaseId],
		queryFn: () => getDatabase({ databaseId }),
	});
};

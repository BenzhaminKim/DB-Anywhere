import { useMutation } from '@tanstack/react-query';

import axios from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { Database } from '../types';

export type EditDatabaseDTO = {
	data: {
		name: string;
	};
	databaseId: string;
};

export const updateDatabase = ({ data, databaseId }: EditDatabaseDTO): Promise<Database> => {
	return axios.patch(`/api/v1/databases/${databaseId}`, data);
};

type UseUpdateDatabasesOptions = {
	config?: MutationConfig<typeof updateDatabase>;
};

export const useUpdateDatabase = ({ config }: UseUpdateDatabasesOptions = {}) => {
	return useMutation({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['databases'] });
			await queryClient.invalidateQueries({ queryKey: ['database'] });
		},
		...config,
		mutationFn: updateDatabase,
	});
};

import { useMutation } from '@tanstack/react-query';

import axios from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export const deleteDatabase = ({ databaseId }: { databaseId: string }) => {
	return axios.delete(`/api/v1/databases/${databaseId}`);
};

type UseDeleteDatabasesOptions = {
	databaseId: string;
	config?: MutationConfig<typeof deleteDatabase>;
};

export const useDeleteDatabase = ({ config }: UseDeleteDatabasesOptions) => {
	return useMutation({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['databases'] });
			await queryClient.invalidateQueries({ queryKey: ['databaseCapacity'] });
		},
		...config,
		mutationFn: deleteDatabase,
	});
};

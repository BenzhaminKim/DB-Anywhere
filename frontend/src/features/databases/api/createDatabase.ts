import { useMutation } from '@tanstack/react-query';

import axios from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { Database } from '../types';

export type CreateDatabaseDTO = {
	name: string;
	type: string;
	db_name: string;
	db_user: string;
	db_password: string;
	db_capacity: number;
};

export const createDatabase = (data: CreateDatabaseDTO): Promise<Database> => {
	return axios.post('/v1/databases', data);
};

type UseCreateDatabasesOptions = {
	config?: MutationConfig<typeof createDatabase>;
};

export const useCreateDatabase = ({ config }: UseCreateDatabasesOptions = {}) => {
	return useMutation({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['databases'] });
		},
		...config,
		mutationFn: createDatabase,
	});
};

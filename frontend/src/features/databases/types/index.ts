export type Database = {
	id: string;
	name: string;
	type: string;
	db_name: string;
	db_user: string;
	db_capacity: number;
	status: string;
	db_password: string;
	db_port: 0;
	db_host: string;
	created_at: string;
};

export type DatabaseCapacity = {
	current_capacity: number;
	maximum_capacity: number;
	unit: string;
};

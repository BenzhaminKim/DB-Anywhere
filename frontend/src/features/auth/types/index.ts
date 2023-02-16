export type AuthUser = {
	id: string;
	email: string;
	name: string;
	created_at: string;
};

export type LoginResponse = {
	token: string;
};

const STORAGE_TOKEN_KEY = 'db-anywhere_token';

const storage = {
	getToken: () => {
		return JSON.parse(window.localStorage.getItem(STORAGE_TOKEN_KEY) as string);
	},
	setToken: (token: string) => {
		window.localStorage.setItem(STORAGE_TOKEN_KEY, JSON.stringify(token));
	},
	clearToken: () => {
		window.localStorage.removeItem(STORAGE_TOKEN_KEY);
	},
};

export default storage;

export type User = {
	id: number;
	email: string;
	role: string;
};

export type AuthContextType = {
	user: User | null;
	isAuthenticated: boolean;
	login: (identifier: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
};

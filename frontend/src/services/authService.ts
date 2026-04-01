import api from "./api";

export type AuthResponse = {
	access_token: string;
	refresh_token: string;
};

export const login = async (identifier: string, password: string): Promise<AuthResponse> => {
	const res = await api.post<AuthResponse>('/auth/login', {
		identifier,
		password,
	});

	localStorage.setItem('access_token', res.data.access_token);
	localStorage.setItem('refresh_token', res.data.refresh_token);

	return res.data;
};

export const register = async (username: string, email: string, password: string): Promise<AuthResponse> => {
	const res = await api.post<AuthResponse>('/auth/register', {
		username,
		email,
		password,
	});

	localStorage.setItem('access_token', res.data.access_token);
	localStorage.setItem('refresh_token', res.data.refresh_token);

	return res.data;
};

export const logout = async (): Promise<void> => {
	try {
		await api.post('/auth/logout');
	} finally {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
	}
};

import api from './api';

export type UserType = {
	id: number;
	email: string;
	role: string;
};

export const getMe = async (): Promise<UserType> => {
	const res = await api.get<UserType>('/users/me');
	return res.data;
};

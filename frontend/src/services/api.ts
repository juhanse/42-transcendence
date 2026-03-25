import axios, { type InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = localStorage.getItem('access_token');

	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

api.interceptors.response.use(
	(res) => res,
	async (error) => {
		const originalRequest = error.config;

		const refreshToken = localStorage.getItem('refresh_token');

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			refreshToken
		) {
			originalRequest._retry = true;

			try {
				const res = await axios.post(
					`${import.meta.env.VITE_API_URL}/auth/refresh`,
					{ refresh_token: refreshToken }
				);

				const newAccessToken = res.data.access_token;

				localStorage.setItem('access_token', newAccessToken);

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return api(originalRequest);
			} catch {
				localStorage.removeItem('access_token');
				localStorage.removeItem('refresh_token');
			}
		}

		return Promise.reject(error);
	}
);

export default api;

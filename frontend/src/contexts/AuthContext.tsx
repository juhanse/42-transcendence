/* eslint-disable react-refresh/only-export-components */
import { createContext,	useContext,	useEffect, useState, type ReactNode } from 'react';
import { login as loginService, logout as logoutService, getMe } from '../services/userService';
import type { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const init = async () => {
			try {
				const user = await getMe();
				setUser(user);
				setIsAuthenticated(true);
			} catch {
				setUser(null);
				setIsAuthenticated(false);
			}
		};

		init();
	}, []);

	const login = async (identifier: string, password: string): Promise<void> => {
		await loginService(identifier, password);
		const user = await getMe();
		setUser(user);
		setIsAuthenticated(true);
	};

	const logout = async (): Promise<void> => {
		await logoutService();
		setUser(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};

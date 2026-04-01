import api from "./api";

export type LeaderboardType = {
	id: string | number;
	username: string;
	avatarUrl: string;
	score: number;
}[];

export const getLeadboard = async (count: number): Promise<LeaderboardType> => {
	const res = await api.get<LeaderboardType>('/games/leaderboard/', { params: { count } });
	return res.data;
};

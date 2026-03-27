export type CreateGame = {
	userId: number;
	miniGames: string[];
}

export type InteractGame = {
	userId: number;
	code: string;
};

export type PointsGame = {
	userId: number;
	code: string;
	points: number;
}

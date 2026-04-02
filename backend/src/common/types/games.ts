export type PlayerGame = {
	userId: number;
	socketId: string;
	score: number;
};

export type Game = {
	code: string;
	hostId: number;
	players: Map<number, PlayerGame>;
	miniGames: string[];
	currentMiniGameIndex: number;
	started: boolean;
};

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

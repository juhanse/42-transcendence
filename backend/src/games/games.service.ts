import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { User } from 'src/common/models/user.entity';
import { Repository } from 'typeorm';

type Player = {
	userId: number;
	socketId: string;
	score: number;
};

type Game = {
	code: string;
	hostId: number;
	players: Map<number, Player>;
	miniGames: string[];
	currentMiniGameIndex: number;
	started: boolean;
};

@Injectable()
export class GamesService {
	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

	private games = new Map<string, Game>();

	private generateCode(): string {
		return randomBytes(3).toString('hex');
	}

	createGame(userId: number, miniGames: string[]): Game {
		const code = this.generateCode();

		const game: Game = {
			code,
			hostId: userId,
			players: new Map(),
			miniGames,
			currentMiniGameIndex: 0,
			started: false,
		};

		this.games.set(code, game);
		return game;
	}

	joinGame(code: string, userId: number, socketId: string) {
		const game = this.games.get(code);
		if (!game) throw new Error('Game not found');

		game.players.set(userId, {
			userId,
			socketId,
			score: 0,
		});

		return game;
	}

	startGame(code: string, userId: number) {
		const game = this.games.get(code);
		if (!game) throw new Error('Game not found');
		if (game.hostId !== userId) throw new Error('Not host');

		game.started = true;
		return game;
	}

	getLeaderboard(count: number, code?: string) {
		if (code) {
			const game = this.games.get(code);
			if (!game) return [];

			return Array.from(game.players.values()).sort((a, b) => b.score - a.score).slice(0, count);
		}

		const users = this.userRepository.find({
			order: {
				xpTotal: 'DESC',
			},
			take: count,
		});

		return users;
	}

	addScore(code: string, userId: number, points: number) {
		const game = this.games.get(code);
		if (!game) return;

		const player = game.players.get(userId);
		if (!player) return;

		player.score += points;
	}

	nextMiniGame(code: string) {
		const game = this.games.get(code);
		if (!game) return;

		game.currentMiniGameIndex++;

		if (game.currentMiniGameIndex >= game.miniGames.length) {
			return 'END';
		}

		return game.miniGames[game.currentMiniGameIndex];
	}
}

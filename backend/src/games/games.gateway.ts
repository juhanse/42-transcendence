import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GamesService } from './games.service';
import { CreateGame, InteractGame, PointsGame } from 'src/common/types/games';

@WebSocketGateway({ cors: { origin: '*' } })
export class GamesGateway {
	@WebSocketServer()
	server: Server;

	constructor(private readonly gamesService: GamesService) { }

	@SubscribeMessage('createGame')
	handleCreateGame(@MessageBody() body: CreateGame, @ConnectedSocket() client: Socket) {
		const game = this.gamesService.createGame(body.userId, body.miniGames);

		void client.join(game.code);

		return { code: game.code };
	}

	@SubscribeMessage('joinGame')
	handleJoinGame(@MessageBody() body: InteractGame, @ConnectedSocket() client: Socket) {
		const game = this.gamesService.joinGame(body.code, body.userId, client.id);

		void client.join(game.code);

		this.server.to(game.code).emit('playerJoined', {
			userId: body.userId,
		});

		return { success: true };
	}

	@SubscribeMessage('startGame')
	handleStartGame(@MessageBody() body: InteractGame) {
		const game = this.gamesService.startGame(body.code, body.userId);

		this.server.to(body.code).emit('gameStarted', {
			miniGame: game.miniGames[0],
		});
	}

	@SubscribeMessage('submitScore')
	handleScore(@MessageBody() body: PointsGame) {
		this.gamesService.addScore(body.code, body.userId, body.points);

		const leaderboard = this.gamesService.getLeaderboard(5, body.code);
		this.server.to(body.code).emit('leaderboardUpdate', leaderboard);
	}

	@SubscribeMessage('nextMiniGame')
	handleNext(@MessageBody() body: { code: string }) {
		const next = this.gamesService.nextMiniGame(body.code);

		if (next === 'END') {
			const leaderboard = this.gamesService.getLeaderboard(5, body.code);

			this.server.to(body.code).emit('gameEnded', leaderboard);
			return;
		}

		this.server.to(body.code).emit('nextMiniGame', next);
	}
}

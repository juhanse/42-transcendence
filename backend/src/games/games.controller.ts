import { Controller, Get, Query } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
	constructor(private readonly gamesService: GamesService) { }

	@Get('leaderboard')
	getLeaderboard(@Query('count') count: string) {
		return this.gamesService.getLeaderboard(Number(count));
	}
}

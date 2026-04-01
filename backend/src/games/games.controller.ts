import { Controller, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
	constructor(private readonly gamesService: GamesService) { }

	@Get('leaderboard')
	getLeaderboard(@Param('count') count: string) {
		return this.gamesService.getLeaderboard(Number(count));
	}
}

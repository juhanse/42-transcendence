import { Module } from '@nestjs/common';
import { GamesGateway } from './games.gateway';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games.controller';
import { User } from 'src/common/models/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [GamesController],
	providers: [GamesGateway, GamesService],
	exports: [GamesService],
})

export class GamesModule { }

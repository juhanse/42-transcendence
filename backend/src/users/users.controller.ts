import { Controller, Get, Patch, Delete, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/strategies/jwt.guard';
import { JwtPayload } from '../common/strategies/jwt.strategy';
import { UpdateUserDto } from '../common/dtos/users.dto'
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Get('me')
	getCurrentUser(@CurrentUser() user: JwtPayload) {
		return this.usersService.getUser(user.sub);
	}

	@Patch('me')
	updateUser(@CurrentUser() user: JwtPayload, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.updateUser(user.sub, updateUserDto);
	}

	@Delete('me')
	deleteUser(@CurrentUser() user: JwtPayload) {
		return this.usersService.deleteUser(user.sub);
	}
}

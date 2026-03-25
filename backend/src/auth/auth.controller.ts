import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { JwtAuthGuard } from './strategies/jwt.guard';
import { JwtPayload } from './strategies/jwt.strategy';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	async login(@Body() body: LoginUserDto) {
		return await this.authService.login({ authlogin: body });
	}

	@Post("register")
	async register(@Body() body: RegisterUserDto) {
		return await this.authService.register({ authregister: body });
	}

	@Post('refresh')
	async refresh(@Body('refresh_token') refreshToken: string) {
		return await this.authService.refresh(refreshToken);
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	logout(@CurrentUser() user: JwtPayload) {
		return this.authService.logout(user.sub);
	}
}

import { Injectable, UnauthorizedException,	ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../common/models/user.entity';
import { LoginUserDto, RegisterUserDto } from '../common/dtos/users.dto';
import { JwtPayload } from '../common/strategies/jwt.strategy';

@Injectable()
export class AuthService {
	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly jwtService: JwtService) {}

	async register({ authregister }: { authregister: RegisterUserDto }) {
		const { username, email, password } = authregister;

		const existing = await this.userRepository.findOne({
			where: [{ email }, { username }],
		});
		if (existing) throw new ConflictException();

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = this.userRepository.create({
			username,
			email,
			passwordHash: hashedPassword,
		});

		await this.userRepository.save(user);

		return this.generateTokens(user);
	}

	async login({ authlogin }: { authlogin: LoginUserDto }) {
		const { identifier, password } = authlogin;

		const user = await this.userRepository.findOne({
			where: [
				{ email: ILike(identifier) },
				{ username: ILike(identifier) },
			],
		});

		if (!user) throw new UnauthorizedException();

		const isValid = await bcrypt.compare(password, user.passwordHash);
		if (!isValid) throw new UnauthorizedException();

		return this.generateTokens(user);
	}

	async refresh(refreshToken: string) {
		try {
			const payload = this.jwtService.verify<JwtPayload>(refreshToken, {
				secret: process.env.JWT_REFRESH_SECRET,
			});
	
			const user = await this.userRepository.findOne({
				where: { id: payload.sub },
			});
	
			if (!user) throw new UnauthorizedException();
	
			const access_token = this.jwtService.sign(
				{
					sub: user.id,
					email: user.email,
					role: user.role,
				},
				{
					secret: process.env.JWT_SECRET,
					expiresIn: '15m',
				},
			);
	
			return { access_token };
		} catch {
			throw new UnauthorizedException();
		}
	}

	async logout(userId: number) {
		if (!userId) throw new UnauthorizedException();
		await this.userRepository.update(userId, { refreshToken: null });
		return { success: true };
	}

	private async generateTokens(user: User) {
		const payload = {
			sub: user.id,
			email: user.email,
			role: user.role,
		};

		const access_token = this.jwtService.sign(payload, {
			secret: process.env.JWT_SECRET,
			expiresIn: '15m',
		});

		const refresh_token = this.jwtService.sign(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: '7d',
		});

		const hashedRefresh = await bcrypt.hash(refresh_token, 10);

		await this.userRepository.update(user.id, {
			refreshToken: hashedRefresh,
		});

		return { access_token, refresh_token };
	}
}

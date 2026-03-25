import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class LoginUserDto {
	@IsNotEmpty()
	identifier: string;

	@IsNotEmpty()
	@MinLength(8)
	password: string;
}

export class RegisterUserDto {
	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty()
	@IsEmail({}, { message: 'Invalid email format' })
	email: string;

	@IsNotEmpty()
	@MinLength(8, { message: 'Password must be at least 8 characters long' })
	password: string;
}

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	username?: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	password?: string;

	@IsOptional()
	@IsString()
	role?: string;

	@IsOptional()
	@IsString()
	avatarUrl?: string;

	@IsOptional()
	@IsString()
	bio?: string;

	@IsOptional()
	@IsEnum(['online', 'offline'])
	status?: 'online' | 'offline';

	@IsOptional()
	@IsInt()
	@Min(0)
	xpTotal?: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	level?: number;

	@IsOptional()
	@IsInt()
	gradeId?: number;
}

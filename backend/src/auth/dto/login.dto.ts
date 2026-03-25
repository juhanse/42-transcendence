import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
	@IsNotEmpty()
	identifier: string;

	@IsNotEmpty()
	@MinLength(8)
	password: string;
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../common/models/user.entity';
import { UpdateUserDto } from '../common/dtos/users.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

	async getUser(id: number) {
		const user = await this.userRepository.findOne({
			where: { id },
			select: {
				id: true,
				email: true,
				username: true,
				role: true,
				avatarUrl: true,
				bio: true,
				status: true,
				xpTotal: true,
				level: true,
				gradeId: true,
				updatedAt: true,
				createdAt: true,
			},
		});

		if (!user) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		return user;
	}

	async updateUser(id: number, updateUserDto: UpdateUserDto) {
		const { password, ...rest } = updateUserDto;
		const dataToUpdate: Partial<User> = { ...rest };

		if (password) {
			dataToUpdate.passwordHash = await hash(password, 10);
		}

		const updatedUser = await this.userRepository.save({
			id,
			...dataToUpdate,
		});

		return this.getUser(id);
	}

	async deleteUser(id: number) {
		const user = await this.userRepository.findOne({ where: { id } });

		if (!user) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		await this.userRepository.delete(id);

		return { message: 'User deleted successfully.' };
	}
}

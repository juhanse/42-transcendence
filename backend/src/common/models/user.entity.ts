import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column({ unique: true })
	email: string;

	@Column({ name: 'password_hash' })
	passwordHash: string;

	@Column({ nullable: true })
	role: string;

	@Column({ name: 'refresh_token', type: 'text', nullable: true, select: false })
	refreshToken: string | null;

	@Column({ name: 'avatar_url', nullable: true })
	avatarUrl: string;

	@Column({ nullable: true })
	bio: string;

	@Column({
		type: 'enum',
		enum: ['online', 'offline'],
		default: 'offline',
	})
	status: 'online' | 'offline';

	@Column({ name: 'xp_total', default: 0 })
	xpTotal: number;

	@Column({ default: 1 })
	level: number;

	@Column({ name: 'grade_id', nullable: true })
	gradeId: number;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;
}

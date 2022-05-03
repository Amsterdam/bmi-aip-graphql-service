import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

import type { IUserRepository, DBUser } from './types/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
	public constructor(private readonly prisma: PrismaService) {}

	public async getUserByEmail(email: string): Promise<DBUser> {
		const user = await this.prisma.users.findFirst({
			where: {
				emailAddress: email,
			},
		});

		if (!user) {
			throw new NotFoundException('Unable to find user by email');
		}

		return user;
	}
}

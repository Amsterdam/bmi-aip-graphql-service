import { Injectable } from '@nestjs/common';

import { UserFromToken } from '../../authorization/types';

import { User } from './models/user.model';
import { UserFactory } from './user.factory';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(private readonly userRepo: UserRepository) {}

	async getUser(user: UserFromToken): Promise<User> {
		const dbUser = await this.userRepo.getUserByEmail(user.email);
		return UserFactory.AggregateUser(dbUser, user);
	}
}

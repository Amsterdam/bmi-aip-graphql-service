import { MockedObjectDeep } from 'ts-jest';
import { PrismaService } from '../../prisma.service';
import { UserRepository } from './user.repository';
import { user } from './__stubs__/user';
import { NotFoundException } from '@nestjs/common';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	users: {
		findFirst: jest.fn().mockResolvedValue(user),
	},
	...(<any>{}),
};

describe('UserRepository', () => {
	describe('getUserByEmail()', () => {
		test('Should return a user', async () => {
			const repo = new UserRepository(prismaServiceMock);
			const userFromEmail = await repo.getUserByEmail('foo.bar@amsterdam.nl');
			expect(userFromEmail).toEqual(user);
		});

		test('Should throw an exception if no user can be found', async () => {
			prismaServiceMock.users.findFirst.mockReturnValue(undefined);
			const repo = new UserRepository(prismaServiceMock);
			await expect(repo.getUserByEmail('foo.bar@amsterdam.nl')).rejects.toThrow(NotFoundException);
		});
	});
});

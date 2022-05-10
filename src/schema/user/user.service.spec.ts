import { MockedObjectDeep } from 'ts-jest';

import { userFromToken } from '../../authentication/__stubs__/userFromToken';

import { UserRepository } from './user.repository';
import { user } from './__stubs__/user';
import { UserService } from './user.service';
import { UserFactory } from './user.factory';

const userRepoMock: MockedObjectDeep<UserRepository> = {
	getUserByEmail: jest.fn().mockResolvedValue(user),
	...(<any>{}),
};

jest.mock('./user.factory');

describe('UserService', () => {
	test('getUser()', async () => {
		UserFactory.AggregateUser = jest.fn().mockResolvedValue('__USER__');
		const service = new UserService(userRepoMock);
		expect(await service.getUser(userFromToken)).toBe('__USER__');
		expect(UserFactory.AggregateUser).toHaveBeenCalledWith(user, userFromToken);
	});
});

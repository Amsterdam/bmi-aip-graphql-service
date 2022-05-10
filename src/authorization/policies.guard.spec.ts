import { MockedObjectDeep } from 'ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { userFromToken } from '../authentication/__stubs__/userFromToken';

import { CHECK_POLICIES_KEY } from './check-policies.decorator';
import { CaslAbilityFactory } from './casl-ability.factory';
import { PoliciesGuard } from './policies.guard';

jest.mock('../utils', () => ({
	extractRequest: jest.fn().mockReturnValue({ user: userFromToken }),
	extractArgs: jest.fn().mockReturnValue({ code: 'BRU001' }),
}));

const getHandlerMock = jest.fn();
const policyHandlerMock = jest.fn().mockReturnValue(true);
const policyHandlerClassMock = {
	handle: jest.fn().mockReturnValue(true),
};

const reflectorMock: MockedObjectDeep<Reflector> = {
	get: jest.fn().mockReturnValue([policyHandlerMock, policyHandlerClassMock]),
	...(<any>{}),
};

const caslAbilityFactoryMock: MockedObjectDeep<CaslAbilityFactory> = {
	createForUser: jest.fn().mockResolvedValue('__ABILITY__'),
	...(<any>{}),
};

const executionContextMock: MockedObjectDeep<ExecutionContext> = {
	getHandler: jest.fn().mockReturnValue(getHandlerMock),
	...(<any>{}),
};

describe('PoliciesGuard', () => {
	describe('canActivate', () => {
		beforeAll(async () => {
			const guard = new PoliciesGuard(reflectorMock, caslAbilityFactoryMock);
			await guard.canActivate(executionContextMock);
		});

		test('canActivate() constructs ability for user', async () => {
			expect(caslAbilityFactoryMock.createForUser).toHaveBeenCalledWith(userFromToken);
		});

		test('executes registered policy handlers', () => {
			expect(reflectorMock.get).toHaveBeenCalledWith(CHECK_POLICIES_KEY, getHandlerMock);
			expect(policyHandlerMock).toHaveBeenCalledWith('__ABILITY__', { user: userFromToken }, { code: 'BRU001' });
			expect(policyHandlerClassMock.handle).toHaveBeenCalledWith(
				'__ABILITY__',
				{ user: userFromToken },
				{ code: 'BRU001' },
			);
		});
	});
});

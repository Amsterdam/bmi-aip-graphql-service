import { SetMetadata } from '@nestjs/common';
import { Request } from 'express';

import { CheckPolicies } from './check-policies.decorator';
import { AppAbility } from './casl-ability.factory';
import { IPolicyHandler } from './types';

jest.mock('@nestjs/common', () => ({
	__esModule: true,
	SetMetadata: jest.fn(),
}));

function policyHandlerOneMock(ability: AppAbility, request: Request, args: Record<string, unknown>) {
	return true;
}

class PolicyHandlerMock implements IPolicyHandler {
	handle(ability: AppAbility, request: Request, args: Record<string, unknown>) {
		return true;
	}
}

class Mock {
	@CheckPolicies(policyHandlerOneMock, new PolicyHandlerMock())
	test() {}
}

describe('CheckPolicies', () => {
	test('should register the given PolicyHandler[]', () => {
		new Mock().test();
		expect(SetMetadata).toHaveBeenCalledWith('check_policy', [policyHandlerOneMock, new PolicyHandlerMock()]);
	});
});

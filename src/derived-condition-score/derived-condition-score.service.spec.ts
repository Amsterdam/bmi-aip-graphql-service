import { MockedObjectDeep } from 'ts-jest';
import { PrismaService } from 'src/prisma.service';

import { domainDerivedConditionScore } from './__stubs__';
import { DerivedConditionScoreRepository } from './derived-condition-score.repository';
import { DerivedConditionScoreService } from './derived-condition-score.service';
import { DerivedConditionScore } from './models/derived-condition-score.model';
import { DerivedConditionScoreFactory } from './derived-condition-score.factory';

jest.mock('./derived-condition-score.service');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new DerivedConditionScoreRepository(prismaServiceMock);

describe('DerivedConditionScore / Service', () => {
	test('getDerivedConditionScore returns a derivedConditionScore', async () => {
		const service = new DerivedConditionScoreService(repo);
		const derivedConditionScore = await service.getDerivedConditionScoresByElementId(
			'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
		);
		expect(derivedConditionScore).toBeInstanceOf(DerivedConditionScore);
		expect(derivedConditionScore).toEqual(
			DerivedConditionScoreFactory.CreateDerivedConditionScore(domainDerivedConditionScore),
		);
	});
});

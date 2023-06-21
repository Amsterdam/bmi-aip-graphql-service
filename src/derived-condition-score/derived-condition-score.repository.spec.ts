import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { domainDerivedConditionScore } from './__stubs__';
import { DerivedConditionScoreRepository } from './derived-condition-score.repository';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	derivedConditionScores: {
		findMany: jest.fn().mockResolvedValue(domainDerivedConditionScore),
	},
	...(<any>{}),
};

const repo = new DerivedConditionScoreRepository(prismaServiceMock);

describe('DerivedConditionScore / Repository', () => {
	test('getDerivedConditionScore()', async () => {
		expect(await repo.getDerivedConditionScoresByElementId(domainDerivedConditionScore.id)).toEqual(
			domainDerivedConditionScore,
		);
	});
});

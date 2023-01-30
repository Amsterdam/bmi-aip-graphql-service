import { PrismaService } from 'src/prisma.service';
import { MockedObjectDeep } from 'ts-jest';

import { DecompositionRepository } from './decomposition.repository';
import { SurveyHasDecompositionException } from './exceptions/survey-has-decomposition.exception';
import { domainElement, domainManifestation, domainUnit } from './__stubs__';

jest.mock('./element.service');
jest.mock('./element.repository');
jest.mock('./unit.service');
jest.mock('./unit.repository');
jest.mock('./manifestation.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	elements: {
		create: jest.fn().mockResolvedValue(domainElement),
		findMany: jest.fn().mockResolvedValue([domainElement]),
		update: jest.fn().mockResolvedValue(domainElement),
	},
	units: {
		create: jest.fn().mockResolvedValue(domainUnit),
		findMany: jest.fn().mockResolvedValue([domainUnit]),
		update: jest.fn().mockResolvedValue(domainUnit),
	},
	manifestations: {
		create: jest.fn().mockResolvedValue(domainManifestation),
		findMany: jest.fn().mockResolvedValue([domainManifestation]),
		update: jest.fn().mockResolvedValue(domainManifestation),
	},
	...(<any>{}),
};

const repo = new DecompositionRepository(prismaServiceMock);

describe('Decomposition / Repository', () => {
	describe('findPrevousSurveyId()', () => {
		test('returns the id of the survey with the same objectId created prior to the given surveyId, based on the created_at field', async () => {
			// stub multiple surveys created for same objectId
			// call find previous surveyId
			// check if the correct surveyId is returned

			const result = null;
			const expected = [];
			expect(result).toBe(expected);
		});
	});

	describe('cloneDecomposition()', () => {
		test('clones a decomposition from the previous survey and returns the decomposition structure', async () => {
			// stub previous survey
			// stub new survey
			// stub previous survey elements
			// stub previous survey units
			// stub previous survey manifestations
			// call cloneDecomposition
			const result = await repo.cloneDecomposition('__SURVEY_ID___', '___PREVIOUS_SUREY_ID___');
			// check if the element prisma create calls are made
			// check if the unit prisma create calls are made
			// check if the manifestions prisma create calls are made

			expect(result[0]).toBeInstanceOf(Element);
		});

		test('an error is returned if the survey already contains decomposition items', async () => {
			await expect(repo.cloneDecomposition('__SURVEY_ID___', '___PREVIOUS_SUREY_ID___')).rejects.toThrow(
				SurveyHasDecompositionException,
			);
		});
	});
});

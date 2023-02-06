import { PrismaService } from 'src/prisma.service';
import { MockedObjectDeep } from 'ts-jest';

import { Survey } from '../survey/models/survey.model';
import { domainSurvey } from '../survey/__stubs__';

import { DecompositionRepository } from './decomposition.repository';
import { SurveyHasDecompositionException } from './exceptions/survey-has-decomposition.exception';
import { domainElement, domainManifestation, domainUnit } from './__stubs__';
import { ElementService } from './element.service';

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
	surveys: {
		findFirst: jest.fn().mockResolvedValue(domainSurvey),
		findUnique: jest.fn().mockResolvedValue(domainSurvey),
	},
	...(<any>{}),
};

const elementsServiceMock: MockedObjectDeep<ElementService> = {
	getElements: jest.fn().mockResolvedValue([domainElement]),
};

const repo = new DecompositionRepository(elementsServiceMock, prismaServiceMock);

describe('Decomposition / Repository', () => {
	describe('findPrevousSurveyId()', () => {
		test('returns the id of the survey with the same objectId created prior to the given surveyId, based on the created_at field', async () => {
			prismaServiceMock.surveys.findFirst.mockResolvedValue({
				...domainSurvey,
				id: '__PREVIOUS_SURVEY_ID__',
			} as Survey);

			const resultId = await repo.findPreviousSurveyId('__SURVEY_ID__');

			expect(resultId).toEqual('__PREVIOUS_SURVEY_ID__');
		});
	});

	describe('cloneDecomposition()', () => {
		test('clones a decomposition from the previous survey and returns the decomposition structure', async () => {
			await repo.cloneDecomposition('__SURVEY_ID___', '___PREVIOUS_SUREY_ID___');

			expect(prismaServiceMock.elements.create).toHaveBeenCalledTimes(1);
			expect(prismaServiceMock.units.create).toHaveBeenCalledTimes(1);
			expect(prismaServiceMock.manifestations.create).toHaveBeenCalledTimes(1);
		});

		test('an error is returned if the survey already contains decomposition items', async () => {
			try {
				await repo.cloneDecomposition('__SURVEY_ID___', '___PREVIOUS_SUREY_ID___');
			} catch (error) {
				expect(error).toBeInstanceOf(SurveyHasDecompositionException);
			}
		});
	});
});

import { MockedObjectDeep } from 'ts-jest';

import { domainSurvey } from '../survey/__stubs__';
import { PrismaService } from '../../prisma.service';

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
	...(<any>{}),
};

const repo = new DecompositionRepository(elementsServiceMock, prismaServiceMock);

describe('Decomposition / Repository', () => {
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

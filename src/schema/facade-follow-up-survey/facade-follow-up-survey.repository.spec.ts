import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { FacadeFollowUpSurveyRepository } from './facade-follow-up-survey.repository';
import {
	updateFacadeFollowUpSurveyInput,
	FacadeFollowUpSurvey as domainFacadeFollowUpSurvey,
} from './__stubs__/facade-follow-up-survey-stub';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	surveys: {
		update: jest.fn().mockResolvedValue(domainFacadeFollowUpSurvey),
		findFirst: jest.fn().mockResolvedValue([domainFacadeFollowUpSurvey]),
	},
	$executeRaw: jest.fn(),
	$queryRaw: jest.fn(),
	...(<any>{}),
};

let repository: FacadeFollowUpSurveyRepository;
const identifier = '9c612187-581b-4be3-902c-9e8035d1d3b7';

describe('FacadeFollowUpSurvey', () => {
	beforeEach(() => {
		repository = new FacadeFollowUpSurveyRepository(prismaServiceMock);
	});

	test('updateFacadeFollowUpSurvey()', async () => {
		const returnValue = await repository.updateFacadeFollowUpSurvey(updateFacadeFollowUpSurveyInput);
		expect(prismaServiceMock.surveys.update).toHaveBeenCalledWith({
			where: { id: updateFacadeFollowUpSurveyInput.surveyId },
			data: {
				preparedAuthor: '__AUTHOR_01__',
				preparedDate: undefined,
				verifiedAuthor: '__VERIVIER_01__',
				verifiedDate: undefined,
				inspectionStandardData: { remarks: '__TEST__' },
			},
		});
		expect(returnValue).toEqual(
			expect.objectContaining({
				...updateFacadeFollowUpSurveyInput,
			}),
		);
	});

	test('getFacadeFollowUpSurvey', async () => {
		const survey = await repository.getFacadeFollowUpSurvey(identifier);
		expect(prismaServiceMock.surveys.findFirst).toHaveBeenCalledWith({
			where: { id: identifier },
		});
		expect(survey[0]).toEqual(domainFacadeFollowUpSurvey);
	});
});

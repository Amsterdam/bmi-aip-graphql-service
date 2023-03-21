import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { FacadeFollowUpSurveyRepository } from './facade-follow-up-survey.repository';
import {
	updateFacadeFollowUpSurveyInput,
	FacadeFollowUpSurvey as domainFacadeFollowUpSurvey,
	facadeFollowUpSurveyRaw,
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

const identifier = '9c612187-581b-4be3-902c-9e8035d1d3b7';

describe('Facade follow up survey / Repository', () => {
	test('updateFacadeFollowUpSurvey()', async () => {
		const returnValue = await new FacadeFollowUpSurveyRepository(prismaServiceMock).updateFacadeFollowUpSurvey(
			updateFacadeFollowUpSurveyInput,
		);
		expect(prismaServiceMock.surveys.update).toHaveBeenCalledWith({
			where: { id: updateFacadeFollowUpSurveyInput.surveyId },
			data: facadeFollowUpSurveyRaw,
		});
		expect(returnValue).toEqual(
			expect.objectContaining({
				...updateFacadeFollowUpSurveyInput,
			}),
		);
	});

	test('getFacadeFollowUpSurvey', async () => {
		const survey = await new FacadeFollowUpSurveyRepository(prismaServiceMock).getFacadeFollowUpSurvey(identifier);
		expect(prismaServiceMock.surveys.findFirst).toHaveBeenCalledWith({
			where: { id: identifier },
		});
		expect(survey[0]).toEqual(domainFacadeFollowUpSurvey);
	});
});

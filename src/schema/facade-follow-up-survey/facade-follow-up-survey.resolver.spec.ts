import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MockedObjectDeep } from 'ts-jest';

import {
	updateFacadeFollowUpSurveyInput,
	FacadeFollowUpSurvey as domainFacadeFollowUpSurvey,
} from './__stubs__/facade-follow-up-survey-stub';
import { UpdateFacadeFollowUpSurveyCommand } from './commands/update-facade-follow-up-survey.command';
import { FacadeFollowUpSurveyResolver } from './facade-follow-up-survey.resolver';
import { FacadeFollowUpSurvey } from './models/facade-follow-up-survey.model';
import { GetFacadeFollowUpSurveyBySurveyIdQuery } from './queries/get-facade-follow-up-survey-by-survey.query';

jest.mock('./facade-follow-up-survey.service');
jest.mock('./facade-follow-up-survey.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case UpdateFacadeFollowUpSurveyCommand.name:
				return domainFacadeFollowUpSurvey;
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case GetFacadeFollowUpSurveyBySurveyIdQuery.name:
				return domainFacadeFollowUpSurvey;
		}
	}),
	...(<any>{}),
});

let queryBusMock: any;
let commandBusMock: any;
let resolver: FacadeFollowUpSurveyResolver;

describe('Facade follow up survey / Resolver', () => {
	beforeEach(() => {
		commandBusMock = getCommandBusMock();
		queryBusMock = getQueryBusMock();
		resolver = new FacadeFollowUpSurveyResolver(commandBusMock, queryBusMock);
	});

	describe('updateFacadeFollowUpSurvey', () => {
		test('updates an element if it already does exists', async () => {
			const result = await resolver.updateFacadeFollowUpSurvey(updateFacadeFollowUpSurveyInput);

			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new UpdateFacadeFollowUpSurveyCommand(updateFacadeFollowUpSurveyInput),
			);

			expect(result).toBeInstanceOf(FacadeFollowUpSurvey);
			expect(typeof result.id).toBe('string');
			expect(result.preparedAuthor).toEqual('__AUTHOR_01__');
		});
	});

	test('getFacadeFollowUpSurvey returns an getFacadeFollowUpSurvey object', async () => {
		const result = await resolver.getFacadeFollowUpSurvey(updateFacadeFollowUpSurveyInput.surveyId);

		expect(result).toEqual(domainFacadeFollowUpSurvey);
	});
});

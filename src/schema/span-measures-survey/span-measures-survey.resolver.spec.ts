import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MockedObjectDeep } from 'ts-jest';

import {
	updateSpanMeasuresSurveyInput,
	SpanMeasuresSurvey as domainSpanMeasuresSurvey,
} from './__stubs__/span-measures-survey-stub';
import { UpdateSpanMeasuresSurveyCommand } from './commands/update-span-measures-survey.command';
import { SpanMeasuresSurveyResolver } from './span-measures-survey.resolver';
import { SpanMeasuresSurvey } from './models/span-measures-survey.model';
import { GetSpanMeasuresSurveyBySurveyIdQuery } from './queries/get-span-measures-survey-by-survey.query';
import { UpdateSpanMeasuresCompletionCommand } from './commands/update-span-measures-completion.command';

jest.mock('./span-measures-survey.service');
jest.mock('./span-measures-survey.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case UpdateSpanMeasuresSurveyCommand.name:
			case UpdateSpanMeasuresCompletionCommand.name:
				return domainSpanMeasuresSurvey;
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case GetSpanMeasuresSurveyBySurveyIdQuery.name:
				return domainSpanMeasuresSurvey;
		}
	}),
	...(<any>{}),
});

let queryBusMock: any;
let commandBusMock: any;
let resolver: SpanMeasuresSurveyResolver;

describe('Span measures survey / Resolver', () => {
	beforeEach(() => {
		commandBusMock = getCommandBusMock();
		queryBusMock = getQueryBusMock();
		resolver = new SpanMeasuresSurveyResolver(commandBusMock, queryBusMock);
	});

	describe('updateSpanMeasuresSurvey', () => {
		test('updates an element if it already does exists', async () => {
			const result = await resolver.updateSpanMeasuresSurvey(updateSpanMeasuresSurveyInput);

			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new UpdateSpanMeasuresSurveyCommand(updateSpanMeasuresSurveyInput),
			);

			expect(result).toBeInstanceOf(SpanMeasuresSurvey);
			expect(typeof result.id).toBe('string');
			expect(result.inspectionStandardData.generalRemarks).toEqual('__TEST__');
		});
	});

	test('getSpanMeasuresSurvey returns an getSpanMeasuresSurvey object', async () => {
		const result = await resolver.getSpanMeasuresSurvey(updateSpanMeasuresSurveyInput.surveyId);

		expect(result).toEqual(domainSpanMeasuresSurvey);
	});

	test('updateSpanMeasuresCompletion', async () => {
		const result = await resolver.updateSpanMeasuresCompletion(updateSpanMeasuresSurveyInput);

		expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
		expect(commandBusMock.execute).toHaveBeenCalledWith(
			new UpdateSpanMeasuresCompletionCommand(updateSpanMeasuresSurveyInput),
		);

		expect(result).toBeInstanceOf(SpanMeasuresSurvey);
		expect(typeof result.id).toBe('string');
	});
});

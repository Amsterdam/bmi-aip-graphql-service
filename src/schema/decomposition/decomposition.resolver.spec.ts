import { MockedObjectDeep } from 'ts-jest';
import { CommandBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { ElementService } from './element.service';
import { element1, element2, unit1, unit2 } from './__stubs__';
import { Element } from './models/element.model';
import { DecompositionResolver } from './decomposition.resolver';
import { UnitService } from './unit.service';
import { FindSurveyElementsCommand } from './commands/find-survey-elements.command';
import { CreateDecompositionCommand } from './commands/create-decomposition.command';
import { ElementRepository } from './element.repository';
import { UnitRepository } from './unit.repository';
import { FindElementUnitsCommand } from './commands/find-element-units.command';
import { Unit } from './models/unit.model';
import { CloneDecompositionFromPreviousSurveyCommand } from './commands/clone-decomposition-from-previous-survey.command';

jest.mock('./element.service');
jest.mock('./element.repository');
jest.mock('./unit.service');
jest.mock('./unit.repository');
jest.mock('./manifestation.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case FindSurveyElementsCommand.name:
				return [element1, element2];
			case FindElementUnitsCommand.name:
				return [unit1, unit2];
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const constructResolver = (commandBusMock) => {
	return new DecompositionResolver(
		new ElementService(new ElementRepository(prismaServiceMock)),
		new UnitService(new UnitRepository(prismaServiceMock)),
		commandBusMock,
	);
};

describe('Decomposition / Resolver', () => {
	describe('createDecomposition', () => {
		test('creates and returns a new decomposition structure for a surveyId', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = constructResolver(commandBusMock);
			const result = await resolver.createDecomposition('__ASSET_CODE__', '__SURVEY_ID__');
			expect(commandBusMock.execute).toHaveBeenCalledTimes(2);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new CreateDecompositionCommand('__ASSET_CODE__', '__SURVEY_ID__'),
			);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new FindSurveyElementsCommand('__SURVEY_ID__'));

			expect(result[0]).toBeInstanceOf(Element);
			expect(result[1]).toBeInstanceOf(Element);
			expect(typeof result[0].id).toBe('string');
		});
	});

	describe('units', () => {
		test('Resolves the `units` field for elements', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = constructResolver(commandBusMock);
			const result = await resolver.units(element1);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new FindElementUnitsCommand(element1.id));
			expect(result[0]).toBeInstanceOf(Unit);
			expect(result[1]).toBeInstanceOf(Unit);
			expect(typeof result[0].id).toBe('string');
		});
	});

	describe('findSurveyElements', () => {
		test('returns a decomposition structure for a surveyId', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = constructResolver(commandBusMock);
			const result = await resolver.findSurveyElements('__SURVEY_ID__');
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new FindSurveyElementsCommand('__SURVEY_ID__'));
			expect(result[0]).toBeInstanceOf(Element);
			expect(result[1]).toBeInstanceOf(Element);
			expect(typeof result[0].id).toBe('string');
		});
	});

	describe('cloneDecompositionFromPreviousSurvey', () => {
		test('it runs the CloneDecompositionFromPreviousSurvey command and returns an OK', async () => {
			const commandBusMock = getCommandBusMock();
			// const resolver = constructResolver(commandBusMock);
			// const result = await resolver.cloneDecompositionFromPreviousSurvey('__SURVEY_ID__');

			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new CloneDecompositionFromPreviousSurveyCommand('__SURVEY_ID__'),
			);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new CloneDecompositionFromPreviousSurveyCommand('__SURVEY_ID__'),
			);
		});

		test('an error is returned if the survey already contains decomposition items', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = constructResolver(commandBusMock);
			const result = await resolver.cloneDecompositionFromPreviousSurvey('__SURVEY_ID__');

			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new CloneDecompositionFromPreviousSurveyCommand('__SURVEY_ID__'),
			);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new CloneDecompositionFromPreviousSurveyCommand('__SURVEY_ID__'),
			);
			expect(result).toEqual({
				errors: ['Survey already contains decomposition items'],
			});
		});
	});
});

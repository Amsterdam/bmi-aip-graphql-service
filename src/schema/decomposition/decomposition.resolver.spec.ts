import { MockedObjectDeep } from 'ts-jest';
import { CommandBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';
import { MeasureService } from '../measure/measure.service';
import { MeasureRepository } from '../measure/measure.repository';
import { CyclicMeasureService } from '../measure/cyclic-measure.service';
import { CyclicMeasureRepository } from '../measure/cyclic-measure.repository';

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
import { CloneDecompositionFromPreviousSurveyCommand } from './commands/clone-decomposition-from-previous-survey.command';
import { SurveyHasDecompositionException } from './exceptions/survey-has-decomposition.exception';

jest.mock('./element.service');
jest.mock('./element.repository');
jest.mock('./unit.service');
jest.mock('./unit.repository');
jest.mock('./manifestation.repository');

jest.mock('../measure/measure.service');
jest.mock('../measure/measure.repository');
jest.mock('../measure/cyclic-measure.service');
jest.mock('../measure/cyclic-measure.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case FindSurveyElementsCommand.name:
			case CloneDecompositionFromPreviousSurveyCommand.name:
				if (command.surveyId === '__PREVIOUS_SURVEY_ID__') {
					throw new SurveyHasDecompositionException(command.surveyId);
				}
				return [element1, element2];
			case FindElementUnitsCommand.name:
				return [unit1, unit2];
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	cloneDecomposition: jest.fn((surveyId: string, previousSurveyId: string) => {
		return [element1, element2];
	}),
	...(<any>{}),
};

const unitServiceMock = new UnitService(
	new UnitRepository(prismaServiceMock),
	new MeasureService(new MeasureRepository(prismaServiceMock)),
	new CyclicMeasureService(new CyclicMeasureRepository(prismaServiceMock)),
);

const constructResolver = (commandBusMock) => {
	return new DecompositionResolver(
		new ElementService(new ElementRepository(prismaServiceMock)),
		unitServiceMock,
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

	describe('cloneDecompositionFromPreviousSurvey', () => {
		test('the decomposition is cloned and a new decomposition structure is returned', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = constructResolver(commandBusMock);
			const result = await resolver.cloneDecompositionFromPreviousSurvey('__SURVEY_ID__');

			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new CloneDecompositionFromPreviousSurveyCommand('__SURVEY_ID__'),
			);

			expect(result[0]).toBeInstanceOf(Element);
		});

		test('an error is returned if the survey already contains decomposition items', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = constructResolver(commandBusMock);
			await resolver.cloneDecompositionFromPreviousSurvey('__SURVEY_ID__');

			try {
				new CloneDecompositionFromPreviousSurveyCommand('__PREVIOUS_SURVEY_ID__');
			} catch (e) {
				expect(e).toBeInstanceOf(SurveyHasDecompositionException);
			}
		});
	});
});

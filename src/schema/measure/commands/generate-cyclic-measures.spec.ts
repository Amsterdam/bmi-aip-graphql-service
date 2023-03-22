import { MockedObjectDeep } from 'ts-jest';

import { domainObjectTypeUnitCode, domainUnit } from '../../decomposition/__stubs__';
import { domainCyclicMeasure } from '../../measure/__stubs__';
import { ObjectTypeUnitCodeRepository } from '../../decomposition/object-type-unit-code.repository';
import { CyclicMeasureRepository } from '../cyclic-measure.repository';
import { DefaultMaintenanceMeasureRepository } from '../../default-maintenance-measure/default-maintenance-measure.repository';
import { UnitRepository } from '../../decomposition/unit.repository';
import { domainDefaultMaintenanceMeasure } from '../../default-maintenance-measure/__stubs__';

import { GenerateCyclicMeasuresCommand } from './generate-cyclic-measures.command';
import { GenerateCyclicMeasuresHandler } from './generate-cyclic-measures.handler';

const cyclicMeasureRepositoryMock: MockedObjectDeep<CyclicMeasureRepository> = {
	createCyclicMeasure: jest.fn().mockResolvedValue(domainCyclicMeasure),
	updateCyclicMeasure: jest.fn().mockResolvedValue(domainCyclicMeasure),
	findExistingCyclicMeasure: jest.fn().mockResolvedValue(domainCyclicMeasure),
	...(<any>{}),
};

const unitRepoMock: MockedObjectDeep<UnitRepository> = {
	getUnitsBySurveyId: jest.fn().mockResolvedValue([domainUnit]),
	...(<any>{}),
};

const defaultMaintenanceMeasureRepositoryMock: MockedObjectDeep<DefaultMaintenanceMeasureRepository> = {
	findDefaultMaintenanceMeasuresByObjectTypeUnitCodeId: jest
		.fn()
		.mockResolvedValue([domainDefaultMaintenanceMeasure]),
	...(<any>{}),
};

const objectTypeUnitCodeRepositoryMock: MockedObjectDeep<ObjectTypeUnitCodeRepository> = {
	findByCode: jest.fn().mockResolvedValue(domainObjectTypeUnitCode),
	...(<any>{}),
};

describe('GenerateCyclicMeasuresHandler', () => {
	test('executes command', async () => {
		const command = new GenerateCyclicMeasuresCommand('__SURVEY_ID__');
		const result = await new GenerateCyclicMeasuresHandler(
			cyclicMeasureRepositoryMock,
			unitRepoMock,
			defaultMaintenanceMeasureRepositoryMock,
			objectTypeUnitCodeRepositoryMock,
		).execute(command);
		const object = {
			...domainCyclicMeasure,
			deletedAt: domainCyclicMeasure.deleted_at,
		};
		delete object.deleted_at;

		expect(cyclicMeasureRepositoryMock.createCyclicMeasure).toHaveBeenCalledTimes(0);
		expect(result).toEqual([object]);
	});
});

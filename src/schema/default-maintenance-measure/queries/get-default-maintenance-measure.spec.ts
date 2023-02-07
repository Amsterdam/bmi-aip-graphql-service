import { MockedObjectDeep } from 'ts-jest';

import { defaultMaintenanceMeasure } from '../__stubs__';
import { DefaultMaintenanceMeasureService } from '../default-maintenance-measure.service';

import { GetDefaultMaintenanceMeasureQuery } from './get-default-maintenance-measure.query';
import { GetDefaultMaintenanceMeasureHandler } from './get-default-maintenance-measure.handler';

const defaultMaintenanceMeasureServiceMock: MockedObjectDeep<DefaultMaintenanceMeasureService> = {
	getDefaultMaintenanceMeasure: jest.fn().mockResolvedValue(defaultMaintenanceMeasure),
	...(<any>{}),
};

const defaultMaintenanceMeasureId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('GetFacadeSurveyHandler', () => {
	test('executes query', async () => {
		const command = new GetDefaultMaintenanceMeasureQuery(defaultMaintenanceMeasureId);
		const result = await new GetDefaultMaintenanceMeasureHandler(defaultMaintenanceMeasureServiceMock).execute(
			command,
		);

		expect(defaultMaintenanceMeasureServiceMock.getDefaultMaintenanceMeasure).toHaveBeenCalledTimes(1);
		expect(defaultMaintenanceMeasureServiceMock.getDefaultMaintenanceMeasure).toHaveBeenCalledWith(
			defaultMaintenanceMeasureId,
		);

		expect(result).toEqual(defaultMaintenanceMeasure);
	});
});

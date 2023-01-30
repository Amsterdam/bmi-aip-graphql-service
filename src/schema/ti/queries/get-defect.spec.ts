import { MockedObjectDeep } from 'ts-jest';

import { defect } from '../__stubs__';
import { DefectService } from '../defect.service';

import { GetDefectQuery } from './get-defect.query';
import { GetDefectHandler } from './get-defect.handler';

const defectServiceMock: MockedObjectDeep<DefectService> = {
	getDefect: jest.fn().mockResolvedValue(defect),
	...(<any>{}),
};

const conditionId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('GetFacadeSurveyHandler', () => {
	test('executes query', async () => {
		const command = new GetDefectQuery(conditionId);
		const result = await new GetDefectHandler(defectServiceMock).execute(command);

		expect(defectServiceMock.getDefect).toHaveBeenCalledTimes(1);
		expect(defectServiceMock.getDefect).toHaveBeenCalledWith(conditionId);

		expect(result).toEqual(defect);
	});
});

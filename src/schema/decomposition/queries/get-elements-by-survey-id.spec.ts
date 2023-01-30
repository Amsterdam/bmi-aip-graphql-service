import { MockedObjectDeep } from 'ts-jest';

import { element } from '../__stubs__';
import { ElementService } from '../element.service';

import { GetElementsBySurveyIdQuery } from './get-elements-by-survey-id.query';
import { GetElementsBySurveyIdHandler } from './get-elements-by-survey-id.handler';

const serviceMock: MockedObjectDeep<ElementService> = {
	getElements: jest.fn().mockResolvedValue(element),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('GetElementsBySurveyIdQuery', () => {
	test('executes query', async () => {
		const query = new GetElementsBySurveyIdQuery(identifier);
		const result = await new GetElementsBySurveyIdHandler(serviceMock).execute(query);

		expect(serviceMock.getElements).toHaveBeenCalledTimes(1);
		expect(serviceMock.getElements).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(element);
	});
});

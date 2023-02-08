import { MockedObjectDeep } from 'ts-jest';

import { element } from '../__stubs__';
import { ElementService } from '../element.service';

import { GetElementByIdQuery } from './get-element-by-id.query';
import { GetElementByIdHandler } from './get-element-by-id.handler';

const serviceMock: MockedObjectDeep<ElementService> = {
	getElementById: jest.fn().mockResolvedValue(element),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('GetElementByIdQuery', () => {
	test('executes query', async () => {
		const query = new GetElementByIdQuery(identifier);
		const result = await new GetElementByIdHandler(serviceMock).execute(query);

		expect(serviceMock.getElementById).toHaveBeenCalledTimes(1);
		expect(serviceMock.getElementById).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(element);
	});
});

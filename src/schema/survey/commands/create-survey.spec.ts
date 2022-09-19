import { MockedObjectDeep } from 'ts-jest';

import { ElementRepository } from '../element.repository';
import { elementInput, domainElement } from '../__stubs__';

import { CreateElementCommand } from './create-element.command';
import { CreateElementHandler } from './create-element.handler';

const elementRepoMock: MockedObjectDeep<ElementRepository> = {
	createElement: jest.fn().mockResolvedValue(domainElement),
	...(<any>{}),
};

describe('CreateElementHandler', () => {
	test('executes command', async () => {
		const command = new CreateElementCommand(elementInput);
		const result = await new CreateElementHandler(elementRepoMock).execute(command);

		expect(elementRepoMock.createElement).toHaveBeenCalledTimes(1);
		expect(elementRepoMock.createElement).toHaveBeenCalledWith(elementInput);

		expect(result).toEqual(domainElement);
	});
});

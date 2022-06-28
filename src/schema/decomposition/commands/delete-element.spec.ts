import { MockedObjectDeep } from 'ts-jest';

import { ElementRepository } from '../element.repository';
import { domainElement } from '../__stubs__';

import { DeleteElementCommand } from './delete-element.command';
import { DeleteElementHandler } from './delete-element.handler';

const elementRepoMock: MockedObjectDeep<ElementRepository> = {
	deleteElement: jest.fn().mockResolvedValue(domainElement),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('DeleteElementHandler', () => {
	test('executes command', async () => {
		const command = new DeleteElementCommand(identifier);
		const result = await new DeleteElementHandler(elementRepoMock).execute(command);

		expect(elementRepoMock.deleteElement).toHaveBeenCalledTimes(1);
		expect(elementRepoMock.deleteElement).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(domainElement);
	});
});

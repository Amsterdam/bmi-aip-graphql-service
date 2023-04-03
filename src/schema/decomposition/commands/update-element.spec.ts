import { MockedObjectDeep } from 'ts-jest';

import { ElementRepository } from '../element.repository';
import { domainElement, updateElementInput } from '../__stubs__';
import { ElementFactory } from '../element.factory';

import { UpdateElementCommand } from './update-element.command';
import { UpdateElementHandler } from './update-element.handler';

const elementRepoMock: MockedObjectDeep<ElementRepository> = {
	updateElement: jest.fn().mockResolvedValue(domainElement),
	...(<any>{}),
};

describe('UpdateElementHandler', () => {
	test('executes command', async () => {
		const command = new UpdateElementCommand(updateElementInput);
		const result = await new UpdateElementHandler(elementRepoMock).execute(command);

		expect(elementRepoMock.updateElement).toHaveBeenCalledTimes(1);
		expect(elementRepoMock.updateElement).toHaveBeenCalledWith(updateElementInput);

		expect(result).toEqual(ElementFactory.CreateElement(domainElement));
	});
});

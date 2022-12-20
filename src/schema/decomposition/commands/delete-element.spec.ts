import { MockedObjectDeep } from 'ts-jest';

import { deletedElement } from '../__stubs__';
import { ElementService } from '../element.service';
import { ElementFactory } from '../element.factory';

import { DeleteElementCommand } from './delete-element.command';
import { DeleteElementHandler } from './delete-element.handler';

const elementServiceMock: MockedObjectDeep<ElementService> = {
	deleteElement: jest.fn().mockResolvedValue(ElementFactory.CreateElement(deletedElement)),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('DeleteElementHandler', () => {
	test('executes command', async () => {
		const command = new DeleteElementCommand(identifier);
		const result = await new DeleteElementHandler(elementServiceMock).execute(command);

		expect(elementServiceMock.deleteElement).toHaveBeenCalledTimes(1);
		expect(elementServiceMock.deleteElement).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(ElementFactory.CreateElement(deletedElement));
	});
});

import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxRepository } from '../junction-box.repository';
import { domainJunctionBox } from '../__stubs__';

import { DeleteJunctionBoxCommand } from './delete-junction-box.command';
import { DeleteJunctionBoxHandler } from './delete-junction-box.handler';

const junctionBoxRepoMock: MockedObjectDeep<JunctionBoxRepository> = {
	deleteJunctionBox: jest.fn().mockResolvedValue(domainJunctionBox),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('DeleteJunctionBoxHandler', () => {
	test('executes command', async () => {
		const command = new DeleteJunctionBoxCommand(identifier);
		const result = await new DeleteJunctionBoxHandler(junctionBoxRepoMock).execute(command);

		expect(junctionBoxRepoMock.deleteJunctionBox).toHaveBeenCalledTimes(1);
		expect(junctionBoxRepoMock.deleteJunctionBox).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(domainJunctionBox);
	});
});

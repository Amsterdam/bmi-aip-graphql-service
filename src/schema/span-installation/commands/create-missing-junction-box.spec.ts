import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxRepository } from '../junction-box.repository';
import { domainReviseJunctionBox, createMissingJunctionBoxInput } from '../__stubs__';

import { CreateMissingJunctionBoxCommand } from './create-missing-junction-box.command';
import { CreateMissingJunctionBoxHandler } from './create-missing-junction-box.handler';

const junctionBoxRepoMock: MockedObjectDeep<JunctionBoxRepository> = {
	createMissingJunctionBox: jest.fn().mockResolvedValue(domainReviseJunctionBox),
	...(<any>{}),
};

describe('CreateMissingJunctionBoxHandler', () => {
	test('executes command', async () => {
		const command = new CreateMissingJunctionBoxCommand(createMissingJunctionBoxInput);
		const result = await new CreateMissingJunctionBoxHandler(junctionBoxRepoMock).execute(command);

		expect(junctionBoxRepoMock.createMissingJunctionBox).toHaveBeenCalledTimes(1);
		expect(junctionBoxRepoMock.createMissingJunctionBox).toHaveBeenCalledWith(createMissingJunctionBoxInput);

		expect(result).toEqual(domainReviseJunctionBox);
	});
});

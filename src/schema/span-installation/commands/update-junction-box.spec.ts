import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxRepository } from '../junction-box.repository';
import { domainJunctionBox, updateJunctionBoxInput } from '../__stubs__';

import { UpdateJunctionBoxCommand } from './update-junction-box.command';
import { UpdateJunctionBoxHandler } from './update-junction-box.handler';

const junctionBoxRepoMock: MockedObjectDeep<JunctionBoxRepository> = {
	updateJunctionBox: jest.fn().mockResolvedValue(domainJunctionBox),
	...(<any>{}),
};

describe('UpdateJunctionBoxHandler', () => {
	test('executes command', async () => {
		const command = new UpdateJunctionBoxCommand(updateJunctionBoxInput);
		const result = await new UpdateJunctionBoxHandler(junctionBoxRepoMock).execute(command);

		expect(junctionBoxRepoMock.updateJunctionBox).toHaveBeenCalledTimes(1);
		expect(junctionBoxRepoMock.updateJunctionBox).toHaveBeenCalledWith(updateJunctionBoxInput);

		expect(result).toEqual(domainJunctionBox);
	});
});

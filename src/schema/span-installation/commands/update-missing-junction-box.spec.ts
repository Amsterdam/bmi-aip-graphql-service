import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxRepository } from '../junction-box.repository';
import { domainReviseJunctionBox, updateMissingJunctionBoxInput } from '../__stubs__';

import { UpdateMissingJunctionBoxCommand } from './update-missing-junction-box.command';
import { UpdateMissingJunctionBoxHandler } from './update-missing-junction-box.handler';

const junctionBoxRepoMock: MockedObjectDeep<JunctionBoxRepository> = {
	updateReviseJunctionBox: jest.fn().mockResolvedValue(domainReviseJunctionBox),
	...(<any>{}),
};

describe('UpdateMissingJunctionBoxHandler', () => {
	test('executes command', async () => {
		const command = new UpdateMissingJunctionBoxCommand(updateMissingJunctionBoxInput);
		const result = await new UpdateMissingJunctionBoxHandler(junctionBoxRepoMock).execute(command);

		expect(junctionBoxRepoMock.updateReviseJunctionBox).toHaveBeenCalledTimes(1);
		expect(junctionBoxRepoMock.updateReviseJunctionBox).toHaveBeenCalledWith(updateMissingJunctionBoxInput);

		expect(result).toEqual(domainReviseJunctionBox);
	});
});

import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxRepository } from '../junction-box.repository';
import { domainReviseJunctionBox, updateReviseJunctionBoxInput } from '../__stubs__';

import { UpdateReviseJunctionBoxCommand } from './update-revise-junction-box.command';
import { UpdateReviseJunctionBoxHandler } from './update-revise-junction-box.handler';

const junctionBoxRepoMock: MockedObjectDeep<JunctionBoxRepository> = {
	updateReviseJunctionBox: jest.fn().mockResolvedValue(domainReviseJunctionBox),
	...(<any>{}),
};

describe('UpdateReviseJunctionBoxHandler', () => {
	test('executes command', async () => {
		const command = new UpdateReviseJunctionBoxCommand(updateReviseJunctionBoxInput);
		const result = await new UpdateReviseJunctionBoxHandler(junctionBoxRepoMock).execute(command);

		expect(junctionBoxRepoMock.updateReviseJunctionBox).toHaveBeenCalledTimes(1);
		expect(junctionBoxRepoMock.updateReviseJunctionBox).toHaveBeenCalledWith(updateReviseJunctionBoxInput);

		expect(result).toEqual(domainReviseJunctionBox);
	});
});

import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxRepository } from '../junction-box.repository';
import { reviseJunctionBoxInput, domainReviseJunctionBox } from '../__stubs__';

import { CreateMissingJunctionBoxCommand } from './create-missing-junction-box.command';
import { CreateMissingJunctionBoxHandler } from './create-missing-junction-box.handler';

const junctionBoxRepoMock: MockedObjectDeep<JunctionBoxRepository> = {
	createReviseJunctionBox: jest.fn().mockResolvedValue(domainReviseJunctionBox),
	...(<any>{}),
};

describe('CreateMissingJunctionBoxHandler', () => {
	test('executes command', async () => {
		const command = new CreateMissingJunctionBoxCommand(reviseJunctionBoxInput);
		const result = await new CreateMissingJunctionBoxHandler(junctionBoxRepoMock).execute(command);

		expect(junctionBoxRepoMock.createReviseJunctionBox).toHaveBeenCalledTimes(1);
		expect(junctionBoxRepoMock.createReviseJunctionBox).toHaveBeenCalledWith(reviseJunctionBoxInput);

		expect(result).toEqual(domainReviseJunctionBox);
	});
});

import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxRepository } from '../junction-box.repository';
import { reviseJunctionBoxInput, domainReviseJunctionBox } from '../__stubs__';

import { CreateReviseJunctionBoxCommand } from './create-revise-junction-box.command';
import { CreateReviseJunctionBoxHandler } from './create-revise-junction-box.handler';

const junctionBoxRepoMock: MockedObjectDeep<JunctionBoxRepository> = {
	createReviseJunctionBox: jest.fn().mockResolvedValue(domainReviseJunctionBox),
	...(<any>{}),
};

describe('CreateReviseJunctionBoxHandler', () => {
	test('executes command', async () => {
		const command = new CreateReviseJunctionBoxCommand(reviseJunctionBoxInput);
		const result = await new CreateReviseJunctionBoxHandler(junctionBoxRepoMock).execute(command);

		expect(junctionBoxRepoMock.createReviseJunctionBox).toHaveBeenCalledTimes(1);
		expect(junctionBoxRepoMock.createReviseJunctionBox).toHaveBeenCalledWith(reviseJunctionBoxInput);

		expect(result).toEqual(domainReviseJunctionBox);
	});
});

import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxRepository } from '../junction-box.repository';
import { junctionBoxInput, domainJunctionBox } from '../__stubs__';

import { CreateJunctionBoxCommand } from './create-junction-box.command';
import { CreateJunctionBoxHandler } from './create-junction-box.handler';

const junctionBoxRepoMock: MockedObjectDeep<JunctionBoxRepository> = {
	createJunctionBox: jest.fn().mockResolvedValue(domainJunctionBox),
	...(<any>{}),
};

describe('CreateJunctionBoxHandler', () => {
	test('executes command', async () => {
		const command = new CreateJunctionBoxCommand(junctionBoxInput);
		const result = await new CreateJunctionBoxHandler(junctionBoxRepoMock).execute(command);

		expect(junctionBoxRepoMock.createJunctionBox).toHaveBeenCalledTimes(1);
		expect(junctionBoxRepoMock.createJunctionBox).toHaveBeenCalledWith(junctionBoxInput);

		expect(result).toEqual(domainJunctionBox);
	});
});

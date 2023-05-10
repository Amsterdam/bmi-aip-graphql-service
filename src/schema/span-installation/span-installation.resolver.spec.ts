import { MockedObjectDeep } from 'ts-jest';
import { CommandBus } from '@nestjs/cqrs';

import { domainSupportSystem, domainJunctionBox } from './__stubs__';
import { CloneSpanInstallationDecompositionCommand } from './commands/clone-span-installation-decomposition.command';
import { SpanDecompositionResolver } from './span-decomposition.resolver';

jest.mock('./support-system.repository');
jest.mock('./junction-box.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CloneSpanInstallationDecompositionCommand.name:
				return [domainJunctionBox, domainSupportSystem];
		}
	}),
	...(<any>{}),
});

test('cloneSpanInstallationDecomposition', async () => {
	const commandBusMock = getCommandBusMock();
	const resolver = new SpanDecompositionResolver(commandBusMock);
	const result = await resolver.cloneSpanInstallationDecomposition('__OBJECT_ID_', '__SURVEY_ID_');
	expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
	expect(commandBusMock.execute).toHaveBeenCalledWith(
		new CloneSpanInstallationDecompositionCommand('__SURVEY_ID_', '__OBJECT_ID_'),
	);
	expect(result).toBeInstanceOf(Array);
	expect(result).toEqual([domainJunctionBox, domainSupportSystem]);
});

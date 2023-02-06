import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { FailureModeService } from './failure-mode.service';
import { FailureModeRepository } from './failure-mode.repository';
import { domainFailureMode } from './__stubs__';
import { FailureModeFactory } from './failure-mode.factory';
import { FailureMode } from './models/failure-mode.model';

jest.mock('./failure-mode.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new FailureModeRepository(prismaServiceMock);

describe('FailureModes / Service', () => {
	test('findFailureModes returns array of FailureMode survey', async () => {
		const service = new FailureModeService(repo);
		const failureModes = await service.findFailureModes('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(failureModes).toBeInstanceOf(Array);
		expect(failureModes[0]).toBeInstanceOf(FailureMode);
		expect(failureModes).toEqual(
			[domainFailureMode].map((failureMode) => FailureModeFactory.CreateFailureMode(failureMode)),
		);
	});
});

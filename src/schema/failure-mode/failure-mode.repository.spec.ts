import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { FailureModeRepository } from './failure-mode.repository';
import { domainFailureMode, failureModeInput, updateFailureModeInput } from './__stubs__';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	failureModes: {
		create: jest.fn().mockResolvedValue(domainFailureMode),
		findMany: jest.fn().mockResolvedValue([domainFailureMode]),
		update: jest.fn().mockResolvedValue(domainFailureMode),
	},
	...(<any>{}),
};

const repo = new FailureModeRepository(prismaServiceMock);

describe('FailureModeRepository', () => {
	test('createFailureMode()', async () => {
		await repo.createFailureMode(failureModeInput);
		expect(prismaServiceMock.failureModes.create).toHaveBeenCalledWith({
			data: expect.objectContaining({
				surveys: {
					connect: {
						id: '68a95a2c-b909-e77f-4d66-9fd5afef5adb',
					},
				},
				units: {
					connect: {
						id: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
					},
				},
				manifestations: {
					connect: {
						id: '',
					},
				},
			}),
		});
	});

	test('findFailureModes()', async () => {
		const failureModes = await repo.findFailureModes('__SURVEY_ID__');
		expect(prismaServiceMock.failureModes.findMany).toHaveBeenCalledWith({
			where: { surveyId: '__SURVEY_ID__' },
		});
		expect(failureModes).toEqual([domainFailureMode]);
	});

	test('updateFailureMode()', async () => {
		await repo.updateFailureMode(updateFailureModeInput);
		expect(prismaServiceMock.failureModes.update).toHaveBeenCalledWith({
			where: { id: updateFailureModeInput.id },
			data: expect.objectContaining({}),
		});
	});
});

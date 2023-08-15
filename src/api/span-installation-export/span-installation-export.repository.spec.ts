import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { SpanInstallationExportRepository } from './span-installation-export.repository';
import { spanInstallationsData, surveysData } from './__stubs__';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	surveys: {
		findMany: jest.fn().mockResolvedValue(surveysData),
	},
	objects: {
		findMany: jest.fn().mockResolvedValue(spanInstallationsData),
	},
	...(<any>{}),
};

describe('SpanInstallationExportRepository', () => {
	let repository: SpanInstallationExportRepository;

	beforeEach(() => {
		repository = new SpanInstallationExportRepository(prismaServiceMock);
	});

	describe('findSpanInstallations', () => {
		it('should return spanInstallations when given a valid batchId', async () => {
			const batchId = '__BATCH_ID__';
			const result = await repository.findByBatch(batchId);

			expect(result).toEqual(spanInstallationsData);
			expect(prismaServiceMock.surveys.findMany).toHaveBeenCalledTimes(1);
			expect(prismaServiceMock.objects.findMany).toHaveBeenCalledTimes(1);
		});
	});
});

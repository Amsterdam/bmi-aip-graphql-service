import { BatchRepository } from 'src/schema/batch/batch.repository';
import { MockedObjectDeep } from 'ts-jest';

import { SpanInstallationExportRepository } from './span-installation-export.repository';
import { SpanInstallationExportService } from './span-installation-export.service';

const spanInstallationsData = [
	{
		id: 'span1',
		object: 'object1',
		batch: 'batch1',
	},
];

const batchDetailsData = [{ id: 'batch1' }, { id: 'batch2' }];

const spanRepositoryMock: MockedObjectDeep<SpanInstallationExportRepository> = {
	findByObject: jest.fn().mockResolvedValue(spanInstallationsData),
	findByBatch: jest.fn().mockResolvedValue(spanInstallationsData),
	...(<any>{}),
};

const batchRepositoryMock: MockedObjectDeep<BatchRepository> = {
	getAllOVSBatches: jest.fn().mockResolvedValue(batchDetailsData),
	...(<any>{}),
};

describe('SpanInstallationExportService', () => {
	let service: SpanInstallationExportService;

	beforeEach(() => {
		service = new SpanInstallationExportService(spanRepositoryMock, batchRepositoryMock);
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getObjectById', () => {
		it('should return span installations by object ID', async () => {
			const objectId = 'someObjectId';

			const result = await service.getObjectById(objectId);

			expect(result).toEqual(spanInstallationsData);
			expect(spanRepositoryMock.findByObject).toHaveBeenCalledWith(objectId);
		});
	});

	describe('getObjectsInBatch', () => {
		it('should return span installations in a batch by batch ID', async () => {
			const batchId = 'someBatchId';

			const result = await service.getObjectsInBatch(batchId);

			expect(result).toEqual(spanInstallationsData);
			expect(spanRepositoryMock.findByBatch).toHaveBeenCalledWith(batchId);
		});
	});

	describe('getObjectsInAllBatches', () => {
		it('should return span installations in all batches', async () => {
			const result = await service.getObjectsInAllBatches();

			expect(result).toEqual(spanInstallationsData.concat(spanInstallationsData));
			expect(batchRepositoryMock.getAllOVSBatches).toHaveBeenCalled();
			expect(spanRepositoryMock.findByBatch).toHaveBeenCalledTimes(batchDetailsData.length);
		});
	});
});

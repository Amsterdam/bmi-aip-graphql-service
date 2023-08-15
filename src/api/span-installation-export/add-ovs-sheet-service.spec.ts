import * as ExcelJS from 'exceljs';
import { MockedObjectDeep } from 'ts-jest';

import { DBBatch } from '../../schema/batch/types/batch.repository.interface';
import { BatchRepository } from '../../schema/batch/batch.repository';
import { PrismaService } from '../../prisma.service';

import { AddOVSSheetService } from './add-ovs-sheet.service';
import { ovsAssetStub } from './__stubs__/ovs-asset';



// The labels below are the labels that are expected to be present in the OVS export sheet
// The order of the labels is important, as it is used to determine the column index of the label
// The labels are split into multiple groups for readability reasons

const baseFields = ['OVS nummer'];

const batchFields = ['Batch nummer(s)', 'Batch status'];

const passportFields = [
	'Straat',
	'Buurt',
	'Wijk',
	'Stadsdeel',
	'Splitsingen',
	'Dubbeldraads',
	'Boven trambaan',
	'Opmerkingen',
];

describe('AddOvsSheetService', () => {
	describe('addOVSSheet', () => {
		it('should add a new OVS export sheet with the appopriate columns', async () => {
			const batchStub = {
				id: '__BATCH_ID__',
				name: '__BATCH_NAME__',
				status: '__BATCH_STATUS__',
				startDate: new Date(),
				endDate: new Date(),
				plannedStartDate: new Date(),
				plannedEndDate: new Date(),
				contractId: '123',
				tranchId: '123',
				remarks: '__BATCH_REMARKS__',
				legacyFailureMode: false,
				created_at: new Date(),
				updated_at: new Date(),
			} as DBBatch;

			const prismaServiceMock: MockedObjectDeep<PrismaService> = {
				batches: {
					findMany: jest.fn().mockResolvedValue([batchStub]),
				},
				$executeRaw: jest.fn(),
				$queryRaw: jest.fn(),
				...(<any>{}),
			};

			const mockBatchRepository = new BatchRepository(prismaServiceMock);
			const addOvsSheetService = new AddOVSSheetService(mockBatchRepository);

			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('');
			await addOvsSheetService.addOVSSheet(worksheet, ovsAssetStub, true);

			const rowWithColumnNames = worksheet.getRow(4);
			const labels = rowWithColumnNames.values.filter((value) => typeof value === 'string'); // filter out empty/undefined cells

			expect(labels).toEqual([...baseFields, ...batchFields, ...passportFields]);
		});
	});
});

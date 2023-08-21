import * as ExcelJS from 'exceljs';
import { MockedObjectDeep } from 'ts-jest';

import { DBBatch } from '../../schema/batch/types/batch.repository.interface';
// import { PrismaService } from '../../prisma.service';

import { supportSystem } from '../../schema/span-installation/__stubs__';
import { SupportSystemService } from '../../schema/span-installation/support-system.service';

import { OVSSheetService } from './ovs-sheet.service';
import { ovsAssetStub } from './__stubs__/ovs-asset';

// The labels below are the labels that are expected to be present in the OVS export sheet
// The order of the labels is important, as it is used to determine the column index of the label
// The labels are split into multiple groups for better readability

const baseFields = ['OVS nummer'];

const batchFields = ['Batch nummer(s)', 'Batch status'];

const decompositionFacadeFields = [
	'Type gedetailleerd',
	'Straat',
	'Huisnummer',
	'Verdieping',
	'X coordinaat',
	'Y coordinaat',
	'Aanleghoogte',
	'Opmerkingen',
];

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

describe('OVSSheetService', () => {
	describe('addOVSRows', () => {
		it('should add a new OVS export sheet with the appropriate columns', async () => {
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

			// const prismaServiceMock: MockedObjectDeep<PrismaService> = {
			// 	batches: {
			// 		findMany: jest.fn().mockResolvedValue([batchStub]),
			// 	},
			// 	supportSystems: {
			// 		findByObject: jest.fn().mockResolvedValue([supportSystem]),
			// 	},
			// 	$executeRaw: jest.fn(),
			// 	$queryRaw: jest.fn(),
			// 	...(<any>{}),
			// };

			const mockSupportSystemService: MockedObjectDeep<SupportSystemService> = {
				findByObject: jest.fn().mockResolvedValue([supportSystem]),
				...(<any>{}),
			};

			const mockBatchService = {
				findForAssetThroughSurveys: jest.fn().mockResolvedValue(batchStub),
				...(<any>{}),
			};

			const addOvsSheetService = new OVSSheetService(mockBatchService, mockSupportSystemService);

			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('');
			await addOvsSheetService.addOVSRows(worksheet, ovsAssetStub, true);

			const rowWithColumnNames = worksheet.getRow(4);
			const labels = rowWithColumnNames.values.filter((value) => typeof value === 'string'); // filter out empty/undefined cells

			expect(labels).toEqual([...baseFields, ...batchFields, ...passportFields, ...decompositionFacadeFields]);
		});

		it('should contain a row for each item in the decomposition ', async () => {
			//
		});
	});
});

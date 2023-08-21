import * as ExcelJS from 'exceljs';
import { MockedObjectDeep } from 'ts-jest';

import { DBBatch } from '../../schema/batch/types/batch.repository.interface';
import { supportSystem } from '../../schema/span-installation/__stubs__';
import { SupportSystemService } from '../../schema/span-installation/support-system.service';

import { AddOVSSheetService } from './add-ovs-sheet.service';
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

describe('AddOvsSheetService', () => {
	describe('addOVSSheet', () => {
		it('should add a new OVS export sheet with the appropriate columns', async () => {
			const mockSupportSystemService: MockedObjectDeep<SupportSystemService> = {
				findByObject: jest.fn().mockResolvedValue([supportSystem]),
				...(<any>{}),
			};

			const mockBatchService = {
				findForAssetThroughSurveys: jest.fn().mockResolvedValue(batchStub),
				...(<any>{}),
			};

			const addOvsSheetService = new AddOVSSheetService(mockBatchService, mockSupportSystemService);

			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('');
			await addOvsSheetService.addOVSSheet(worksheet, ovsAssetStub, true);

			const rowWithColumnNames = worksheet.getRow(4);
			const labels = rowWithColumnNames.values.filter((value) => typeof value === 'string'); // filter out empty/undefined cells

			expect(labels).toEqual([...baseFields, ...batchFields, ...passportFields, ...decompositionFacadeFields]);
		});

		// it('should add a new OVS export sheet with the appropriate values', async () => {
		// 	const mockSupportSystemService: MockedObjectDeep<SupportSystemService> = {
		// 	  findByObject: jest.fn().mockResolvedValue([supportSystem]),
		// 	  ...(<any>{}),
		// 	};

		// 	const mockBatchService = {
		// 	  findForAssetThroughSurveys: jest.fn().mockResolvedValue(batchStub),
		// 	  ...(<any>{}),
		// 	};

		// 	const addOvsSheetService = new AddOVSSheetService(mockBatchService, mockSupportSystemService);

		// 	const workbook = new ExcelJS.Workbook();
		// 	const worksheet = workbook.addWorksheet('');
		// 	await addOvsSheetService.addOVSSheet(worksheet, ovsAssetStub, true);

		// 	const rowWithCellValues = worksheet.getRow(5);
		// 	const cellValues = rowWithCellValues.values.filter((value) => typeof value === 'string'); // filter out empty/undefined cells

		// 	expect(cellValues).toEqual([
		// 	  ovsAssetStub.name,
		// 	  batchStub.name,
		// 	  batchStub.status,
		// 	  ovsAssetStub.passportStreet,
		// 	  ovsAssetStub.neighborhood,
		// 	  ovsAssetStub.district,
		// 	  ovsAssetStub.city,
		// 	  ovsAssetStub.splitting,
		// 	  ovsAssetStub.doubleWire,
		// 	  ovsAssetStub.aboveTramTrack,
		// 	  ovsAssetStub.remarks,
		// 	  ovsAssetStub.detailedType,
		// 	  ovsAssetStub.street,
		// 	  ovsAssetStub.houseNumber,
		// 	  ovsAssetStub.floor,
		// 	  ovsAssetStub.xCoordinate,
		// 	  ovsAssetStub.yCoordinate,
		// 	  ovsAssetStub.installationHeight,
		// 	  ovsAssetStub.remarks,
		// 	]);
		// });
	});
});

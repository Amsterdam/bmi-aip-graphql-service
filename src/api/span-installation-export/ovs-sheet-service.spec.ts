import * as ExcelJS from 'exceljs';
import { MockedObjectDeep } from 'ts-jest';
import { string } from 'zod';

import { DBBatch } from '../../schema/batch/types/batch.repository.interface';
import { supportSystem } from '../../schema/span-installation/__stubs__';
import { SupportSystemService } from '../../schema/span-installation/support-system.service';
import { LuminaireService } from '../../schema/span-installation/luminaire.service';

import { OVSSheetService } from './ovs-sheet.service';
import { ovsAssetStub } from './__stubs__/ovs-asset';
import { assetBatchData as batchStub, ovsRecordMock , luminaireData as luminaireStub } from './__stubs__/ovs-export-data';
import { OVSRow } from './types';

// The labels below are the labels that are expected to be present in the OVS export sheet
// The order of the labels is important, as it is used to determine the column index of the label
// The labels are split into multiple groups for better readability

const baseDataColumns = ['OVS nummer'];

const batchDataColumns = ['Batch nummer(s)', 'Batch status'];

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

const decompositionTensionWireFields = ['Type gedetailleerd', 'Lengte spandraad', 'Straat', 'Opmerkingen'];

const passportDataColumns = [
	'Straat',
	'Buurt',
	'Wijk',
	'Stadsdeel',
	'Splitsingen',
	'Dubbeldraads',
	'Boven trambaan',
	'Opmerkingen',
];

const facadeColumns = [
	'Type gedetailleerd',
	'Straat',
	'Huisnummer',
	'Verdieping',
	'X coordinaat',
	'Y coordinaat',
	'Aanleghoogte',
	'Opmerkingen',
];

const tensionWireColumns = ['Type gedetailleerd', 'Lengte spandraad', 'Straat', 'Opmerkingen'];

const luminaireColumns = ['Straat', 'Reeds voorzien van LED', 'X coördinaat', 'Y coördinaat', 'Opmerkingen'];

const mastColumns = ['Type gedetailleerd', 'Straat', 'X coordinaat', 'Y coordinaat', 'Aanleghoogte', 'Opmerkingen'];

const nodeColumns = ['Type gedetailleerd', 'Straat', 'X coordinaat', 'Y coordinaat', 'Aanleghoogte', 'Opmerkingen'];

let ovsSheetService: OVSSheetService;

describe('OVSSheetService', () => {
	beforeEach(async () => {
		const mockSupportSystemService: MockedObjectDeep<SupportSystemService> = {
			findByObject: jest.fn().mockResolvedValue([supportSystem]),
			...(<any>{}),
		};

		const mockBatchService = {
			findForAssetThroughSurveys: jest.fn().mockResolvedValue([batchStub]),
			...(<any>{}),
		};

		const mockLuminaireService: MockedObjectDeep<LuminaireService> = {
			getLuminaires: jest.fn().mockResolvedValue([luminaireStub]),
			...(<any>{}),
		};

		ovsSheetService = new OVSSheetService(mockBatchService, mockSupportSystemService, mockLuminaireService);
	});

	describe('addOVSRows', () => {
		it('should add a new OVS export sheet with the right column names on row 4', async () => {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('');
			await ovsSheetService.addOVSRows(worksheet, ovsAssetStub, true);

			const rowWithColumnNames = worksheet.getRow(4);
			const labels = rowWithColumnNames.values.filter((value) => typeof value === 'string'); // filter out empty/undefined cells

			const fieldsToCheck = [
				...baseDataColumns,
				...batchDataColumns,
				...passportDataColumns,
				...facadeColumns,
				...tensionWireColumns,
				...luminaireColumns,
				...mastColumns,
				...nodeColumns,
			];

			expect(labels).toEqual(fieldsToCheck);
		});
	});

	describe('getData', () => {
		it('the data should contain all relevant properties', async () => {
			const expectedFields = Object.keys(ovsRecordMock);

			const data = await ovsSheetService.getData(ovsAssetStub);

			expect(Object.keys(data[0])).toEqual(expectedFields);
		});
	});
});

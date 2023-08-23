import * as ExcelJS from 'exceljs';
import { MockedObjectDeep } from 'ts-jest';

import { supportSystem, luminaire as luminaireStub } from '../../schema/span-installation/__stubs__';
import { SupportSystemService } from '../../schema/span-installation/support-system.service';
import { LuminaireService } from '../../schema/span-installation/luminaire.service';
import {
	SupportSystemType,
	SupportSystemTypeDetailedFacade,
	SupportSystemTypeDetailedMast,
	SupportSystemTypeDetailedNode,
	SupportSystemTypeDetailedTensionWire,
} from '../../types';

import { OVSSheetService } from './ovs-sheet.service';
import { ovsAssetStub, dbBatchStub } from './__stubs__/ovs-asset';
import { ovsRecordMock } from './__stubs__/ovs-export-data';
import { OVSColumnHeaderValues } from './types';

// The labels below are the labels that are expected to be present in the OVS export sheet
// The order of the labels is important, as it is used to determine the column index of the label
// The labels are split into multiple groups for better readability

const baseDataColumns: OVSColumnHeaderValues[] = ['OVS nummer'];

const batchDataColumns: OVSColumnHeaderValues[] = ['Batch nummer(s)', 'Batch status'];

const passportDataColumns: OVSColumnHeaderValues[] = [
	'Straat',
	'Buurt',
	'Wijk',
	'Stadsdeel',
	'Splitsingen',
	'Dubbeldraads',
	'Boven trambaan',
	'Opmerkingen',
];

const facadeColumns: OVSColumnHeaderValues[] = [
	'Type gedetailleerd',
	'Straat',
	'Huisnummer',
	'Verdieping',
	'X-coördinaat',
	'Y-coördinaat',
	'Aanleghoogte',
	'Opmerkingen',
];

const tensionWireColumns: OVSColumnHeaderValues[] = ['Type gedetailleerd', 'Lengte spandraad', 'Straat', 'Opmerkingen'];

const luminaireColumns: OVSColumnHeaderValues[] = [
	'Straat',
	'Reeds voorzien van LED',
	'X-coördinaat',
	'Y-coördinaat',
	'Opmerkingen',
];

const mastColumns: OVSColumnHeaderValues[] = [
	'Type gedetailleerd',
	'Straat',
	'X-coördinaat',
	'Y-coördinaat',
	'Aanleghoogte',
	'Opmerkingen',
];

const nodeColumns: OVSColumnHeaderValues[] = [
	'Type gedetailleerd',
	'Straat',
	'X-coördinaat',
	'Y-coördinaat',
	'Aanleghoogte',
	'Opmerkingen',
];

let ovsSheetService: OVSSheetService;

describe('OVSSheetService', () => {
	beforeEach(async () => {
		const mockSupportSystemService: MockedObjectDeep<SupportSystemService> = {
			findByObject: jest.fn().mockResolvedValue([
				{
					...supportSystem,
					type: SupportSystemType.Facade,
					typeDetailed: SupportSystemTypeDetailedFacade.MuurplaatInbouwRvs,
				},
				{
					...supportSystem,
					type: SupportSystemType.TensionWire,
					typeDetailed: SupportSystemTypeDetailedTensionWire.Denhalon,
				},
				{ ...supportSystem, type: SupportSystemType.Mast, typeDetailed: SupportSystemTypeDetailedMast.Gvb },
				{ ...supportSystem, type: SupportSystemType.Node, typeDetailed: SupportSystemTypeDetailedNode.Ring },
			]),
			...(<any>{}),
		};

		const mockBatchService = {
			findForAssetThroughSurveys: jest.fn().mockResolvedValue([
				{
					name: 'OVS Batch 02',
					status: 'active',
				},
			]),
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

			// Code below causes a bunch of memory errors?
			//
			// Get the column names (without empty string values) from the 4th row
			// const labels = [];
			// worksheet.getRow(4).eachCell((cell) => {
			// 	if (cell.text && cell.text.trim() !== '') {
			// 		labels.push(cell);
			// 	}
			// });

			const labels = worksheet.getRow(4).values.filter((value) => typeof value === 'string'); // filter out empty/undefined cells

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

		it('should return the correct Paspoort data for all rows', async () => {
			const data = await ovsSheetService.getData(ovsAssetStub);

			// expect(row.techviewId).toEqual('__TECHVIEW_ID__');
			// expect(row.idMast).toEqual('__ID_MAST__');
			// expect(row.bol).toEqual(true);

			data.map((row) => {
				expect(row).toEqual(
					expect.objectContaining({
						code: ovsAssetStub.code,
						batchNumbers: dbBatchStub.name,
						batchStatus: dbBatchStub.status,
						passportStreet: ovsAssetStub.attributes.passportStreet,
						passportNeighborhood: ovsAssetStub.attributes.passportNeighborhood,
						passportDistrict: ovsAssetStub.attributes.passportDistrict,
						passportCityArea: ovsAssetStub.attributes.passportCityArea,
						passportSplits: ovsAssetStub.attributes.passportSplits,
						passportDoubleWired: ovsAssetStub.attributes.passportDoubleWired,
						passportTramTracks: ovsAssetStub.attributes.tramTracks,
						passportNotes: ovsAssetStub.attributes.notes,
					}),
				);
			});
		});

		it('should fill the fields related to Decomposition - Gevel with the correct data', async () => {
			const data = await ovsSheetService.getData(ovsAssetStub);

			expect(data[0]).toEqual(
				expect.objectContaining({
					facadeTypeDetailed: SupportSystemTypeDetailedFacade.MuurplaatInbouwRvs,
					facadeLocation: '__LOCATION__',
					facadeHouseNumber: '33',
					facadeLocationIndication: '__LOCATION_INDICATION__',
					facadeXCoordinate: 116211.88,
					facadeYCoordinate: 487352.77,
					facadeInstallationHeight: 10,
					facadeInstallationLength: 10, // Not present in example sheet
					facadeRemarks: '__REMARKS__',
				}),
			);
		});

		it('should fill the fields related to Decomposition - Spandraad with the correct data', async () => {
			const data = await ovsSheetService.getData(ovsAssetStub);

			expect(data[1]).toEqual(
				expect.objectContaining({
					tensionWireTypeDetailed: SupportSystemTypeDetailedTensionWire.Denhalon,
					tensionWireLocation: '__LOCATION__',
					tensionWireInstallationLength: 10,
					tensionWireRemarks: '__REMARKS__',
				}),
			);
		});

		it('should fill the fields related to Decomposition - Spandraad - Armatuur with the correct data', async () => {
			const data = await ovsSheetService.getData(ovsAssetStub);

			expect(data[2]).toEqual(
				expect.objectContaining({
					luminaireHasLED: true,
					luminaireLocation: '__LOCATION__',
					luminaireXCoordinate: 116211.88,
					luminaireYCoordinate: 487352.77,
					luminaireRemarks: '__REMARKS__',
				}),
			);
		});

		it('should fill the fields related to Decomposition - Mast with the correct data', async () => {
			const data = await ovsSheetService.getData(ovsAssetStub);

			expect(data[3]).toEqual(
				expect.objectContaining({
					mastTypeDetailed: SupportSystemTypeDetailedMast.Gvb,
					mastLocation: '__LOCATION__',
					mastXCoordinate: 116211.88,
					mastYCoordinate: 487352.77,
					mastInstallationHeight: 10,
					mastRemarks: '__REMARKS__',
				}),
			);
		});

		it('should fill the fields related to Decomposition - Node with the correct data', async () => {
			const data = await ovsSheetService.getData(ovsAssetStub);

			expect(data[4]).toEqual(
				expect.objectContaining({
					nodeTypeDetailed: SupportSystemTypeDetailedNode.Ring,
					nodeLocation: '__LOCATION__',
					nodeXCoordinate: 116211.88,
					nodeYCoordinate: 487352.77,
					nodeInstallationHeight: 10,
					nodeRemarks: '__REMARKS__',
				}),
			);
		});
	});
});

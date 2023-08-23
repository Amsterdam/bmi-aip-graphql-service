import * as ExcelJS from 'exceljs';
import { MockedObjectDeep } from 'ts-jest';
import { string } from 'zod';

import { DBBatch } from '../../schema/batch/types/batch.repository.interface';
import { supportSystem , luminaire as luminaireStub } from '../../schema/span-installation/__stubs__';
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
import { assetBatchData as batchStub, ovsRecordMock , decompositionFacadeData } from './__stubs__/ovs-export-data';
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

		it('should return the correct Paspoort data for all rows', async () => {
			const data = await ovsSheetService.getData(ovsAssetStub);

			data.map((row) => {
				expect(row.code).toEqual(ovsAssetStub.code);
				// expect(row.techviewId).toEqual('__TECHVIEW_ID__');
				// expect(row.idMast).toEqual('__ID_MAST__');
				// expect(row.bol).toEqual(true);
				expect(row.batchNumbers).toEqual(dbBatchStub.name);
				expect(row.batchStatus).toEqual(dbBatchStub.status);
				expect(row.passportStreet).toEqual(ovsAssetStub.attributes.passportStreet);
				expect(row.passportNeighborhood).toEqual(ovsAssetStub.attributes.passportNeighborhood);
				expect(row.passportDistrict).toEqual(ovsAssetStub.attributes.passportDistrict);
				expect(row.passportCityArea).toEqual(ovsAssetStub.attributes.passportCityArea);
				expect(row.passportSplits).toEqual(ovsAssetStub.attributes.passportSplits);
				expect(row.passportDoubleWired).toEqual(ovsAssetStub.attributes.passportDoubleWired);
				expect(row.passportTramTracks).toEqual(ovsAssetStub.attributes.tramTracks);
				expect(row.passportNotes).toEqual(ovsAssetStub.attributes.notes);
			});
		});

		it('should fill the fields related to Decomposition - Gevel with the correct data', async () => {
			const data = await ovsSheetService.getData(ovsAssetStub);

			expect(data[0].facadeTypeDetailed).toEqual(SupportSystemTypeDetailedFacade.MuurplaatInbouwRvs);
			expect(data[0].facadeLocation).toEqual('__LOCATION__');
			expect(data[0].facadeHouseNumber).toEqual('33');
			expect(data[0].facadeLocationIndication).toEqual('__LOCATION_INDICATION__');
			expect(data[0].facadeXCoordinate).toEqual(116211.88);
			expect(data[0].facadeYCoordinate).toEqual(487352.77);
			expect(data[0].facadeInstallationHeight).toEqual(10);
			expect(data[0].facadeInstallationLength).toEqual(10); // Not present in example sheet
			expect(data[0].facadeRemarks).toEqual('__REMARKS__');
		});

		it('should fill the fields related to Decomposition - Spandraad with the correct data', async () => {
			const data = await ovsSheetService.getData(ovsAssetStub);

			expect(data[1].tensionWireTypeDetailed).toEqual(SupportSystemTypeDetailedTensionWire.Denhalon);
			expect(data[1].tensionWireLocation).toEqual('__LOCATION__');
			expect(data[1].tensionWireInstallationLength).toEqual(10);
			expect(data[1].tensionWireRemarks).toEqual('__REMARKS__');
		});

		it('should fill the fields related to Decomposition - Spandraad - Armatuur with the correct data', async () => {
			const data = await ovsSheetService.getData(ovsAssetStub);

			expect(data[2].luminaireHasLED).toEqual(true);
			expect(data[2].luminaireLocation).toEqual('__LOCATION__');
			expect(data[2].luminaireXCoordinate).toEqual(116211.88);
			expect(data[2].luminaireYCoordinate).toEqual(487352.77);
			expect(data[2].luminaireRemarks).toEqual('__REMARKS__');
		});

		it('should fill the fields related to Decomposition - Mast with the correct data', async () => {
			const data = await ovsSheetService.getData(ovsAssetStub);

			expect(data[3].mastTypeDetailed).toEqual(SupportSystemTypeDetailedMast.Gvb);
			expect(data[3].mastLocation).toEqual('__LOCATION__');
			expect(data[3].mastXCoordinate).toEqual(116211.88);
			expect(data[3].mastYCoordinate).toEqual(487352.77);
			expect(data[3].mastInstallationHeight).toEqual(10);
			expect(data[3].mastRemarks).toEqual('__REMARKS__');
		});

		it('should fill the fields related to Decomposition - Node with the correct data', async () => {
			const data = await ovsSheetService.getData(ovsAssetStub);

			expect(data[4].nodeTypeDetailed).toEqual(SupportSystemTypeDetailedNode.Ring);
			expect(data[4].nodeLocation).toEqual('__LOCATION__');
			expect(data[4].nodeXCoordinate).toEqual(116211.88);
			expect(data[4].nodeYCoordinate).toEqual(487352.77);
			expect(data[4].nodeInstallationHeight).toEqual(10);
			expect(data[4].nodeRemarks).toEqual('__REMARKS__');
		});
	});
});

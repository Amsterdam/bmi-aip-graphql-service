import { Test, TestingModule } from '@nestjs/testing';
import * as ExcelJS from 'exceljs';

import { AddOVSSheetService } from './add-ovs-sheet.service';
import { ovsRecordMock } from './__stubs__';
import { ovsAssetStub } from './__stubs__/ovs-asset';


describe('AddOvsSheetService', () => {
	let addOvsSheetService: AddOVSSheetService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: 'BatchRepository',
					useValue: {
						findBatchesForAssetThroughSurveys: jest.fn(),
					},
				},
				AddOVSSheetService,
			],
		}).compile();

		addOvsSheetService = module.get<AddOVSSheetService>(AddOVSSheetService);
		const mockBatchRepository = module.get('BatchRepository');
		mockBatchRepository.findBatchesForAssetThroughSurveys.mockResolvedValue([]);
	});

	describe('addOVSSheet', () => {
		it('should add a new OVS export sheet', async () => {
			jest.spyOn(addOvsSheetService, 'getOVSExportSpanInstallationBaseDataColumns').mockResolvedValue([]);
			jest.spyOn(addOvsSheetService, 'getOVSExportSpanInstallationBatchDataColumns').mockResolvedValue([]);
			jest.spyOn(addOvsSheetService, 'getOVSExportSpanInstallationPassportDataColumns').mockResolvedValue([]);

			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('');

			const result = await addOvsSheetService.addOVSSheet(worksheet, ovsAssetStub, true);

			expect(result).toEqual(ovsRecordMock);
			expect(addOvsSheetService.addOVSSheet).toHaveBeenCalledWith(worksheet, ovsAssetStub, true);
		});
	});
});

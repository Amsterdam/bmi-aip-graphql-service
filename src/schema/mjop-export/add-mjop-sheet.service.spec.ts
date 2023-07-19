import { Test, TestingModule } from '@nestjs/testing';

import { survey1 } from '../survey/__stubs__';

import { AddMJOPSheetService } from './add-mjop-sheet.service';
import { MJOPDataService } from './mjop-data.service';
import { mjopRecordMock } from './__stub__';

describe('AddMjopSheetService', () => {
	let dataService: MJOPDataService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AddMJOPSheetService,
				{
					provide: MJOPDataService,
					useValue: {
						getMJOPData: jest.fn().mockResolvedValue({}),
					},
				},
			],
		}).compile();

		dataService = module.get<MJOPDataService>(MJOPDataService);
	});

	describe('addMJOPSheet', () => {
		it('should add a new MJOP sheet', async () => {
			jest.spyOn(dataService, 'getMJOPData').mockResolvedValue(mjopRecordMock);

			const result = await dataService.getMJOPData(survey1);
			expect(result).toEqual(mjopRecordMock);
			expect(dataService.getMJOPData).toHaveBeenCalledWith(survey1);
		});
	});
});

import { Test, TestingModule } from '@nestjs/testing';

import { Survey } from '../survey/models/survey.model';
import { survey1 } from '../survey/__stubs__';

import { MJOPDataService } from './mjop-data.service';
import { AddMJOPSheetService } from './add-mjop-sheet.service';

describe('MJOPDataService', () => {
	let service: MJOPDataService;

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

		service = module.get<MJOPDataService>(MJOPDataService);
	});

	describe('getMJOPData', () => {
		it('should call getMJOPData method', async () => {
			// Mock the necessary dependencies and provide any required input data
			const survey: Survey = survey1;

			// Call the getMJOPData method
			await service.getMJOPData(survey);
			expect(service.getMJOPData).toHaveBeenCalledWith(survey1);
		});
	});
});

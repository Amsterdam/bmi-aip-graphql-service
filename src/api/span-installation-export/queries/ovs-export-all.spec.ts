import { responseMock } from '../__mocks__/response';
import { mockExporterService, mockAddOvsSheetService, mockLogger } from '../__mocks__/span-installation-export.service';

import { OVSExportAllQuery } from './ovs-export-all.query';
import { OVSExportAllHandler } from './ovs-export-all.handler';

describe('OVSExportAllHandler', () => {
	const token = '__TOKEN__';

	beforeEach(() => {
		jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2000-01-01T00:00:00.000Z');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('executes query', async () => {
		const query = new OVSExportAllQuery(responseMock, token);

		await new OVSExportAllHandler(mockExporterService, mockAddOvsSheetService, mockLogger).execute(query);

		expect(mockAddOvsSheetService.addOVSRows).toHaveBeenCalledTimes(1);
	});

	it('should return the correct headers for a spreadsheet', async () => {
		const query = new OVSExportAllQuery(responseMock, token);

		await new OVSExportAllHandler(mockExporterService, mockAddOvsSheetService, mockLogger).execute(query);

		expect(responseMock.setHeader).toHaveBeenCalledWith(
			'Content-Type',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		);
		expect(responseMock.end).toHaveBeenCalled();
	});

	it('should contain the correct fileName in the headers', async () => {
		const query = new OVSExportAllQuery(responseMock, token);

		await new OVSExportAllHandler(mockExporterService, mockAddOvsSheetService, mockLogger).execute(query);

		const fileName = `OVS-all-export-${new Date().toISOString()}`;
		expect(responseMock.setHeader).toHaveBeenLastCalledWith(
			'Content-Disposition',
			`attachment; filename=${fileName}`,
		);
		expect(responseMock.end).toHaveBeenCalled();
	});
});

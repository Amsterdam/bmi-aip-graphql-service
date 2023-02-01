import { FailureModeMetaData } from './failure-mode-meta-data.model';

describe('FailureMode / Model / FailureModeMetaData', () => {
	test('constructs a FailureModeMetaData instance', () => {
		const failureModeMetaData = new FailureModeMetaData();
		failureModeMetaData.faalOorzaak = null;
		failureModeMetaData.bronVanFalen = null;
		failureModeMetaData.gevolgVanFalen = null;
		failureModeMetaData.faaloorzaakAnders = null;
		failureModeMetaData.bronVanFalenAnders = null;

		expect(failureModeMetaData).toBeInstanceOf(FailureModeMetaData);
		expect(failureModeMetaData).toEqual({
			faalOorzaak: null,
			bronVanFalen: null,
			gevolgVanFalen: null,
			faaloorzaakAnders: null,
			bronVanFalenAnders: null,
		});
	});
});

import { FailureModeMetaDataFactory } from './failure-mode-meta-data.factory';

describe('FailureMode / MetaData / Factory', () => {
	test('CreateFailureMode() constructs an instance of a FailureMode GraphQL model', () => {
		const result = FailureModeMetaDataFactory.CreateFailureModeMetaDataFromJSONB({
			faalOorzaak: null,
		});
		expect(result).toEqual({
			faalOorzaak: null,
			bronVanValen: null,
			gevolgVanFalen: null,
			faaloorzaakAnders: null,
			bronVanFalenAnders: null,
		});
	});
});

import { FailureModeMetaDataFactory } from './failure-mode-meta-data.factory';

describe('FailureMode / MetaData / Factory', () => {
	test('CreateFailureMode() constructs an instance of a FailureMode GraphQL model', () => {
		const result = FailureModeMetaDataFactory.CreateFailureModeMetaDataFromJSONB({
			faaloorzaak: '',
		});
		expect(result).toEqual({
			causeOfFailureOther: '',
			consequenceOfFailure: '',
			failureCause: '',
			sourceOfFailure: '',
			sourceOfFailureOther: '',
		});
	});
});

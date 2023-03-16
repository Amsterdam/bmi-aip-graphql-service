import { FailureModeMetaData } from './failure-mode-meta-data.model';

describe('FailureMode / Model / FailureModeMetaData', () => {
	test('constructs a FailureModeMetaData instance', () => {
		const failureModeMetaData = new FailureModeMetaData();
		failureModeMetaData.failureCause = null;
		failureModeMetaData.sourceOfFailure = null;
		failureModeMetaData.consequenceOfFailure = null;
		failureModeMetaData.causeOfFailureOther = null;
		failureModeMetaData.sourceOfFailureOther = null;

		expect(failureModeMetaData).toBeInstanceOf(FailureModeMetaData);
		expect(failureModeMetaData).toEqual({
			failureCause: null,
			sourceOfFailure: null,
			consequenceOfFailure: null,
			causeOfFailureOther: null,
			sourceOfFailureOther: null,
		});
	});
});

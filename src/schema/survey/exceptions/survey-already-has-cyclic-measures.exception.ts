export class SurveyAlreadyHasCyclicMeasuresException extends Error {
	public constructor(surveyId: string) {
		super(`Could not duplicate measures data for surveyId ${surveyId}; this survey already contains measures data`);
	}
}

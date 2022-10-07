export class SupportSystemSurveyNotFoundException extends Error {
	public constructor(surveyId: string, supportSystemId: string) {
		super(
			`Could not find support system survey record for surveyId ${surveyId} and supportSystemId ${supportSystemId}`,
		);
	}
}

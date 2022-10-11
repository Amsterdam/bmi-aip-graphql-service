export class JunctionBoxSurveyNotFoundException extends Error {
	public constructor(surveyId: string, junctionBoxId: string) {
		super(`Could not find junction box survey record for surveyId ${surveyId} and junctionBoxId ${junctionBoxId}`);
	}
}

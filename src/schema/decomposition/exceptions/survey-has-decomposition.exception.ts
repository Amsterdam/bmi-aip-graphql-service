export class SurveyHasDecompositionException extends Error {
	public constructor(surveyId: string) {
		super(
			`Could not duplicate decomposition data for surveyId ${surveyId}; this survey already contains decomposition data`,
		);
	}
}

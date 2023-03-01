export class DecompositionCloneNotFoundException extends Error {
	public constructor(surveyId: string) {
		super(
			`Could not duplicate measures for surveyId ${surveyId}; this survey does not contain linked decomposition data, please clone the decomposition first`,
		);
	}
}

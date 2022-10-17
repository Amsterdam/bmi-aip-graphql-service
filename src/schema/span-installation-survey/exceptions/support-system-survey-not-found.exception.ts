export class SupportSystemSurveyNotFoundException extends Error {
	public constructor(supportSystemId: string) {
		super(`Could not find support system survey record for supportSystemId ${supportSystemId}`);
	}
}

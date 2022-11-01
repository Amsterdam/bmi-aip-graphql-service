export class JunctionBoxSurveyNotFoundException extends Error {
	public constructor(junctionBoxId: string) {
		super(`Could not find junction box survey record for junctionBoxId ${junctionBoxId}`);
	}
}

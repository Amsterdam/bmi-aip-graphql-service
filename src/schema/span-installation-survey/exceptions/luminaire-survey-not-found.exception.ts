export class LuminaireSurveyNotFoundException extends Error {
	public constructor(luminaireId: string) {
		super(`Could not find luminaire survey record for luminaireId ${luminaireId}`);
	}
}

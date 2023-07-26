export class LuminaireNotFoundException extends Error {
	public constructor(luminaireId: string) {
		super(`Could not find luminaire record for id ${luminaireId}`);
	}
}

import { ReviseLuminaireInput } from '../dto/update-missing-luminaire.input';

export class ReviseLuminaireCommand {
	public constructor(public readonly data: ReviseLuminaireInput) {}
}

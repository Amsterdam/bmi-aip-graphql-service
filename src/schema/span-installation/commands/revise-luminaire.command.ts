import { ReviseLuminaireInput } from '../dto/revise-luminaire.input';

export class ReviseLuminaireCommand {
	public constructor(public readonly data: ReviseLuminaireInput) {}
}

import { UpdateReviseLuminaireInput } from '../dto/update-revise-luminaire.input';

export class UpdateReviseLuminaireCommand {
	public constructor(public readonly data: UpdateReviseLuminaireInput) {}
}

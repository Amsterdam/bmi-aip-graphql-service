import { UpdateMissingLuminaireInput } from '../dto/update-missing-luminaire.input';

export class UpdateReviseLuminaireCommand {
	public constructor(public readonly data: UpdateMissingLuminaireInput) {}
}

import { UpdateMissingLuminaireInput } from '../dto/update-missing-luminaire.input';

export class UpdateMissingLuminaireCommand {
	public constructor(public readonly data: UpdateMissingLuminaireInput) {}
}

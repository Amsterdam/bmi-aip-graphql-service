import { UpdateLuminaireInput } from '../dto/update-luminaire.input';

export class UpdateLuminaireCommand {
	public constructor(public readonly data: UpdateLuminaireInput) {}
}

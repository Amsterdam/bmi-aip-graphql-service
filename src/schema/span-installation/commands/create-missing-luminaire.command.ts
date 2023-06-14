import { CreateMissingLuminaireInput } from '../dto/create-missing-luminaire.input';

export class CreateMissingLuminaireCommand {
	public constructor(public readonly data: CreateMissingLuminaireInput) {}
}

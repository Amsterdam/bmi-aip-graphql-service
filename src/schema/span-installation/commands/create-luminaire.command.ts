import { CreateLuminaireInput } from '../dto/create-luminaire.input';

export class CreateLuminaireCommand {
	public constructor(public readonly data: CreateLuminaireInput) {}
}

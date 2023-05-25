import { CreateReviseLuminaireInput } from '../dto/create-revise-luminaire.input';

export class CreateReviseLuminaireCommand {
	public constructor(public readonly data: CreateReviseLuminaireInput) {}
}

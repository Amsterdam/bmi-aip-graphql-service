import { CreateManifestationInput } from '../dto/create-manifestation.input';

export class CreateManifestationCommand {
	public constructor(public readonly data: CreateManifestationInput) {}
}

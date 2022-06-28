import { UpdateManifestationInput } from '../dto/update-manifestation.input';

export class UpdateManifestationCommand {
	public constructor(public readonly data: UpdateManifestationInput) {}
}

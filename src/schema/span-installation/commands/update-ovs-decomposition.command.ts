import { UpdateOVSDecompositionInput } from '../dto/update-ovs-decomposition.input';

export class UpdateOVSDecompositionCommand {
	public constructor(public readonly data: UpdateOVSDecompositionInput) {}
}

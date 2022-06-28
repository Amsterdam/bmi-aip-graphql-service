import { UpdateUnitInput } from '../dto/update-unit.input';

export class UpdateUnitCommand {
	public constructor(public readonly data: UpdateUnitInput) {}
}

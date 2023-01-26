import { UpdateConditionInput } from '../dto/update-condition.input';

export class UpdateConditionCommand {
	public constructor(public readonly data: UpdateConditionInput) {}
}

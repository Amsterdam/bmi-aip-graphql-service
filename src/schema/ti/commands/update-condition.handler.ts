import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ConditionRepository } from '../condition.repository';
import { Condition } from '../types/condition.repository.interface';
import { UpdateConditionCommand } from '../commands/update-condition.command';

@CommandHandler(UpdateConditionCommand)
export class UpdateConditionHandler implements ICommandHandler<UpdateConditionCommand> {
	constructor(private repository: ConditionRepository) {}

	public async execute(command: UpdateConditionCommand): Promise<Condition> {
		return this.repository.updateCondition(command.data);
	}
}

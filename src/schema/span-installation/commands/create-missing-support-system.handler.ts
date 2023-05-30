import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SupportSystemRepository } from '../support-system.repository';
import { SupportSystem } from '../types/support-system.repository.interface';
import { normalizeSupportSystemInputUtil } from '../utils/normalize-support-system-input.util';
import { CreateReviseSupportSystemNormalizedInput } from '../dto/create-missing-support-system-normalized.input';

import { CreateMissingSupportSystemCommand } from './create-missing-support-system.command';

@CommandHandler(CreateMissingSupportSystemCommand)
export class CreateMissingSupportSystemHandler implements ICommandHandler<CreateMissingSupportSystemCommand> {
	constructor(private repository: SupportSystemRepository) {}

	public async execute(command: CreateMissingSupportSystemCommand): Promise<SupportSystem> {
		return this.repository.createReviseSupportSystem(
			normalizeSupportSystemInputUtil(command.data, new CreateReviseSupportSystemNormalizedInput()),
		);
	}
}

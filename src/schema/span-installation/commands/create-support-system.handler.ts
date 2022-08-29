import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SupportSystemRepository } from '../support-system.repository';
import { SupportSystem } from '../types/support-system.repository.interface';
import { CreateSupportSystemNormalizedInput } from '../dto/create-support-system-normalized.input';
import { normalizeSupportSystemInputUtil } from '../utils/normalize-support-system-input.util';

import { CreateSupportSystemCommand } from './create-support-system.command';

@CommandHandler(CreateSupportSystemCommand)
export class CreateSupportSystemHandler implements ICommandHandler<CreateSupportSystemCommand> {
	constructor(private repository: SupportSystemRepository) {}

	public async execute(command: CreateSupportSystemCommand): Promise<SupportSystem> {
		return this.repository.createSupportSystem(
			normalizeSupportSystemInputUtil(command.data, new CreateSupportSystemNormalizedInput()),
		);
	}
}

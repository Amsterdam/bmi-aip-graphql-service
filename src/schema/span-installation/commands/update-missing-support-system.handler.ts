import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SupportSystemRepository } from '../support-system.repository';
import { SupportSystem } from '../types/support-system.repository.interface';
import { normalizeSupportSystemInputUtil } from '../utils/normalize-support-system-input.util';
import { UpdateReviseSupportSystemNormalizedInput } from '../dto/update-revise-support-system-normalized.input';

import { UpdateMissingSupportSystemCommand } from './update-missing-support-system.command';

@CommandHandler(UpdateMissingSupportSystemCommand)
export class UpdateMissingSupportSystemHandler implements ICommandHandler<UpdateMissingSupportSystemCommand> {
	constructor(private repository: SupportSystemRepository) {}

	public async execute(command: UpdateMissingSupportSystemCommand): Promise<SupportSystem> {
		return this.repository.updateReviseSupportSystem(
			normalizeSupportSystemInputUtil(command.data, new UpdateReviseSupportSystemNormalizedInput()),
		);
	}
}
